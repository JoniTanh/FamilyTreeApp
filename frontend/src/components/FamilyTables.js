import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Filter from "./Filter";
import { PencilIcon, ShowPersonIcon, TrashIcon } from "../assets/Icons";
import familytableService from "../services/familytables";
import Notification from "../components/Notification";
import "../assets/familyTables.css";
import PageOptions from "./PageOptions";
import NewTableButton from "./NewTableButton";
import DeleteModal from "./DeleteModal";

const FamilyTables = () => {
  let listNumber = 1;

  const [message, setMessage] = useState();
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

  if (localStorage.getItem("newTable")) {
    const addedTable = JSON.parse(localStorage.getItem("newTable"));
    setMessage({
      type: "success",
      text: `Henkilön ${addedTable.firstNames.split(" ")[0]} ${
        addedTable.lastName
      } perhetaulu lisätty.`,
    });
    localStorage.removeItem("newTable");
    setTimeout(() => {
      setMessage(undefined);
    }, 5000);
  }

  const removeFamilyTable = async (removedFamilytable) => {
    await familytableService.remove(removedFamilytable._id);
    setFamilytables(
      familytables.filter(
        (familytable) => familytable._id !== removedFamilytable._id
      )
    );
    setMessage({
      type: "delete",
      text: `Henkilön ${removedFamilytable.person.firstNames.split(" ")[0]} ${
        removedFamilytable.person.lastName
      } perhetaulu poistettu.`,
    });
    setTimeout(() => {
      setMessage(undefined);
    }, 5000);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredFamilyTables = (familytable) => {
    if (!familytable.person?.firstNames || !familytable.person?.lastName)
      return "";

    const fullName = `${familytable.person.firstNames.toLowerCase()} ${familytable.person.lastName.toLowerCase()}`;
    return fullName.includes(filter.toLowerCase());
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
      <Notification
        hasErrors={message?.hasErrors}
        message={message?.text}
        type={message?.type}
      />
      <div className="container">
        <div className="familyTablesOptions">
          <div>
            <NewTableButton />
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
              .sort((a, b) =>
                a.person?.lastName.localeCompare(b.person?.lastName)
              )
              .filter(filteredFamilyTables)
              .slice(startIndex, endIndex)
              .map((familytable) => (
                <tr key={listNumber}>
                  <th scope="col">{listNumber++}</th>
                  <th scope="col">{familytable.person?.firstNames}</th>
                  <th scope="col">{familytable.person?.lastName}</th>
                  <th scope="col">{familytable.person?.family}</th>
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
                      <DeleteModal
                        headerTextPart={"henkilön perhetaulun"}
                        removeFamilyTable={removeFamilyTable}
                        familytable={familytable}
                      />
                    </div>
                  </th>
                </tr>
              ))}
          </thead>
        </table>
      </div>
      <div>
        <PageOptions
          currentPage={currentPage}
          totalItems={totalItems}
          totalPages={totalPages}
          rows={rows}
          setRows={setRows}
          setCurrentPage={setCurrentPage}
          selectOption={true}
        />
      </div>
    </>
  );
};

export default FamilyTables;
