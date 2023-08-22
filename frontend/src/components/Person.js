import { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import peopleService from "../services/people";
import "../assets/person.css";
import ReturnButton from "./buttons/ReturnButton";
import { useReactToPrint } from "react-to-print";

const Person = () => {
  const { id } = useParams();
  const [person, setPerson] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const person = await peopleService.getById(id);
      setPerson(person);
    };
    fetchData();
  }, []);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "",
  });

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
              to={`/people/edit/${id}`}
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
      <div
        className="container personContainer pageContainer"
        ref={componentRef}
      >
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
                <b>kummit ja kastepäivä:</b> {person.godparents}{" "}
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
                <b>pienoiselämänkerta:</b> {person.lifeStory}
              </div>
              <div>
                <b>lähteet:</b> {person.sources}
              </div>
            </div>
          </>
        )}
      </div>
      <div className="container">
        <div className="personEndOptions">
          <div>
            <button
              type="button"
              className="btn btn-outline-info personButton"
              onClick={handlePrint}
            >
              Tulosta
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Person;
