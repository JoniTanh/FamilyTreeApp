import Search from "./Search";
import Logout from "./Logout";
import { useState } from "react";
import styles from "../assets/navbar.module.css";
import { ListIcon } from "../assets/Icons";
import NavItem from "./UI/NavItem";

const NavBar = () => {
  const user = JSON.parse(localStorage.getItem("token"))?.name;
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleToggleClick = () => {
    setIsNavOpen(!isNavOpen);
  };

  const isNavContentVisible = { display: !isNavOpen ? "none" : "" };

  return (
    <div className={styles.navBarContainer}>
      <div className={styles.navBarContent}>
        <div>
          <ul className={styles.list}>
            <NavItem navigateTo="/" headerText="Etusivu" firstItem={true} />
            <NavItem navigateTo="/people" headerText="Henkilöt" />
            <NavItem navigateTo="/familytables" headerText="Perhetaulut" />
            <NavItem navigateTo="/families" headerText="Suvut" />
            <NavItem navigateTo="/familytree" headerText="Sukupuu" />
            <NavItem navigateTo="/map" headerText="Kartta" />
          </ul>
        </div>
        <div className={styles.infoContainer}>
          <span className={styles.search}>
            <Search />
          </span>
          <span className={styles.userInformation}>
            <span>Olet kirjautunut sisään käyttäjällä</span>
            <span className={`fw-bold ${styles.user}`}>{user}</span>
          </span>
          <span className={styles.logoutButton}>
            <Logout />
          </span>
        </div>
      </div>

      <div className={styles.dropdownContainer}>
        <div className={styles.options}>
          <div className={styles.menuSearch}>
            <div>
              <button
                className={`btn btn-outline-dark ${styles.toggleButton}`}
                onClick={handleToggleClick}
              >
                <ListIcon />
              </button>
            </div>
            <div className={styles.dropdownSearch}>
              <Search />
            </div>
          </div>
          <div>
            <div className={styles.dropdownUserInfo}>
              Olet kirjautunut sisään käyttäjällä{" "}
              <span className="fw-bold">{user}</span>
              <span className={styles.logoutButton}>
                <Logout />
              </span>
            </div>
          </div>
        </div>

        <div style={isNavContentVisible} className={styles.dropdown}>
          <div>
            <div>
              <ul className={styles.list}>
                <NavItem navigateTo="/" headerText="Etusivu" />
                <NavItem navigateTo="/people" headerText="Henkilöt" />
                <NavItem navigateTo="/familytables" headerText="Perhetaulut" />
                <NavItem navigateTo="/families" headerText="Suvut" />
                <NavItem navigateTo="/familytree" headerText="Sukupuu" />
                <NavItem navigateTo="/map" headerText="Kartta" />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
