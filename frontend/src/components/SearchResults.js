import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import peopleService from "../services/people";
import familytableService from "../services/familytables";
import HomeButton from "./buttons/HomeButton";
import { InfoIcon, SearchIcon } from "../assets/Icons";

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
                    {person.id}{" "}
                    <Link to={`/search`} state={person.id}>
                      <SearchIcon />
                    </Link>
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
                <div className="box">
                  <InfoIcon />{" "}
                  <div>
                    <div className="hover-text">
                      <b>nimi: </b>
                      {person?.firstNames}{" "}
                      {person?.nickname && `"${person?.nickname}"`}{" "}
                      {person?.lastName} <b>syntynyt: </b> {person?.birthPlace}{" "}
                      {person?.birthTime} <b>kummit: </b> {person?.godparents}{" "}
                      <b>kastepäivä: </b> {person?.baptismDay} <b>kuollut: </b>{" "}
                      {person?.deathPlace} {person?.deathTime}{" "}
                      {person?.deathReason} <b>hautauspaikka- ja aika: </b>{" "}
                      {person?.burialPlot} {person?.burialTime}{" "}
                      <b>elämänkerta: </b> {person?.lifeStory} <b>lähteet: </b>{" "}
                      {person?.sources}
                    </div>
                  </div>
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
          {filteredFamilyTables.map((fb, i) => (
            <div className="card cardContent" key={i}>
              <div className="shortInformation">
                <div className="searchIdContainer">
                  <div>
                    <b>Perhetaulun ID-tunnus: </b>
                    {fb._id}{" "}
                    <Link to={`/search`} state={fb._id}>
                      <SearchIcon />
                    </Link>
                  </div>
                  <Link to={`/familytables/${fb._id}`} state={fb}>
                    <button className="btn btn-outline-primary searchPageButton">
                      Näytä perhetaulu
                    </button>
                  </Link>
                </div>
                <div className="mb-1">
                  <b>Perhetaulun henkilön nimi: </b>
                  {fb.person.firstNames} {fb.person?.nickname}{" "}
                  {fb.person.lastName}
                </div>
                <div className="box">
                  <InfoIcon />{" "}
                  <div>
                    <div className="hover-text">
                      <b>henkilön nimi: </b> {fb.person?.firstNames}{" "}
                      {fb.person?.nickname && `"${fb.person?.nickname}"`}{" "}
                      {fb.person?.lastName} {fb.person?.birthPlace}{" "}
                      {fb.person?.birthTime} {fb.person?.deathPlace}{" "}
                      {fb.person?.deathTime} {fb.person?.deathReason}{" "}
                      <b>sukunimi tai talonnimi {`(oma, ei puoliso)`}: </b>{" "}
                      {fb.person?.family} <b>äiti: </b> {fb?.mother?.firstNames}{" "}
                      {fb?.mother?.nickname && `"${fb?.mother?.nickname}"`}{" "}
                      {fb?.mother?.lastName} {fb?.mother?.birthPlace}{" "}
                      {fb?.mother?.birthTime} {fb?.mother?.deathPlace}{" "}
                      {fb?.mother?.deathTime} {fb?.mother?.deathReason}{" "}
                      <b>isä: </b> {fb?.father?.firstNames}{" "}
                      {fb?.father?.nickname && `"${fb?.father?.nickname}"`}{" "}
                      {fb?.father?.lastName} {fb?.father?.birthPlace}{" "}
                      {fb?.father?.birthTime} {fb?.father?.deathPlace}{" "}
                      {fb?.father?.deathTime} <b>puoliso: </b>{" "}
                      {fb?.spouse?.firstNames}{" "}
                      {fb?.spouse?.nickname && `"${fb?.spouse?.nickname}"`}{" "}
                      {fb?.spouse?.lastName} {fb?.spouse?.birthPlace}{" "}
                      {fb?.spouse?.birthTime} {fb?.spouse?.deathPlace}{" "}
                      {fb?.spouse?.deathTime} {fb?.spouse?.deathReason}
                      <b>vihitty: </b> {fb?.marriedPlace} {fb?.marriedTime}{" "}
                      <b>puolison äiti: </b> {fb?.spouseMother?.firstNames}{" "}
                      {fb?.spouseMother?.nickname &&
                        `"${fb?.spouseMother?.nickname}"`}{" "}
                      {fb?.spouseMother?.lastName}{" "}
                      {fb?.spouseMother?.birthPlace}{" "}
                      {fb?.spouseMother?.birthTime}{" "}
                      {fb?.spouseMother?.deathPlace}{" "}
                      {fb?.spouseMother?.deathTime}{" "}
                      {fb?.spouseMother?.deathReason} <b>puolison isä: </b>{" "}
                      {fb?.spouseFather?.firstNames}{" "}
                      {fb?.spouseFather?.nickname &&
                        `"${fb?.spouseFather?.nickname}"`}{" "}
                      {fb?.spouseFather?.lastName}{" "}
                      {fb?.spouseFather?.birthPlace}{" "}
                      {fb?.spouseFather?.birthTime}{" "}
                      {fb?.spouseFather?.deathPlace}{" "}
                      {fb?.spouseFather?.deathTime}{" "}
                      {fb?.spouseFather?.deathReason} <b>lapset: </b>{" "}
                      {fb?.children?.map((child, i) => (
                        <span key={i}>
                          <b>lapsi: </b>
                          {child?.firstNames}{" "}
                          {child?.nickname && `"${child?.nickname}"`}{" "}
                          {child?.lastName} {child?.birthPlace}{" "}
                          {child?.birthTime} {child?.deathPlace}{" "}
                          {child?.deathTime} {child?.deathReason}{" "}
                        </span>
                      ))}{" "}
                      <b>lisätiedot lapsista: </b> {fb?.childrenInformation}{" "}
                      <b>pienoiselämänkerta: </b> {fb?.lifeStory}{" "}
                      <b>lähteet: </b> {fb?.sources}
                    </div>
                  </div>
                </div>
              </div>
              <div
                dangerouslySetInnerHTML={{
                  __html: highlightSearchWords(JSON.stringify(fb), searchWords),
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
