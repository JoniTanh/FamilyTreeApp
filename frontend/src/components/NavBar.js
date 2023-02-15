import { Link } from "react-router-dom";
import { useState } from "react";
import Search from "./Search";

const NavBar = ({ handleLogout, user }) => {
  const [search, setSearch] = useState("");

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <nav className="navbar navbar-expand bg-info bg-gradient text-dark shadow-lg p-3 mb-2 border-bottom border-secondary">
      <div className="navbar-collapse">
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li className="nav-item px-2">
            <Link
              className="nav-link text-decoration-none text-dark fw-bold"
              to="/"
            >
              <h6>Etusivu</h6>
            </Link>
          </li>
          <li className="nav-item px-2">
            <Link
              className="nav-link text-decoration-none text-dark fw-bold"
              to="/families"
            >
              <h6>Suvut</h6>
            </Link>
          </li>
          <li className="nav-item px-2">
            <Link
              className="nav-link text-decoration-none text-dark fw-bold"
              to="/people"
            >
              <h6>Henkilöt</h6>
            </Link>
          </li>
          <li className="nav-item px-2">
            <Link
              className="nav-link text-decoration-none text-dark fw-bold"
              to="/familytables"
            >
              <h6>Perhetaulut</h6>
            </Link>
          </li>
          <li className="nav-item px-2">
            <Link
              className="nav-link text-decoration-none text-dark fw-bold"
              to="/familytree"
            >
              <h6>Sukupuu</h6>
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <Search search={search} handleSearchChange={handleSearchChange} />
      </div>
      <div className="px-5">
        <span className="px-3">
          Olet kirjautunut sisään käyttäjällä{" "}
          <span className="fw-bold">{user.name}</span>
        </span>
        <button
          className="btn btn-outline-danger fw-bold"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
