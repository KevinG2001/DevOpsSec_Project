import Style from "../styles/navbar.module.scss";

function Navbar() {
  return (
    <>
      <div className={Style.navContainer}>
        <div className={Style.navName}>NameHere</div>
        <div className={Style.navLinkWrapper}>
          <div className={Style.navLink}>Home</div>
          <div className={Style.navLink}>Rooms</div>
          <div className={Style.navLink}>Booking</div>
          <div className={Style.navLink}>Logout</div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
