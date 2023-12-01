import { Link } from "react-router-dom";
import styles from "../../assets/navbar.module.css";

const NavItem = ({ navigateTo, headerText, firstItem = false }) => {
  return (
    <>
      <li className={firstItem ? styles.firstListItem : styles.listItem}>
        <Link className={styles.link} to={navigateTo}>
          <h6>{headerText}</h6>
        </Link>
      </li>
    </>
  );
};

export default NavItem;
