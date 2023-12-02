import { Link } from "react-router-dom";
import styles from "../../assets/people.module.css";

const NewPersonButton = () => (
  <Link
    className="nav-link text-decoration-none text-dark fw-bold"
    to="/people/create"
  >
    <button className={`btn btn-outline-success ${styles.createButton}`}>
      Lisää henkilö
    </button>
  </Link>
);

export default NewPersonButton;
