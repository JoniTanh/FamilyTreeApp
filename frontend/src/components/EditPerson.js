import React, { useState } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import peopleService from "../services/people";
import "../assets/editPerson.css";

const EditPerson = () => {
  const { state } = useLocation();

  const initialState = {
    nickname: state?.nickname ?? "",
    firstNames: state?.firstNames ?? "",
    lastName: state?.lastName ?? "",
    family: state?.family ?? "",
    birthPlace: state?.birthPlace ?? "",
    birthTime: state?.birthTime ?? "",
    deathPlace: state?.deathPlace ?? "",
    deathTime: state?.deathTime ?? "",
    deathReason: state?.deathReason ?? "",
    godparents: state?.godparents ?? "",
    baptismDay: state?.baptismDay ?? "",
    burialPlot: state?.burialPlot ?? "",
    burialTime: state?.burialTime ?? "",
    lifeStory: state?.lifeStory ?? "",
    sources: state?.sources ?? "",
  };

  const [person, setPerson] = useState(initialState);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPerson({ ...person, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    peopleService.update(state.id, person);
  };

  const handleClearInputs = () => {
    setPerson(initialState);
  };

  return (
    <>
      <div className="container">
        <div className="editPersonOptions">
          <div>
            <button
              className="btn btn-outline-warning editPersonReturnButton"
              onClick={() => navigate(-1)}
            >
              {"<- Takaisin"}
            </button>
          </div>
          <div>
            <button
              className="btn btn-outline-danger editPersonClearButton"
              onClick={() => handleClearInputs()}
            >
              Kumoa muutokset
            </button>
          </div>
        </div>
      </div>
      <div className="container editPersonContainer">
        <h1 className="editPersonHeader">
          Muokkaa henkilöä {state.firstNames} {state.lastName}
        </h1>
        <div className="editPersonContent">
          <form onSubmit={handleSubmit}>
            <div className="editPersonValueGroups">
              <div>
                <div>kutsumanimi: </div>
                <div>
                  <input
                    className="editPersonInput"
                    name="nickname"
                    value={person.nickname}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <div>kaikki etunimet: </div>
                <div>
                  <input
                    className="editPersonInput"
                    name="firstNames"
                    value={person.firstNames}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <div>sukunimi: </div>
                <div>
                  <input
                    className="editPersonInput"
                    name="lastName"
                    value={person.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <div>oma suku: </div>
                <div>
                  <input
                    className="editPersonInput"
                    name="family"
                    value={person.family}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="editPersonValueGroups">
              <div>
                <div>syntymäpaikka: </div>
                <div>
                  <input
                    className="editPersonInput"
                    name="birthPlace"
                    value={person.birthPlace}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <div>syntymäaika: </div>
                <div>
                  <input
                    className="editPersonInput"
                    name="birthTime"
                    value={person.birthTime}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="editPersonValueGroups">
              <div>
                <div>kummit: </div>
                <div>
                  <input
                    className="editPersonInput"
                    name="godparents"
                    value={person.godparents}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <div> kastepäivä: </div>
                <div>
                  <input
                    className="editPersonInput"
                    name="baptismDay"
                    value={person.baptismDay}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="editPersonValueGroups">
              <div>
                <div>kuolinpaikka: </div>
                <div>
                  <input
                    className="editPersonInput"
                    name="deathPlace"
                    value={person.deathPlace}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <div>kuolinaika: </div>
                <div>
                  <input
                    className="editPersonInput"
                    name="deathTime"
                    value={person.deathTime}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <div>kuolinsyy: </div>
                <div>
                  <input
                    className="editPersonInput"
                    name="deathReason"
                    value={person.deathReason}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="editPersonValueGroups">
              <div>
                <div>hautapaikka: </div>
                <div>
                  <input
                    className="editPersonInput"
                    name="burialPlot"
                    value={person.burialPlot}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <div>hautausaika: </div>
                <div>
                  <input
                    className="editPersonInput"
                    name="burialTime"
                    value={person.burialTime}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="editPersonValueGroups">
              <div>
                <div>elämänkerta: </div>
                <div>
                  <textarea
                    className="editPersonTextArea"
                    name="lifeStory"
                    value={person.lifeStory}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="editPersonValueGroups">
              <div>
                <div>lähteet: </div>
                <div>
                  <input
                    className="editPersonInput"
                    name="sources"
                    value={person.sources}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <button
              className="btn btn-outline-success editPersonCreateButton"
              type="submit"
            >
              Päivitä
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditPerson;
