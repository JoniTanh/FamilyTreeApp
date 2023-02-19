import { useLocation } from "react-router";

const Person = () => {
  const { state } = useLocation();

  return (
    <>
      <div className="pt-5 pb-3 px-5 d-flex justify-content-center">
        <div className="pt-4 pb-4 px-5 w-75 shadow bg-white rounded border border-info">
          <div>
            <h1>
              {state.nickname ? state.nickname : state.firstNames.split(" ")[0]}{" "}
              {state.lastName}
            </h1>
            <div>
              <b>kutsumanimi:</b> {state.nickname}
            </div>
            <div>
              <b>etunimet:</b> {state.firstNames}
            </div>
            <div className="pb-3">
              <b>sukunimi:</b> {state.lastName}
            </div>
            <div>
              <b>syntynyt (paikka, aika):</b> {state.birthPlace}{" "}
              {state.birthTime}
            </div>
            <div className="pb-3">
              <b>kummit ja kastepäivä:</b> {state.godparents}
            </div>
            <div>
              <b>kuollut (paikka, aika, kuolinsyy):</b> {state.deathPlace}{" "}
              {state.deathTime} {state.deathReason}
            </div>
            <div className="pb-3">
              <b>hautauspaikka- ja aika:</b> {state.burialPlot}{" "}
              {state.burialTime}
            </div>
            <div className="pb-3">
              <b>pienoiselämänkerta:</b> {state.lifeStory}
            </div>
            <div>
              <b>lähteet:</b> {state.sources}
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

export default Person;
