import { useState } from "react";
import styles from "../styles/adminDashboard.module.scss";
import useAdminData from "../util/useAdminData";

function AdminDashboard() {
  const [selectedTable, setSelectedTable] = useState("");
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<any>({});

  let endpoint = "";
  if (selectedTable === "Users") endpoint = "api/users";
  if (selectedTable === "Rooms") endpoint = "api/rooms/all";
  if (selectedTable === "Bookings") endpoint = "api/bookings/all";

  const { data, loading, error, deleteItem, editItem } = useAdminData(endpoint);

  const handleEditClick = (item: any) => {
    let idField = "";
    if (selectedTable === "Users") idField = "userid";
    if (selectedTable === "Rooms") idField = "roomid";
    if (selectedTable === "Bookings") idField = "bookingid";

    const id = item[idField];

    if (!item || !id) {
      console.error("Item or item.id is missing");
      return;
    }

    setSelectedItem(item);
    setFormData(item);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
    setFormData({});
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let idField = "";
    if (selectedTable === "Users") idField = "userid";
    if (selectedTable === "Rooms") idField = "roomid";
    if (selectedTable === "Bookings") idField = "bookingid";

    const id = selectedItem ? selectedItem[idField] : null;

    if (!selectedItem || !id) {
      console.error("Selected item is missing an ID");
      return;
    }

    editItem(id, formData, selectedTable);
    handleModalClose();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Admin Dashboard</h1>

      <div className={styles.tableSelection}>
        <button
          className={
            selectedTable === "Users" ? styles.activeButton : styles.button
          }
          onClick={() => setSelectedTable("Users")}
        >
          Users
        </button>
        <button
          className={
            selectedTable === "Rooms" ? styles.activeButton : styles.button
          }
          onClick={() => setSelectedTable("Rooms")}
        >
          Rooms
        </button>
        <button
          className={
            selectedTable === "Bookings" ? styles.activeButton : styles.button
          }
          onClick={() => setSelectedTable("Bookings")}
        >
          Bookings
        </button>
      </div>

      <div className={styles.content}>
        {loading && (
          <p className={styles.message}>Loading {selectedTable}...</p>
        )}
        {error && <p className={styles.error}>Error: {error}</p>}

        {!loading && !error && selectedTable && Array.isArray(data) && (
          <div>
            <table className={styles.table}>
              <thead>
                <tr>
                  {data.length > 0 &&
                    Object.keys(data[0])
                      .filter((key) => key.toLowerCase() !== "password")
                      .map((key) => <th key={key}>{key}</th>)}
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    {Object.entries(item)
                      .filter(([key]) => key.toLowerCase() !== "password")
                      .map(([_, value], i) => (
                        <td key={i}>{String(value)}</td>
                      ))}
                    <td>
                      <button
                        className={styles.editButton}
                        onClick={() => handleEditClick(item)}
                      >
                        Edit
                      </button>
                      <button
                        className={styles.removeButton}
                        onClick={() => deleteItem(item, selectedTable)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={handleModalClose}>
              &times;
            </span>
            <h2>Edit {selectedTable.slice(0, -1)}</h2>
            <form onSubmit={handleFormSubmit}>
              {Object.entries(formData).map(([key, value]) => {
                if (key.toLowerCase() === "password") return null;

                return (
                  <div key={key} className={styles.formGroup}>
                    <label>{key}</label>
                    {key === "isadmin" ? (
                      <input
                        type="checkbox"
                        name={key}
                        checked={Boolean(value)}
                        onChange={handleFormChange}
                      />
                    ) : (
                      <input
                        type="text"
                        name={key}
                        value={String(value)}
                        onChange={handleFormChange}
                      />
                    )}
                  </div>
                );
              })}
              <div className={styles.modalButtons}>
                <button type="submit" className={styles.saveButton}>
                  Save Changes
                </button>
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={handleModalClose}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
