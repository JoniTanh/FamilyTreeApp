import { Link } from "react-router-dom";
import personService from "../services/people";
import { useState, useEffect } from "react";
import FamilyBanner from "../assets/FamilyBanner.svg";
import "../assets/families.css";
import Filter from "./Filter";
import PageOptions from "./PageOptions";

const Families = () => {
  const [people, setPeople] = useState([]);
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rows = 10;

  useEffect(() => {
    const fetchData = async () => {
      const people = await personService.getAll();
      setPeople(people);
    };
    fetchData();
  }, [setPeople]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleClearFilter = () => {
    setFilter("");
  };

  const filteredPeople = (person, index, self) =>
    person.family.toLowerCase().includes(filter.toLowerCase()) &&
    index === self.findIndex((p) => p.family === person.family);

  const uniqueFamilies = people
    .filter(filteredPeople)
    .map((person) => person.family);

  let totalItems = uniqueFamilies.filter(Boolean).length;
  const totalPages = Math.ceil(totalItems / rows);
  const startIndex = (currentPage - 1) * rows;
  const endIndex = startIndex + rows;

  return (
    <>
      <div className="container">
        <div className="familiesFilter">
          <Filter
            styleName={"familiesFilterInput"}
            filter={filter}
            handleFilterChange={handleFilterChange}
          />
          <button
            className="btn btn-outline-danger clearButton"
            onClick={() => handleClearFilter()}
          >
            Tyhjennä
          </button>
        </div>
      </div>
      <div className="container familiesContainer">
        <h1 className="familiesHeader">Suvut</h1>
        <div className="familiesList">
          {uniqueFamilies
            .sort()
            .filter((x) => x)
            .slice(startIndex, endIndex)
            .map((family, i) => (
              <div key={i} className="familiesPersonContainer">
                <Link
                  className="nav-link text-decoration-none text-dark fw-bold"
                  to={`/families/members`}
                  state={family}
                >
                  <div className="card familiesCard">
                    <img
                      className="card-img-top"
                      src={FamilyBanner}
                      alt="Card image cap"
                    />
                    <div className="card-body">
                      <p className="card-text">{family}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
      <PageOptions
        currentPage={currentPage}
        totalItems={totalItems}
        totalPages={totalPages}
        rows={rows}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default Families;
