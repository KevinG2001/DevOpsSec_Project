import { useState } from "react";
import Style from "../styles/adminDashboard.module.scss";
import useAdminData from "../util/useAdminData";

function AdminDashboard() {
  const [selectedTable, setSelectedTable] = useState("");

  let endpoint = "";
  if (selectedTable === "Users") endpoint = "users";
  if (selectedTable === "Rooms") endpoint = "rooms/all";
  if (selectedTable === "Bookings") endpoint = "api/bookings/all";

  const { data, loading, error } = useAdminData(endpoint);

  return (
    <>
      <div className={Style.adminDashboardContainer}>
        <div className={Style.adminDashboardTH}>
          <div
            className={Style.tableHeader}
            onClick={() => setSelectedTable("Users")}
          >
            Users
          </div>
          <div
            className={Style.tableHeader}
            onClick={() => setSelectedTable("Rooms")}
          >
            Rooms
          </div>
          <div
            className={Style.tableHeader}
            onClick={() => setSelectedTable("Bookings")}
          >
            Bookings
          </div>
        </div>

        <div className={Style.adminDashboardContent}>
          {loading && <p>Loading {selectedTable}...</p>}
          {error && <p>Error: {error}</p>}

          {!loading && !error && selectedTable && (
            <div>
              <h2>{selectedTable}</h2>
              <table className={Style.adminTable}>
                <thead>
                  <tr>
                    {data.length > 0 &&
                      Object.keys(data[0]).map((key) => (
                        <th key={key}>{key}</th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index}>
                      {Object.values(item).map((value, i) => (
                        <td key={i}>{value}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
