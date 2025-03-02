import { useNavigate } from "react-router-dom";
import Style from "../styles/navbar.module.scss";
import { jwtDecode, JwtPayload } from "jwt-decode";

interface DecodedToken extends JwtPayload {
  isAdmin?: boolean;
}

function Navbar() {
  const navigate = useNavigate();

  // Get the token from localStorage
  const token = localStorage.getItem("token");
  let isAdmin = false;

  // Check if the token is valid
  if (token) {
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      isAdmin = decoded.isAdmin || false;
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }

  const goToLink = (event: React.MouseEvent<HTMLDivElement>) => {
    const link = event.currentTarget.innerText
      .toLowerCase()
      .split(" ")
      .join("");
    navigate(`/${link}`);
  };

  // Function to log out
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
