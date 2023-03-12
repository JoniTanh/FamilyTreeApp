import { Link } from "react-router-dom";
import "../../assets/people.css";

const NewPersonButton = () => (
  <Link
    className="nav-link text-decoration-none text-dark fw-bold"
    to="/people/create"
  >
    <button className="btn btn-outline-success peopleCreateButton">
      Lisää henkilö
    </button>
  </Link>
);

export default NewPersonButton;
