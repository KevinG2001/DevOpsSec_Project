import Style from "../styles/adminDashboard.module.scss";

function AdminDashboard() {
  return (
    <>
      <div className={Style.adminDashboardContainer}>
        <div className={Style.adminDashboardTH}>
          <div className={Style.tableHeader}>Users</div>
          <div className={Style.tableHeader}>Rooms</div>
          <div className={Style.tableHeader}>Bookings</div>
        </div>
        <div>
          <div className={Style.adminDashboardTR}></div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
