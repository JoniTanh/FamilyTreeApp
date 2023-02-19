import { Link, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Filter from "./Filter";
import { PencilIcon, ShowPersonIcon, TrashIcon } from "../assets/Icons";
import familytableService from "../services/familytables";
import FamilyTableForm from "./FamilyTableForm";

const CreateButton = () => (
  <Link
    className="nav-link text-decoration-none text-dark fw-bold"
    to={{ pathname: "/familytables/create", state: {} }}
  >
    <button>Create</button>
  </Link>
);

// korjattava niin, että uuden perhetaulun lisäyksen jälkeen lista päivittyy automaattisesti
// ja nappia ei enää tarvitse
const RefreshButton = () => (
  <button type="button" onClick={() => window.location.reload()}>
    Refresh tables
  </button>
);

const FamilyTables = ({ familytables, toggleDeleteFamilyTable }) => {
  let listNumber = 1;

  const [filter, setFilter] = useState("");
  const [rows, setRows] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredFamilyTables = (familytable) => {
    if (!familytable.person.firstNames || !familytable.person.lastName)
      return "";

    const fullName = `${familytable.person.firstNames.toLowerCase()} ${familytable.person.lastName.toLowerCase()}`;
    return fullName.includes(filter.toLowerCase());
  };

  const handleRowChange = (event) => {
    setRows(Number(event.target.value));
  };

  const handlePageChange = (value) => {
    setCurrentPage(value);
  };

  let totalItems = familytables.filter(filteredFamilyTables).length;
  const totalPages = Math.ceil(totalItems / rows);
  const startIndex = (currentPage - 1) * rows;
  const endIndex = startIndex + rows;

  return (
    <>
      <Routes>
        <Route path="/familytables/create" element={<FamilyTableForm />} />
      </Routes>

      <div className="px-5 pt-4">
        <div>
          <h1>Perhetaulut</h1>
          <div className="d-flex p-2">
            <CreateButton />
            <RefreshButton />
            <Filter filter={filter} handleFilterChange={handleFilterChange} />
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
              {familytables
                .filter(filteredFamilyTables)
                .slice(startIndex, endIndex)
                .map((familytable) => (
                  <tr key={listNumber}>
                    <th scope="col">{listNumber++}</th>
                    <th scope="col">{familytable.person.firstNames}</th>
                    <th scope="col">{familytable.person.lastName}</th>
                    <th scope="col">{familytable.person.family}</th>
                    <th scope="col">
                      <div className="d-flex">
                        <div className="mx-1" style={{ cursor: "pointer" }}>
                          <Link
                            className="nav-link text-decoration-none text-dark fw-bold"
                            to={`/familytables/${familytable._id}`}
                            state={familytable}
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
                          onClick={() => toggleDeleteFamilyTable(familytable)}
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
    </>
  );
};

export default FamilyTables;
