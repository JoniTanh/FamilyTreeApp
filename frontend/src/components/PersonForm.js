import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/personForm.css";

const PersonFrom = ({ createPerson }) => {
  const initialState = {
    nickname: "",
    firstNames: "",
    lastName: "",
    family: "",
    birthPlace: "",
    birthTime: "",
    deathPlace: "",
    deathTime: "",
    deathReason: "",
    godparents: "",
    baptismDay: "",
    burialPlot: "",
    burialTime: "",
    lifeStory: "",
    sources: "",
  };

  const [person, setPerson] = useState(initialState);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPerson({ ...person, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createPerson(person);
    setPerson(initialState);
  };

  const handleClearInputs = () => {
    setPerson(initialState);
  };

  return (
    <>
      <div className="container">
        <div className="personFormOptions">
          <div>
            <button
              className="btn btn-outline-warning personFormReturnButton"
              onClick={() => navigate(-1)}
            >
              {"<- Takaisin"}
            </button>
          </div>
          <div>
            <button
              className="btn btn-outline-danger personFormClearButton"
              onClick={() => handleClearInputs()}
            >
              Nollaa
            </button>
          </div>
        </div>
      </div>
      <div className="container personFormContainer">
        <h1 className="personFormHeader">Uusi henkilö</h1>
        <div className="personFormContent">
          <form onSubmit={handleSubmit}>
            <div className="personFormValueGroups">
              <div>
                <div>kutsumanimi: </div>
                <div>
                  <input
                    className="personFormInput"
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
                    className="personFormInput"
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
                    className="personFormInput"
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
                    className="personFormInput"
                    name="family"
                    value={person.family}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="personFormValueGroups">
              <div>
                <div>syntymäpaikka: </div>
                <div>
                  <input
                    className="personFormInput"
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
                    className="personFormInput"
                    name="birthTime"
                    value={person.birthTime}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="personFormValueGroups">
              <div>
                <div>kummit: </div>
                <div>
                  <input
                    className="personFormInput"
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
                    className="personFormInput"
                    name="baptismDay"
                    value={person.baptismDay}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="personFormValueGroups">
              <div>
                <div>kuolinpaikka: </div>
                <div>
                  <input
                    className="personFormInput"
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
                    className="personFormInput"
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
                    className="personFormInput"
                    name="deathReason"
                    value={person.deathReason}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="personFormValueGroups">
              <div>
                <div>hautapaikka: </div>
                <div>
                  <input
                    className="personFormInput"
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
                    className="personFormInput"
                    name="burialTime"
                    value={person.burialTime}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="personFormValueGroups">
              <div>
                <div>elämänkerta: </div>
                <div>
                  <textarea
                    className="personFormTextArea"
                    name="lifeStory"
                    value={person.lifeStory}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="personFormValueGroups">
              <div>
                <div>lähteet: </div>
                <div>
                  <input
                    className="personFormInput"
                    name="sources"
                    value={person.sources}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <button
              className="btn btn-outline-success personFormCreateButton"
              type="submit"
            >
              Luo henkilö
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PersonFrom;
