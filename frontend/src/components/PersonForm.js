import "../assets/person.css";

const PersonForm = ({ handleSubmit, handleChange, person, buttonText }) => (
  <div className="formContainer">
    <form onSubmit={handleSubmit}>
      <div className="formValueGroup">
        <div>
          <div>kutsumanimi: </div>
          <div>
            <input
              className="formInput"
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
              className="formInput"
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
              className="formInput"
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
              className="formInput"
              name="family"
              value={person.family}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="formValueGroup">
        <div>
          <div>syntymäpaikka: </div>
          <div>
            <input
              className="formInput"
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
              className="formInput"
              name="birthTime"
              value={person.birthTime}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="formValueGroup">
        <div>
          <div>kummit: </div>
          <div>
            <input
              className="formInput"
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
              className="formInput"
              name="baptismDay"
              value={person.baptismDay}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="formValueGroup">
        <div>
          <div>kuolinpaikka: </div>
          <div>
            <input
              className="formInput"
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
              className="formInput"
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
              className="formInput"
              name="deathReason"
              value={person.deathReason}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="formValueGroup">
        <div>
          <div>hautapaikka: </div>
          <div>
            <input
              className="formInput"
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
              className="formInput"
              name="burialTime"
              value={person.burialTime}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="formValueGroup">
        <div>
          <div>elämänkerta: </div>
          <div>
            <textarea
              className="formTextArea"
              name="lifeStory"
              value={person.lifeStory}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="formValueGroup">
        <div>
          <div>lähteet: </div>
          <div>
            <input
              className="formInput"
              name="sources"
              value={person.sources}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <button
        className="btn btn-outline-success formCreateButton"
        type="submit"
      >
        {buttonText}
      </button>
    </form>
  </div>
);

export default PersonForm;
