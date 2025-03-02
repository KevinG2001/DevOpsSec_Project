import { useState } from "react";
import styles from "../styles/adminDashboard.module.scss";
import useAdminData from "../util/useAdminData";

function AdminDashboard() {
  const [selectedTable, setSelectedTable] = useState("");

  let endpoint = "";
  if (selectedTable === "Users") endpoint = "users";
  if (selectedTable === "Rooms") endpoint = "rooms/all";
  if (selectedTable === "Bookings") endpoint = "api/bookings/all";

  const { data, loading, error } = useAdminData(endpoint);

  console.log("Admin Data:", data);

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
                      .filter(
                        (key) =>
                          key.toLowerCase() !== "password" &&
                          key.toLowerCase() !== "isadmin"
                      )
                      .map((key) => <th key={key}>{key}</th>)}
                </tr>
              </thead>
              <tbody>
                {(data as any[]).map((item, index) => (
                  <tr key={index}>
                    {Object.entries(item)
                      .filter(
                        ([key]) =>
                          key.toLowerCase() !== "password" &&
                          key.toLowerCase() !== "isadmin"
                      )
                      .map(([_, value], i) => (
                        <td key={i}>{String(value)}</td>
                      ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
