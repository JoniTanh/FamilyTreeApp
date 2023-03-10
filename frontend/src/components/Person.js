import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import peopleService from "../services/people";
import "../assets/person.css";
import ReturnButton from "./buttons/ReturnButton";

const Person = () => {
  const { state } = useLocation();
  const [person, setPerson] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const person = await peopleService.getById(state);
      setPerson(person);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="container">
        <div className="topOptions">
          <div>
            <ReturnButton />
          </div>
          <div>
            <Link
              className="nav-link text-decoration-none text-dark fw-bold"
              to={`/people/edit/${state}`}
              state={state}
            >
              <button
                type="button"
                className="btn btn-outline-warning personButton"
              >
                Muokkaa
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="container personContainer pageContainer">
        {person && (
          <>
            <h1 className="personHeader">
              {person.nickname
                ? person.nickname
                : person.firstNames.split(" ")[0]}{" "}
              {person.lastName}{" "}
              {person.lastName !== person.family && `o.s. ${person.family}`}
            </h1>
            <div className="personContent">
              <div>
                <b>kutsumanimi:</b> {person.nickname}
              </div>
              <div>
                <b>etunimet:</b> {person.firstNames}
              </div>
              <div>
                <b>sukunimi:</b> {person.lastName}
              </div>
              <div>
                <b>oma suku:</b> {person.family}
              </div>
              <div className="pb-3">
                <b>muut suvut, joihin kuuluu:</b> {person.allFamilies}
              </div>
              <div>
                <b>syntynyt (paikka, aika):</b> {person.birthPlace}{" "}
                {person.birthTime}
              </div>
              <div className="pb-3">
                <b>kummit ja kastep??iv??:</b> {person.godparents}{" "}
                {person.baptismDay}
              </div>
              <div>
                <b>kuollut (paikka, aika, kuolinsyy):</b> {person.deathPlace}{" "}
                {person.deathTime} {person.deathReason}
              </div>
              <div className="pb-3">
                <b>hautauspaikka- ja aika:</b> {person.burialPlot}{" "}
                {person.burialTime}
              </div>
              <div className="pb-3">
                <b>pienoisel??m??nkerta:</b> {person.lifeStory}
              </div>
              <div>
                <b>l??hteet:</b> {person.sources}
              </div>
            </div>
          </>
        )}
      </div>
      <div className="container">
        <div className="personEndOptions">
          <div>
            <button type="button" className="btn btn-outline-info personButton">
              Tulosta
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Person;
