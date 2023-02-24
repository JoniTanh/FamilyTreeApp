import { useLocation } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import "../assets/person.css";

const Person = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <div className="container">
        <div className="personOptions">
          <div>
            <button
              className="btn btn-outline-warning personButton"
              onClick={() => navigate(-1)}
            >
              {"<- Takaisin"}
            </button>
          </div>
          <div>
            <Link
              className="nav-link text-decoration-none text-dark fw-bold"
              to={`/people/edit/${state.id}`}
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
      <div className="container personContainer">
        <h1 className="personHeader">
          {state.nickname ? state.nickname : state.firstNames.split(" ")[0]}{" "}
          {state.lastName}
        </h1>
        <div className="personContent">
          <div>
            <b>kutsumanimi:</b> {state.nickname}
          </div>
          <div>
            <b>etunimet:</b> {state.firstNames}
          </div>
          <div>
            <b>sukunimi:</b> {state.lastName}
          </div>
          <div className="pb-3">
            <b>oma suku:</b> {state.family}
          </div>
          <div>
            <b>syntynyt (paikka, aika):</b> {state.birthPlace} {state.birthTime}
          </div>
          <div className="pb-3">
            <b>kummit ja kastepäivä:</b> {state.godparents} {state.baptismDay}
          </div>
          <div>
            <b>kuollut (paikka, aika, kuolinsyy):</b> {state.deathPlace}{" "}
            {state.deathTime} {state.deathReason}
          </div>
          <div className="pb-3">
            <b>hautauspaikka- ja aika:</b> {state.burialPlot} {state.burialTime}
          </div>
          <div className="pb-3">
            <b>pienoiselämänkerta:</b> {state.lifeStory}
          </div>
          <div>
            <b>lähteet:</b> {state.sources}
          </div>
        </div>
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
