import { Link, useParams } from "react-router-dom";
import "../assets/familyTable.css";
import ReturnButton from "./buttons/ReturnButton";
import { useState, useEffect, useRef } from "react";
import familyTableService from "../services/familytables";
import { useReactToPrint } from "react-to-print";
import PersonInfo from "./common/PersonInfo";

const FamilyTable = () => {
  const { id } = useParams();
  const [familyTable, setFamilyTable] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const familyTable = await familyTableService.getById(id);
      setFamilyTable(familyTable);
    };
    fetchData();
  }, []);

  const {
    person,
    mother,
    father,
    spouse,
    spouseMother,
    spouseFather,
    children = [],
    lifeStory,
    sources,
    marriedTime,
    marriedPlace,
    childrenInformation,
  } = familyTable;

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "",
  });

  return (
    <>
      <div className="container">
        <div className="familyTableOptions">
          <div>
            <ReturnButton />
          </div>
          <div>
            <Link
              className="nav-link text-decoration-none text-dark fw-bold"
              to={`/familytables/edit/${familyTable._id}`}
            >
              <button
                type="button"
                className="btn btn-outline-warning familyTableButton"
              >
                Muokkaa
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="container familyTableContainer" ref={componentRef}>
        <h1 className="familyTableHeader">
          Henkilön {person?.firstNames?.split(" ")[0] || person?.firstNames}{" "}
          {person?.lastName} perhetaulu
        </h1>
        <div className="familyTableContent">
          <div>
            <b>kutsumanimi: </b> {person?.nickname || ""}
          </div>
          <div>
            <b>etunimet: </b>
            {person?.firstNames}
          </div>
          <div>
            <b>nykyinen sukunimi: </b> {person?.lastName}
          </div>
          <div>
            <b>sukunimi tai talonnimi (oma, ei puoliso): </b> {person?.family}
          </div>
          <PersonInfo person={mother} title="äiti" />
          <PersonInfo person={father} title="isä" paddingBottom />
          <div>
            <b>syntynyt (paikka, aika): </b>
            {person?.birthPlace} {person?.birthTime}
          </div>
          <div className="pb-4">
            <b>kuollut (paikka, aika, kuolinsyy): </b>
            {person?.deathPlace} {person?.deathTime} {person?.deathReason}
          </div>
          <div>
            <b>vihitty (paikka, aika): </b>
            {marriedPlace} {marriedTime}
          </div>
          <div>
            <b>puoliso: </b> {spouse?.firstNames}{" "}
            {spouse?.nickname && `"${spouse?.nickname}"`} {spouse?.lastName}
          </div>
          <PersonInfo person={spouseMother} title="puolison äiti" />
          <PersonInfo
            person={spouseFather}
            title="puolison isä"
            paddingBottom
          />
          <div>
            <b>syntynyt (paikka, aika): </b>
            {spouse?.birthPlace} {spouse?.birthTime}
          </div>
          <div className="pb-4">
            <b>kuollut (paikka, aika, kuolinsyy): </b>
            {spouse?.deathPlace} {spouse?.deathTime} {spouse?.deathReason}
          </div>
          <div className="pb-4">
            <b>lapset: </b>
            {children.map((child, i) => (
              <PersonInfo key={i} person={child} />
            ))}
          </div>
          <div className="pb-4">
            <b>lisätietoa lapsista: </b>
            {childrenInformation}
          </div>
          <div className="pb-4">
            <b>pienoiselämänkerta: </b>
            {lifeStory}
          </div>
          <div>
            <b>lähteet: </b>
            {sources}
          </div>
        </div>
      </div>
      <div className="container">
        <div className="familyTableEndOptions">
          <div>
            <button
              type="button"
              className="btn btn-outline-info familyTableButton"
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

export default FamilyTable;
