import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import RoomList from "./components/RoomList";
import Bookings from "./pages/Bookings";
import AdminDashboard from "./pages/AdminDashboard";

function Layout() {
  console.log("API URL:", import.meta.env.VITE_API_URL);
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/" || location.pathname === "/register";

  return (
    <>
      {!hideNavbar && <Navbar />}{" "}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/rooms" element={<RoomList fetchUrl={`/rooms/all`} />} />

        <Route path="/bookings" element={<Bookings />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
