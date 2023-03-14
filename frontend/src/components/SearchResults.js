import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import peopleService from "../services/people";
import familytableService from "../services/familytables";
import HomeButton from "./buttons/HomeButton";

const SearchResults = () => {
  const { state } = useLocation();

  const [people, setPeople] = useState([]);
  const [familyTables, setFamilyTables] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const people = await peopleService.getAll();
      const familyTables = await familytableService.getAll();
      setPeople(people);
      setFamilyTables(familyTables);
    };

    fetchData();
  }, [setPeople, state]);

  const searchWords = state?.toLowerCase().split(" ");

  const filteredPeople = people.filter((person) => {
    return searchWords?.every((word) =>
      JSON.stringify(person).toLowerCase().includes(word)
    );
  });

  const filteredFamilyTables = familyTables.filter((familyTable) => {
    return searchWords?.every((word) =>
      JSON.stringify(familyTable).toLowerCase().includes(word)
    );
  });

  return (
    <>
      <div className="container">
        <div className="topOptions">
          <div>
            <HomeButton />
          </div>
        </div>
      </div>
      <div className="container searchContainer">
        <div>Hakusana: {state}</div>
        <div>
          {filteredPeople.length > 0 && <div>Henkilöt</div>}
          {filteredPeople.map((person, i) => (
            <div className="card cardContent" key={i}>
              {JSON.stringify(person)}
            </div>
          ))}
        </div>
        <div>
          {filteredFamilyTables.length > 0 && <div>Henkilötaulut</div>}
          {filteredFamilyTables.map((familyTable, i) => (
            <div className="card cardContent" key={i}>
              {JSON.stringify(familyTable)}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchResults;
