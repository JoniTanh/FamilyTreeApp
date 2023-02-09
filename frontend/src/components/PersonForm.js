import React, { useState } from "react";

const PersonFrom = ({ createPerson }) => {
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newBirthPlace, setNewBirthPlace] = useState("");
  const [newBirthTime, setNewBirthTime] = useState("");
  const [newDeathPlace, setNewDeathPlace] = useState("");
  const [newDeathTime, setNewDeathTime] = useState("");

  const handleFirstNameChange = (event) => {
    setNewFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setNewLastName(event.target.value);
  };

  const handleBirthPlaceChange = (event) => {
    setNewBirthPlace(event.target.value);
  };

  const handleBirthTimeChange = (event) => {
    setNewBirthTime(event.target.value);
  };

  const handleDeathPlaceChange = (event) => {
    setNewDeathPlace(event.target.value);
  };

  const handleDeathTimeChange = (event) => {
    setNewDeathTime(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    createPerson({
      firstName: newFirstName,
      lastName: newLastName,
      birthPlace: newBirthPlace,
      birthTime: newBirthTime,
      deathPlace: newDeathPlace,
      deathTime: newDeathTime,
    });
    setNewFirstName("");
    setNewLastName("");
    setNewBirthPlace("");
    setNewBirthTime("");
    setNewDeathPlace("");
    setNewDeathTime("");
  };

  return (
    <div>
      <form onSubmit={addPerson}>
        <div>
          firstname:{" "}
          <input value={newFirstName} onChange={handleFirstNameChange} />
        </div>
        <div>
          lastname:{" "}
          <input value={newLastName} onChange={handleLastNameChange} />
        </div>
        <div>
          birthplace:{" "}
          <input value={newBirthPlace} onChange={handleBirthPlaceChange} />
        </div>
        <div>
          birthtime:{" "}
          <input value={newBirthTime} onChange={handleBirthTimeChange} />
        </div>
        <div>
          deathplace:{" "}
          <input value={newDeathPlace} onChange={handleDeathPlaceChange} />
        </div>
        <div>
          deathtime:{" "}
          <input value={newDeathTime} onChange={handleDeathTimeChange} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default PersonFrom;
