import { useNavigate } from "react-router-dom";
import Style from "../styles/navbar.module.scss";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";

function Navbar() {
  const navigate = useNavigate();
  const [selectedLink, setSelectedLink] = useState("");

  //Function to get the text inside the navLink div (It also removes the space between admin dashboard)
  //Then go navigate to that link
  const goToLink = (event) => {
    const link = event?.target.innerText.toLowerCase().split(" ").join("");
    setSelectedLink(link);
    navigate(`/${link}`);
  };

  // Get the token from localStorage
  const token = localStorage.getItem("token");
  let isAdmin = false;

  //Checking if the token is valid
  if (token) {
    try {
      const decoded = jwtDecode(token);
      isAdmin = decoded.isAdmin;
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }

  //Removes the token from local storage and navigates to the login screen
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <div className={Style.navContainer}>
        <div className={Style.navName}>BookIt</div>
        <div className={Style.navLinkWrapper}>
          {isAdmin && (
            <div className={Style.navLink} onClick={goToLink}>
              Admin Dashboard
            </div>
          )}
          <div className={Style.navLink} onClick={goToLink}>
            Home
          </div>
          <div className={Style.navLink} onClick={goToLink}>
            Rooms
          </div>
          <div className={Style.navLink} onClick={goToLink}>
            Bookings
          </div>
          <div className={Style.navLink} onClick={logout}>
            Logout
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
