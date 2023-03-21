import { Link } from "react-router-dom";
import Search from "../Search";
import Logout from "../Logout";
import { useState } from "react";
import "../../assets/navbar.css";
import { ListIcon } from "../../assets/Icons";

const NavBar = () => {
  const user = JSON.parse(localStorage.getItem("token"))?.name;
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleToggleClick = () => {
    setIsNavOpen(!isNavOpen);
  };

  const isNavContentVisible = { display: !isNavOpen ? "none" : "" };

  return (
    <div className="navBarContainer">
      <div className="navBarContent">
        <div>
          <ul className="navList">
            <li className="firstNavItem">
              <Link className="navLink" to="/">
                <h6>Etusivu</h6>
              </Link>
            </li>
            <li className="navItem">
              <Link className="navLink" to="/people">
                <h6>Henkilöt</h6>
              </Link>
            </li>
            <li className="navItem">
              <Link className="navLink" to="/familytables">
                <h6>Perhetaulut</h6>
              </Link>
            </li>
            <li className="navItem">
              <Link className="navLink" to="/families">
                <h6>Suvut</h6>
              </Link>
            </li>
            <li className="navItem">
              <Link className="navLink" to="/familytree">
                <h6>Sukupuu</h6>
              </Link>
            </li>
          </ul>
        </div>
        <div className="navSearchAndInformation">
          <span className="navSearch">
            <Search />
          </span>
          <span className="navUserInformation">
            <span>Olet kirjautunut sisään käyttäjällä</span>
            <span className="fw-bold navUser">{user}</span>
          </span>
          <span className="navLogoutButton">
            <Logout />
          </span>
        </div>
      </div>

      <div className="dropdownContainer">
        <div className="navOptions">
          <div className="navMenuAndSearch">
            <div>
              <button
                className="btn btn-outline-dark toggleButton"
                onClick={handleToggleClick}
              >
                <ListIcon />
              </button>
            </div>
            <div className="dropdownSearch">
              <Search />
            </div>
          </div>
          <div>
            <div className="dropdownUserInformation">
              Olet kirjautunut sisään käyttäjällä{" "}
              <span className="fw-bold">{user}</span>
              <span className="navLogoutButton">
                <Logout />
              </span>
            </div>
          </div>
        </div>

        <div style={isNavContentVisible} className="dropdown">
          <div>
            <div>
              <ul className="navList">
                <li className="navItem">
                  <Link className="navLink" to="/">
                    <h6>Etusivu</h6>
                  </Link>
                </li>
                <li className="navItem">
                  <Link className="navLink" to="/people">
                    <h6>Henkilöt</h6>
                  </Link>
                </li>
                <li className="navItem">
                  <Link className="navLink" to="/familytables">
                    <h6>Perhetaulut</h6>
                  </Link>
                </li>
                <li className="navItem">
                  <Link className="navLink" to="/families">
                    <h6>Suvut</h6>
                  </Link>
                </li>
                <li className="navItem">
                  <Link className="navLink" to="/familytree">
                    <h6>Sukupuu</h6>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
