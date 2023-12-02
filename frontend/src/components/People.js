import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Filter from "../components/Filter";
import { PencilIcon, ShowPersonIcon } from "../assets/Icons";
import peopleService from "../services/people";
import Notification from "../components/Notification";
import NewPersonButton from "./buttons/NewPersonButton";
import styles from "../assets/people.module.css";
import PageOptions from "../components/PageOptions";
import DeleteModal from "../components/DeleteModal";

const People = () => {
  let listNumber = 1;

  const [message, setMessage] = useState();
  const [people, setPeople] = useState([]);
  const [filter, setFilter] = useState("");
  const [rows, setRows] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const people = await peopleService.getAll();
      setPeople(people);
    };
    fetchData();
  }, [setPeople]);

  if (localStorage.getItem("newPerson")) {
    const addedPerson = JSON.parse(localStorage.getItem("newPerson"));
    setMessage({
      type: "success",
      text: `Henkilö ${addedPerson.firstNames.split(" ")[0]} ${
        addedPerson.lastName
      } lisätty.`,
    });
    localStorage.removeItem("newPerson");
    setTimeout(() => {
      setMessage(undefined);
    }, 5000);
  }

  const removePerson = async (removedPerson) => {
    await peopleService.remove(removedPerson.id);
    setPeople(people.filter((person) => person.id !== removedPerson.id));
    setMessage({
      type: "delete",
      text: `Henkilö ${removedPerson.firstNames.split(" ")[0]} ${
        removedPerson.lastName
      } poistettu.`,
    });
    setTimeout(() => {
      setMessage(undefined);
    }, 5000);
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

  const handleClearFilter = () => {
    setFilter("");
  };

  let totalItems = people.filter(filteredPeople).length;
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
        <div className={styles.options}>
          <div>
            <NewPersonButton />
          </div>
          <div className={styles.filter}>
            <Filter
              styleName={styles.filterInput}
              filter={filter}
              handleFilterChange={handleFilterChange}
              handleClearFilter={handleClearFilter}
            />
          </div>
        </div>
      </div>
      <div className={`container ${styles.container}`}>
        <h1 className={styles.header}>Henkilöt</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Etunimet</th>
              <th scope="col">Sukunimi</th>
              <th scope="col">Syntynyt</th>
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
                  <th scope="col">{person.birthTime.substr(-4)}</th>
                  <th scope="col">{person.family}</th>
                  <th scope="col">
                    <div className="d-flex">
                      <div className="mx-1" style={{ cursor: "pointer" }}>
                        <Link
                          className="nav-link text-decoration-none text-dark fw-bold"
                          to={`/people/${person.id}`}
                        >
                          <ShowPersonIcon />
                        </Link>
                      </div>
                      <div className="mx-1" style={{ cursor: "pointer" }}>
                        <Link
                          className="nav-link text-decoration-none text-dark fw-bold"
                          to={`/people/edit/${person.id}`}
                        >
                          <PencilIcon />
                        </Link>
                      </div>
                      <DeleteModal
                        headerTextPart={"henkilön"}
                        removePerson={removePerson}
                        person={person}
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

export default People;
