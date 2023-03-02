import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async (event) => {
    event.preventDefault();
    window.localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <button className="btn btn-outline-danger fw-bold" onClick={handleLogout}>
        Logout
      </button>
    </>
  );
};

export default Logout;
