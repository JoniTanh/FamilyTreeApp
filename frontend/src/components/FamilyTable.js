import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import "../assets/familyTable.css";
import ReturnButton from "./buttons/ReturnButton";

const FamilyTable = () => {
  const { state } = useLocation();

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
    family,
  } = state;

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
              to={`/familytables/edit/${state._id}`}
              state={state}
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
      <div className="container familyTableContainer">
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
          <div>
            <b>äiti: </b>
            {mother?.firstNames} {mother?.nickname && `"${mother?.nickname}"`}{" "}
            {mother?.lastName}{" "}
            {(mother?.birthPlace || mother?.birthTime) &&
              `s. ${mother?.birthPlace} ${mother?.birthTime}`}{" "}
            {(mother?.deathPlace || mother?.deathTime || mother?.deathReason) &&
              `k. ${mother?.deathPlace} ${mother?.deathTime} ${mother?.deathReason}`}
          </div>
          <div className="pb-4">
            <b>isä: </b>
            {father?.firstNames} {father?.nickname && `"${father?.nickname}"`}{" "}
            {father?.lastName}{" "}
            {(father?.birthPlace || father?.birthTime) &&
              `s. ${father?.birthPlace} ${father?.birthTime}`}{" "}
            {(father?.deathPlace || father?.deathTime || father?.deathReason) &&
              `k. ${father?.deathPlace} ${father.deathTime} ${father?.deathReason}`}
          </div>
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
          <div>
            <b>puolison äiti: </b>
            {spouseMother?.firstNames}{" "}
            {spouseMother?.nickname && `"${spouseMother?.nickname}"`}{" "}
            {spouseMother?.lastName}{" "}
            {(spouseMother?.birthPlace || spouseMother?.birthTime) &&
              `s. ${spouseMother?.birthPlace} ${spouseMother?.birthTime}`}
            {(spouseMother?.deathPlace ||
              spouseMother?.deathTime ||
              spouseMother?.deathReason) &&
              `k. ${spouseMother?.deathPlace} ${spouseMother?.deathTime} ${spouseMother?.deathReason}`}
          </div>
          <div className="pb-4">
            <b>puolison isä: </b>
            {spouseFather?.firstNames}{" "}
            {spouseFather?.nickname && `"${spouseFather?.nickname}"`}{" "}
            {spouseFather?.lastName}{" "}
            {(spouseFather?.birthPlace || spouseFather?.birthTime) &&
              `s. ${spouseFather?.birthPlace} ${spouseFather?.birthTime}`}
            {(spouseFather?.deathPlace ||
              spouseFather?.deathTime ||
              spouseFather?.deathReason) &&
              `k. ${spouseFather?.deathPlace} ${spouseFather?.deathTime} ${spouseFather?.deathReason}`}
          </div>
          <div>
            <b>syntynyt (paikka, aika): </b>
            {spouse?.birthPlace} {spouse?.birthTime}
          </div>
          <div className="pb-4">
            <b>kuollut (paikka, aika, kuolinsyy): </b>
            {spouse?.birthPlace} {spouse?.deathTime} {spouse?.deathReason}
          </div>
          <div className="pb-4">
            <b>lapset: </b>
            {children.map((child, i) => (
              <div key={i}>
                {child?.firstNames} {child?.nickname && `"${child?.nickname}"`}{" "}
                {child?.lastName}{" "}
                {(child?.birthPlace || child?.birthTime) &&
                  `s. ${child?.birthPlace} ${child?.birthTime}`}{" "}
                {(child?.deathPlace || child?.deathTime) &&
                  `k. ${child?.deathPlace} ${child?.deathTime}`}
              </div>
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
