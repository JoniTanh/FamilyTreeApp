import { Outlet, Navigate } from "react-router-dom";
import NavBar from "../components/navBar/NavBar";

const PrivateRoutes = () => {
  const token = JSON.parse(localStorage.getItem("token"))?.token;

  return token ? (
    <div>
      <NavBar />
      <Outlet />
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoutes;
