import { useNavigate } from "react-router-dom";
import Style from "../styles/navbar.module.scss";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [selectedLink, setSelectedLink] = useState("");

  //Function to get the text inside the navLink div
  //Then go navigate to that link
  const goToLink = (event) => {
    const link = event?.target.innerText.toLowerCase();
    setSelectedLink(link);
    navigate(`/${link}`);
  };

  return (
    <>
      <div className={Style.navContainer}>
        <div className={Style.navName}>NameHere</div>
        <div className={Style.navLinkWrapper}>
          <div className={Style.navLink} onClick={goToLink}>
            Home
          </div>
          <div className={Style.navLink} onClick={goToLink}>
            Rooms
          </div>
          <div className={Style.navLink} onClick={goToLink}>
            Bookings
          </div>
          {/* Logout button does not have function yet */}
          <div className={Style.navLink}>Logout</div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
