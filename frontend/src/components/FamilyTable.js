import { useLocation } from "react-router";

const FamilyTable = () => {
  const { state } = useLocation();
  console.log(state);
  return (
    <>
      <div className="pt-5 pb-3 px-5 d-flex justify-content-center">
        <div className="pt-4 pb-4 px-5 w-75 shadow bg-white rounded border border-info">
          <div>
            <h1 style={{ color: "blue" }}>Perhetaulu</h1>
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
              {state.mother.deathTime} {state.mother.deathReason}
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
              <b>puoliso: </b> {state.spouse.firstNames} "
              {state.spouse.nickname}" {state.spouse.lastName}
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
              {state.children.map((child) => (
                <div>
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
      </div>
      <div className="px-5 d-flex justify-content-center">
        <div className="w-75">
          <div>
            <span>
              <button type="button" className="btn btn-info">
                Tulosta
              </button>
            </span>
            <span className="px-2">
              <button type="button" className="btn btn-warning">
                Muokkaa
              </button>
            </span>
            <span>
              <button type="button" className="btn btn-danger">
                Peruuta
              </button>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default FamilyTable;
