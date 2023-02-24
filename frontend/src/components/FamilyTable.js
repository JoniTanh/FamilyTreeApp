import { useLocation } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import "../assets/familyTable.css";

const FamilyTable = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

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
  } = state;

  return (
    <>
      <div className="container">
        <div className="familyTableOptions">
          <div>
            <button
              className="btn btn-outline-warning familyTableButton"
              onClick={() => navigate(-1)}
            >
              {"<- Takaisin"}
            </button>
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
          Henkilön {person.firstNames?.split(" ")[0] || person.firstNames}{" "}
          {person.lastName} perhetaulu
        </h1>
        <div className="familyTableContent">
          <div>
            <b>kutsumanimi: </b> {person?.nickname || ""}
          </div>
          <div>
            <b>etunimet: </b>
            {person.firstNames}
          </div>
          <div>
            <b>sukunimi tai talonnimi (oma, ei puoliso): </b> suku arvo?
          </div>
          <div>
            <b>äiti: </b>
            {mother?.firstNames || ""} "{mother?.nickname || ""}"{" "}
            {mother?.lastName || ""} s. {mother?.birthPlace || ""}{" "}
            {mother?.birthTime || ""} k. {mother?.deathPlace || ""}{" "}
            {mother?.deathTime || ""} {mother?.deathReason || ""}
          </div>
          <div className="pb-4">
            <b>isä: </b>
            {father?.firstNames || ""} "{father?.nickname || ""}"{" "}
            {father?.lastName || ""} s. {father?.birthPlace || ""}{" "}
            {father?.birthTime || ""} k. {father?.deathPlace || ""}{" "}
            {father?.deathTime || ""} {father?.deathReason || ""}
          </div>
          <div>
            <b>syntynyt (paikka, aika): </b>
            {person?.birthPlace || ""} {person?.birthTime || ""}
          </div>
          <div className="pb-4">
            <b>kuollut (paikka, aika, kuolinsyy): </b>
            {person?.deathPlace || ""} {person?.deathTime || ""}{" "}
            {person?.deathReason || ""}
          </div>
          <div>
            <b>vihitty (paikka, aika): </b> tekemättä vielä, muista lisätä!!
          </div>
          <div>
            <b>puoliso: </b> {spouse?.firstNames || ""} "
            {spouse?.nickname || ""}" {spouse?.lastName || ""}
          </div>
          <div>
            <b>puolison äiti: </b>
            {spouseMother?.firstNames || ""} "{spouseMother?.nickname || ""}"{" "}
            {spouseMother?.lastName || ""} s. {spouseMother?.birthPlace || ""}{" "}
            {spouseMother?.birthTime || ""} k. {spouseMother?.deathPlace || ""}{" "}
            {spouseMother?.deathTime || ""} {spouseMother?.deathReason || ""}
          </div>
          <div className="pb-4">
            <b>puolison isä: </b>
            {spouseFather?.firstNames || ""} "{spouseFather?.nickname || ""}"{" "}
            {spouseFather?.lastName || ""} s. {spouseFather?.birthPlace || ""}{" "}
            {spouseFather?.birthTime || ""} k. {spouseFather?.deathPlace || ""}{" "}
            {spouseFather?.deathTime || ""} {spouseFather?.deathReason || ""}
          </div>
          <div>
            <b>syntynyt (paikka, aika): </b>
            {spouse?.birthPlace || ""} {spouse?.birthTime || ""}
          </div>
          <div className="pb-4">
            <b>kuollut (paikka, aika, kuolinsyy): </b>
            {spouse?.birthPlace || ""} {spouse?.deathTime || ""}{" "}
            {spouse?.deathReason || ""}
          </div>
          <div className="pb-4">
            <b>lapset: </b> LISÄÄ JOKU LISÄTIETOKENTTÄ KOSKIEN LAPSIIN!
            {children.map((child, i) => (
              <div key={i}>
                {child?.firstNames || ""} "{child?.nickname || ""}"{" "}
                {child?.lastName || ""} s. {child?.birthPlace || ""}{" "}
                {child?.birthPlace || ""} k. {child?.deathPlace || ""}{" "}
                {child?.deathTime || ""}
              </div>
            ))}
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
