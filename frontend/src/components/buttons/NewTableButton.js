import { Link } from "react-router-dom";
import "../../assets/familyTables.css";

const NewTableButton = () => (
  <Link
    className="nav-link text-decoration-none text-dark fw-bold"
    to="/familytables/create"
  >
    <button className="btn btn-outline-success familyTablesCreateButton">
      Lisää perhetaulu
    </button>
  </Link>
);

export default NewTableButton;
