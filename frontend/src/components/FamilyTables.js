import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Filter from "./Filter";
import { PencilIcon, ShowPersonIcon, TrashIcon } from "../assets/Icons";
import familytableService from "../services/familytables";
import "../assets/familyTables.css";

const CreateButton = () => (
  <Link
    className="nav-link text-decoration-none text-dark fw-bold"
    to="/familytables/create"
  >
    <button className="btn btn-outline-success familyTablesCreateButton">
      Lisää perhetaulu
    </button>
  </Link>
);

const FamilyTables = () => {
  let listNumber = 1;

  const [filter, setFilter] = useState("");
  const [rows, setRows] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [familytables, setFamilytables] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const familytables = await familytableService.getAll();
      setFamilytables(familytables);
    };
    fetchData();
  }, []);

  // muuta paremmaksi window.confirmin sijaan
  const toggleDeleteFamilyTable = async (removedFamilytable) => {
    const result = window.confirm(`Delete item?`);

    if (result) {
      await familytableService.remove(removedFamilytable._id);
      setFamilytables(
        familytables.filter(
          (familytable) => familytable._id !== removedFamilytable._id
        )
      );
    }
  };

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

  const handleClearFilter = () => {
    setFilter("");
  };

  let totalItems = familytables.filter(filteredFamilyTables).length;
  const totalPages = Math.ceil(totalItems / rows);
  const startIndex = (currentPage - 1) * rows;
  const endIndex = startIndex + rows;

  return (
    <>
      <div className="container">
        <div className="familyTablesOptions">
          <div>
            <CreateButton />
          </div>
          <div className="familyTablesFilter">
            <Filter
              styleName={"familyTablesFilterInput"}
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
      <div className="container familyTablesContainer">
        <h1 className="familyTablesHeader">Perhetaulut</h1>
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
                        <Link
                          className="nav-link text-decoration-none text-dark fw-bold"
                          to={`/familytables/edit/${familytable._id}`}
                          state={familytable}
                        >
                          <PencilIcon />
                        </Link>
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
        <div className="container familyTablesPageButtons">
          <button
            className="btn btn-outline-dark previousPageButton"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            {"<"}
          </button>
          <div className="familyTablesPageValues">
            <input
              className="leftPageNumberInput"
              disabled
              value={currentPage}
            />{" "}
            of{" "}
            <input
              className="rightPageNumberInput"
              disabled
              value={totalPages}
            />
            <select
              className="familyTablesSelectOptions"
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
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            {">"}
          </button>
        </div>
      </div>
    </>
  );
};

export default FamilyTables;
