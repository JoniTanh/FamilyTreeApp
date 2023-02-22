import personService from "../services/people";
import { useState, useEffect } from "react";
import FamilyBanner from "../assets/FamilyBanner.svg";
import "../assets/families.css";
import Filter from "./Filter";

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

  const handlePageChange = (value) => {
    setCurrentPage(value);
  };

  const handleClearFilter = () => {
    setFilter("");
  };

  const filteredPeople = (person) =>
    person.family.toLowerCase().includes(filter.toLowerCase());

  let totalItems = people.map((person) => person.family).filter(Boolean).length;
  const totalPages = Math.ceil(totalItems / rows);
  const startIndex = (currentPage - 1) * rows;
  const endIndex = startIndex + rows + 1;

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
          {people
            .filter(filteredPeople)
            .slice(startIndex, endIndex)
            .map((person, i) => (
              <>
                {person.family.length > 0 ? (
                  <div key={i} className="personContainer">
                    <div className="card familiesCard">
                      <img
                        className="card-img-top"
                        src={FamilyBanner}
                        alt="Card image cap"
                      />
                      <div className="card-body">
                        <p className="card-text">{person.family}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </>
            ))}
        </div>
      </div>
      <div className="container familiesPageButtons">
        <button
          className="btn btn-outline-dark previousPageButton"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          {"<"}
        </button>
        <input className="leftPageNumberInput" disabled value={currentPage} />{" "}
        of{" "}
        <input className="rightPageNumberInput" disabled value={totalPages} />
        <button
          className="btn btn-outline-dark nextPageButton"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          {">"}
        </button>
      </div>
    </>
  );
};

export default Families;
