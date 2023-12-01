import styles from "../assets/personForm.module.css";
import PersonFormInput from "./UI/PersonFormInput";

const PersonForm = ({ handleSubmit, handleChange, person, buttonText }) => (
  <div className={styles.container}>
    <form onSubmit={handleSubmit}>
      <div className={styles.valueGroup}>
        <PersonFormInput
          label="kutsumanimi"
          name="nickname"
          value={person.nickname}
          onChange={handleChange}
        />
        <PersonFormInput
          label="kaikki etunimet"
          name="firstNames"
          value={person.firstNames}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.valueGroup}>
        <PersonFormInput
          label="sukunimi"
          name="lastName"
          value={person.lastName}
          onChange={handleChange}
          required
          infoText="Henkilön nykyinen sukunimi"
        />
        <PersonFormInput
          label="sukunimi"
          name="family"
          value={person.family}
          onChange={handleChange}
          required
          infoText="Suku, johon henkilö syntynyt"
        />
        <PersonFormInput
          label="muut omat suvut"
          name="allFamilies"
          value={person.allFamilies}
          onChange={handleChange}
          infoText="Muut suvut, joihin henkilö kuuluu. Erota suvut pilkulla. Esim. Suku1, Suku2"
        />
      </div>
      <div className={styles.valueGroup}>
        <PersonFormInput
          label="syntymäpaikka"
          name="birthPlace"
          value={person.birthPlace}
          onChange={handleChange}
        />
        <PersonFormInput
          label="syntymäaika"
          name="birthTime"
          value={person.birthTime}
          onChange={handleChange}
        />
      </div>
      <div className={styles.valueGroup}>
        <PersonFormInput
          label="kummit"
          name="godparents"
          value={person.godparents}
          onChange={handleChange}
        />
        <PersonFormInput
          label="kastepäivä"
          name="baprismDay"
          value={person.baptismDay}
          onChange={handleChange}
        />
      </div>
      <div className={styles.valueGroup}>
        <PersonFormInput
          label="kuolinpaikka"
          name="deathPlace"
          value={person.deathPlace}
          onChange={handleChange}
        />
        <PersonFormInput
          label="kuolinaika"
          name="deathTime"
          value={person.deathTime}
          onChange={handleChange}
        />
        <PersonFormInput
          label="kuolinsyy"
          name="deathReason"
          value={person.deathReason}
          onChange={handleChange}
        />
      </div>
      <div className={styles.valueGroup}>
        <PersonFormInput
          label="hautapaikka"
          name="burialPlot"
          value={person.burialPlot}
          onChange={handleChange}
        />
        <PersonFormInput
          label="hautausaika"
          name="burialTime"
          value={person.burialTime}
          onChange={handleChange}
        />
      </div>
      <div className={styles.valueGroup}>
        <div>
          <div>elämänkerta:</div>
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
      <div className={styles.valueGroup}>
        <PersonFormInput
          label="lähteet"
          name="sources"
          value={person.sources}
          onChange={handleChange}
        />
      </div>
      <button
        className={`btn btn-outline-success ${styles.createButton}`}
        type="submit"
      >
        {buttonText}
      </button>
    </form>
  </div>
);

export default PersonForm;
