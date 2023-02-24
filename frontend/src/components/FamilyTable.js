import { useLocation } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import "../assets/familyTable.css";

const FamilyTable = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

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
          Henkilön {state.person.firstNames.split(" ")[0]}{" "}
          {state.person.lastName} perhetaulu
        </h1>
        <div className="familyTableContent">
          <div className="pt-4">
            <b>kutsumanimi: </b> {state.person.nickname}
          </div>
          <div>
            <b>etunimet: </b>
            {state.person.firstNames}
          </div>
          <div>
            <b>sukunimi tai talonnimi (oma, ei puoliso): </b> suku arvo?
          </div>
          <div>
            <b>äiti: </b>
            {state.mother.firstNames} "{state.mother.nickname}"{" "}
            {state.mother.lastName} s. {state.mother.birthPlace}{" "}
            {state.mother.birthTime} k. {state.mother.deathPlace}{" "}
            {state.mother.deathTime} {state?.mother.deathReason}
          </div>
          <div className="pb-4">
            <b>isä: </b>
            {state.father.firstNames} "{state.father.nickname}"{" "}
            {state.father.lastName} s. {state.father.birthPlace}{" "}
            {state.father.birthTime} k. {state.father.deathPlace}{" "}
            {state.father.deathTime} {state.father.deathReason}
          </div>
          <div>
            <b>syntynyt (paikka, aika): </b>
            {state.person.birthPlace} {state.person.birthTime}
          </div>
          <div className="pb-4">
            <b>kuollut (paikka, aika, kuolinsyy): </b>
            {state.person.deathPlace} {state.person.deathTime}{" "}
            {state.person.deathReason}
          </div>
          <div>
            <b>vihitty (paikka, aika): </b> tekemättä vielä, muista lisätä!!
          </div>
          <div>
            <b>puoliso: </b> {state.spouse.firstNames} "{state.spouse.nickname}"{" "}
            {state.spouse.lastName}
          </div>
          <div>
            <b>puolison äiti: </b>
            {state.spouseMother.firstNames} "{state.spouseMother.nickname}"{" "}
            {state.spouseMother.lastName} s. {state.spouseMother.birthPlace}{" "}
            {state.spouseMother.birthTime} k. {state.spouseMother.deathPlace}{" "}
            {state.spouseMother.deathTime} {state.spouseMother.deathReason}
          </div>
          <div className="pb-4">
            <b>puolison isä: </b>
            {state.spouseFather.firstNames} "{state.spouseFather.nickname}"{" "}
            {state.spouseFather.lastName} s. {state.spouseFather.birthPlace}{" "}
            {state.spouseFather.birthTime} k. {state.spouseFather.deathPlace}{" "}
            {state.spouseFather.deathTime} {state.spouseFather.deathReason}
          </div>
          <div>
            <b>syntynyt (paikka, aika): </b>
            {state.spouse.birthPlace} {state.spouse.birthTime}
          </div>
          <div className="pb-4">
            <b>kuollut (paikka, aika, kuolinsyy): </b>
            {state.spouse.birthPlace} {state.spouse.deathTime}{" "}
            {state.spouse.deathReason}
          </div>
          <div className="pb-4">
            <b>lapset: </b> LISÄÄ JOKU LISÄTIETOKENTTÄ KOSKIEN LAPSIIN!
            {state.children.map((child, i) => (
              <div key={i}>
                {child.firstNames} "{child.nickname}" {child.lastName} s.{" "}
                {child.birthPlace} {child.birthPlace} k. {child.deathPlace}{" "}
                {child.deathTime}
              </div>
            ))}
          </div>
          <div className="pb-4">
            <b>pienoiselämänkerta: </b>
            {state.lifeStory}
          </div>
          <div>
            <b>lähteet: </b>
            {state.sources}
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
