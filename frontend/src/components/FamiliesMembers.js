import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { useState, useEffect } from "react";
import Filter from "../components/filter/Filter";
import { PencilIcon, ShowPersonIcon } from "../assets/Icons";
import personService from "../services/people";
import "../assets/familiesMembers.css";
import PageOptions from "../components/options/PageOptions";
import ReturnButton from "./buttons/ReturnButton";
import ShowAllFamiliesButton from "./buttons/ShowAllFamiliesButton";

const FamiliesMembers = () => {
  const { state } = useLocation();
  let listNumber = 1;

  const [people, setPeople] = useState([]);
  const [filter, setFilter] = useState("");
  const [rows, setRows] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterBornIntoFamily, setFilterBornIntoFamily] = useState(false);

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

  const filteredFamilyMembers = (person) => {
    if (filterBornIntoFamily) {
      return person.family.includes(state);
    } else {
      return (
        person.family.includes(state) || person.allFamilies?.includes(state)
      );
    }
  };

  const hasAllFamilies = people.some((person) =>
    person.allFamilies?.includes(state)
  );

  const filteredPeople = (person) =>
    (
      person.firstNames.toLowerCase() +
      " " +
      person.lastName.toLowerCase()
    ).includes(filter.toLowerCase());

  const handleClearFilter = () => {
    setFilter("");
  };

  const handleAllFamiliesButton = () => {
    setFilterBornIntoFamily(!filterBornIntoFamily);
  };

  let totalItems = people.filter(filteredFamilyMembers).length;
  const totalPages = Math.ceil(totalItems / rows);
  const startIndex = (currentPage - 1) * rows;
  const endIndex = startIndex + rows;

  return (
    <>
      <div className="container">
        <div className="familiesMembersOptions">
          <div>
            <ReturnButton />
            {hasAllFamilies && (
              <ShowAllFamiliesButton
                handleAllFamiliesButton={handleAllFamiliesButton}
                filterBornIntoFamily={filterBornIntoFamily}
              />
            )}
          </div>
          <div className="familiesMembersFilter">
            <Filter
              styleName={"familiesMembersFilterInput"}
              filter={filter}
              handleFilterChange={handleFilterChange}
              handleClearFilter={handleClearFilter}
            />
          </div>
        </div>
      </div>
      <div className="container familiesMembersContainer">
        <h1 className="familiesMembersHeader">Suvun {state} jäsenet</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Etunimet</th>
              <th scope="col">Sukunimi</th>
              <th scope="col">Syntynyt</th>
              <th scope="col"></th>
            </tr>
            {people
              .sort((a, b) => a.lastName.localeCompare(b.lastName))
              .filter(filteredFamilyMembers)
              .filter(filteredPeople)
              .slice(startIndex, endIndex)
              .map((person) => (
                <tr key={listNumber}>
                  <th scope="col">{listNumber++}</th>
                  <th scope="col">{person.firstNames}</th>
                  <th scope="col">{person.lastName}</th>
                  <th scope="col">{person.birthTime.substr(-4)}</th>
                  <th scope="col">
                    <div className="d-flex">
                      <div className="mx-1" style={{ cursor: "pointer" }}>
                        <Link
                          className="nav-link text-decoration-none text-dark fw-bold"
                          to={`/people/${person.id}`}
                          state={person.id}
                        >
                          <ShowPersonIcon />
                        </Link>
                      </div>
                      <div className="mx-1" style={{ cursor: "pointer" }}>
                        <Link
                          className="nav-link text-decoration-none text-dark fw-bold"
                          to={`/people/edit/${person.id}`}
                          state={person.id}
                        >
                          <PencilIcon />
                        </Link>
                      </div>
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

export default FamiliesMembers;
