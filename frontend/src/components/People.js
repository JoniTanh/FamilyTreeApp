import { Link } from "react-router-dom";
import { useState } from "react";
import Filter from "./Filter";
import { PencilIcon, ShowPersonIcon, TrashIcon } from "../assets/Icons";
import Person from "./Person";

const CreateButton = () => (
  <Link
    className="nav-link text-decoration-none text-dark fw-bold"
    to="/people/create"
  >
    <button>Create</button>
  </Link>
);

const People = ({ people, toggleDelete }) => {
  let listNumber = 1;

  const [filter, setFilter] = useState("");
  const [rows, setRows] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredPeople = (person) =>
    (
      person.firstName.toLowerCase() +
      " " +
      person.lastName.toLowerCase()
    ).includes(filter.toLowerCase());

  const handleRowChange = (event) => {
    setRows(Number(event.target.value));
  };

  const handlePageChange = (value) => {
    setCurrentPage(value);
  };

  let totalItems = people.filter(filteredPeople).length;
  const totalPages = Math.ceil(totalItems / rows);
  const startIndex = (currentPage - 1) * rows;
  const endIndex = startIndex + rows;

  return (
    <div className="px-5 pt-4">
      <div>
        <h1>Henkilöt</h1>
        <div className="d-flex p-2">
          <Filter filter={filter} handleFilterChange={handleFilterChange} />
          <CreateButton />
        </div>
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
              .filter(filteredPeople)
              .slice(startIndex, endIndex)
              .map((person) => (
                <tr key={listNumber}>
                  <th scope="col">{listNumber++}</th>
                  <th scope="col">{person.firstName}</th>
                  <th scope="col">{person.lastName}</th>
                  <th scope="col">Suku, johon joku kuuluu</th>
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
                        <PencilIcon />
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
        <div>
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Edellinen
          </button>{" "}
          Sivu <input disabled value={currentPage} /> of{" "}
          <input disabled value={totalPages} />
          <select rows={rows} onChange={handleRowChange}>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="75">75</option>
            <option value="100">100</option>
          </select>{" "}
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Seuraava
          </button>
        </div>
      </div>
    </div>
  );
};

export default People;
