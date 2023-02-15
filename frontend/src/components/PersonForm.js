import React, { useState } from "react";

const PersonFrom = ({ createPerson }) => {
  const initialState = {
    firstName: "",
    lastName: "",
    birthPlace: "",
    birthTime: "",
    deathPlace: "",
    deathTime: "",
    deathReason: "",
    godparents: "",
    burialPlot: "",
    burialTime: "",
    lifeStory: "",
    sources: "",
  };

  const [person, setPerson] = useState(initialState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPerson({ ...person, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createPerson(person);
    setPerson(initialState);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          kutsumanimi:{" "}
          <input
            name="firstName"
            value={person.firstName}
            onChange={handleChange}
          />
        </div>
        <div>
          sukunimi:{" "}
          <input
            name="lastName"
            value={person.lastName}
            onChange={handleChange}
          />
        </div>
        <div>
          syntymäpaikka:{" "}
          <input
            name="birthPlace"
            value={person.birthPlace}
            onChange={handleChange}
          />
        </div>
        <div>
          syntymäaika:{" "}
          <input
            name="birthTime"
            value={person.birthTime}
            onChange={handleChange}
          />
        </div>
        <div>
          kuolinpaikka:{" "}
          <input
            name="deathPlace"
            value={person.deathPlace}
            onChange={handleChange}
          />
        </div>
        <div>
          kuolinaika:{" "}
          <input
            name="deathTime"
            value={person.deathTime}
            onChange={handleChange}
          />
        </div>
        <div>
          kuolinsyy{" "}
          <input
            name="deathReason"
            value={person.deathReason}
            onChange={handleChange}
          />
        </div>
        <div>
          kummit{" "}
          <input
            name="godparents"
            value={person.godparents}
            onChange={handleChange}
          />
        </div>
        <div>
          hautapaikka{" "}
          <input
            name="burialPlot"
            value={person.burialPlot}
            onChange={handleChange}
          />
        </div>
        <div>
          hautausaika{" "}
          <input
            name="burialTime"
            value={person.burialTime}
            onChange={handleChange}
          />
        </div>
        <div>
          elämänkertä{" "}
          <input
            name="lifeStory"
            value={person.lifeStory}
            onChange={handleChange}
          />
        </div>
        <div>
          lähteet{" "}
          <input
            name="sources"
            value={person.sources}
            onChange={handleChange}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default PersonFrom;
