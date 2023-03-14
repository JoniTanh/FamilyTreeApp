import { Link } from "react-router-dom";
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
    if (!familyTable.person?.firstNames || !familyTable.person?.lastName)
      return "";

    return searchWords?.every((word) =>
      JSON.stringify(familyTable).toLowerCase().includes(word)
    );
  });

  const highlightSearchWords = (text, searchWords) => {
    const regex = new RegExp(`(${searchWords.join("|")})`, "gi");
    return text.replace(regex, '<span class="highlight">$1</span>');
  };

  return (
    <div className="searchPage">
      <div className="container">
        <div className="topOptions">
          <div>
            <HomeButton />
          </div>
        </div>
      </div>
      <div className="container searchContainer">
        <div className="searchWords">
          <b>Hakusanat: </b>
          {state}
        </div>
        <div>
          {filteredPeople.length > 0 && (
            <div className="searchHeader">Henkilöt</div>
          )}
          {filteredPeople.map((person, i) => (
            <div className="card cardContent" key={i}>
              <div className="shortInformation">
                <div className="searchIdContainer">
                  <div>
                    <b>Henkilön ID-tunnus: </b>
                    {person.id}
                  </div>
                  <Link to={`/people/${person.id}`} state={person.id}>
                    <button className="btn btn-outline-primary searchPageButton">
                      Näytä henkilö
                    </button>
                  </Link>
                </div>
                <div className="mb-1">
                  <b>Henkilön nimi: </b>
                  {person.firstNames} {person?.nickname} {person.lastName}
                </div>
              </div>
              <div
                dangerouslySetInnerHTML={{
                  __html: highlightSearchWords(
                    JSON.stringify(person),
                    searchWords
                  ),
                }}
              />
            </div>
          ))}
        </div>
        <div>
          {filteredFamilyTables.length > 0 && (
            <div className="searchHeader">Henkilötaulut</div>
          )}
          {filteredFamilyTables.map((familyTable, i) => (
            <div className="card cardContent" key={i}>
              <div className="shortInformation">
                <div className="searchIdContainer">
                  <div>
                    <b>Perhetaulun ID-tunnus: </b>
                    {familyTable._id}
                  </div>
                  <Link
                    to={`/familytables/${familyTable._id}`}
                    state={familyTable}
                  >
                    <button className="btn btn-outline-primary searchPageButton">
                      Näytä perhetaulu
                    </button>
                  </Link>
                </div>
                <div className="mb-1">
                  <b>Perhetaulun henkilön nimi: </b>
                  {familyTable.person.firstNames} {familyTable.person?.nickname}{" "}
                  {familyTable.person.lastName}
                </div>
              </div>
              <div
                dangerouslySetInnerHTML={{
                  __html: highlightSearchWords(
                    JSON.stringify(familyTable),
                    searchWords
                  ),
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
