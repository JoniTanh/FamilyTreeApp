import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Filter from "./Filter";
import { PencilIcon, ShowPersonIcon, TrashIcon } from "../assets/Icons";
import personService from "../services/people";
import "../assets/people.css";

const CreateButton = () => (
  <Link
    className="nav-link text-decoration-none text-dark fw-bold"
    to="/people/create"
  >
    <button className="btn btn-outline-success peopleCreateButton">
      Lisää henkilö
    </button>
  </Link>
);

const People = () => {
  let listNumber = 1;

  const [people, setPeople] = useState([]);
  const [filter, setFilter] = useState("");
  const [rows, setRows] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const people = await personService.getAll();
      setPeople(people);
    };
    fetchData();
  }, [setPeople]);

  // muuta paremmaksi window.confirmin sijaan
  const toggleDelete = async (removedPerson) => {
    const result = window.confirm(
      `Delete ${removedPerson.firstNames} ${removedPerson.lastName}?`
    );

    if (result) {
      await personService.remove(removedPerson.id);
      setPeople(people.filter((person) => person.id !== removedPerson.id));
    }
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredPeople = (person) =>
    (
      person.firstNames.toLowerCase() +
      " " +
      person.lastName.toLowerCase()
    ).includes(filter.toLowerCase());

  const handleRowChange = (event) => {
    setRows(Number(event.target.value));
  };

  const handlePageChange = (value) => {
    setCurrentPage(value);
  };

  const handleClearFilter = () => {
    setFilter("");
  };

  let totalItems = people.filter(filteredPeople).length;
  const totalPages = Math.ceil(totalItems / rows);
  const startIndex = (currentPage - 1) * rows;
  const endIndex = startIndex + rows;

  return (
    <>
      <div className="container">
        <div className="peopleOptions">
          <div>
            <CreateButton />
          </div>
          <div className="peopleFilter">
            <Filter
              styleName={"peopleFilterInput"}
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
      </div>
      <div className="container peopleContainer">
        <h1 className="peopleHeader">Henkilöt</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Etunimet</th>
              <th scope="col">Sukunimi</th>
              <th scope="col">Suku</th>
              <th scope="col"></th>
            </tr>
            {people
              .sort((a, b) => a.lastName.localeCompare(b.lastName))
              .filter(filteredPeople)
              .slice(startIndex, endIndex)
              .map((person) => (
                <tr key={listNumber}>
                  <th scope="col">{listNumber++}</th>
                  <th scope="col">{person.firstNames}</th>
                  <th scope="col">{person.lastName}</th>
                  <th scope="col">{person.family}</th>
                  <th scope="col">
                    <div className="d-flex">
                      <div className="mx-1" style={{ cursor: "pointer" }}>
                        <Link
                          className="nav-link text-decoration-none text-dark fw-bold"
                          to={`/people/${person.id}`}
                          state={person}
                        >
                          <ShowPersonIcon />
                        </Link>
                      </div>
                      <div className="mx-1" style={{ cursor: "pointer" }}>
                        <Link
                          className="nav-link text-decoration-none text-dark fw-bold"
                          to={`/people/edit/${person.id}`}
                          state={person}
                        >
                          <PencilIcon />
                        </Link>
                      </div>
                      <div
                        className="mx-1"
                        style={{ cursor: "pointer" }}
                        onClick={() => toggleDelete(person)}
                      >
                        <TrashIcon />
                      </div>
                    </div>
                  </th>
                </tr>
              ))}
          </thead>
        </table>
      </div>
      <div>
        <div className="container peoplePageButtons">
          <button
            className="btn btn-outline-dark previousPageButton"
            disabled={currentPage === 1 || !totalItems}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            {"<"}
          </button>
          <div className="peoplePageValues">
            <input
              className="leftPageNumberInput"
              disabled
              value={
                !totalItems
                  ? 0
                  : totalPages < currentPage
                  ? totalPages
                  : currentPage
              }
            />{" "}
            of{" "}
            <input
              className="rightPageNumberInput"
              disabled
              value={totalPages}
            />
            <select
              className="peopleSelectOptions"
              rows={rows}
              onChange={handleRowChange}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="75">75</option>
              <option value="100">100</option>
            </select>
          </div>
          <button
            className="btn btn-outline-dark nextPageButton"
            disabled={currentPage === totalPages || !totalItems}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            {">"}
          </button>
        </div>
      </div>
    </>
  );
};

export default People;
