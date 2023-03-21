import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import peopleService from "../services/people";
import Notification from "../components/notification/Notification";
import PersonForm from "./PersonForm";
import "../assets/person.css";
import ReturnButton from "./buttons/ReturnButton";
import ResetButton from "./buttons/ResetButton";

const EditPerson = () => {
  const { state } = useLocation();

  const [person, setPerson] = useState();
  const [initialPerson, setInitialPerson] = useState();
  const [message, setMessage] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const person = await peopleService.getById(state);
      setPerson(person);
      setInitialPerson(person);
    };
    fetchData();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPerson({
      ...person,
      [name]: value.charAt(0).toUpperCase() + value.slice(1),
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await peopleService.update(state, person);
    setMessage({
      type: "changed",
      text: `Henkilö ${person.firstNames.split(" ")[0]} ${
        person.lastName
      } päivitetty.`,
    });
    setTimeout(() => {
      setMessage(undefined);
    }, 5000);
  };

  const handleClearInputs = () => {
    setPerson(initialPerson);
  };

  return (
    <>
      <Notification
        hasErrors={message?.hasErrors}
        message={message?.text}
        type={message?.type}
      />
      <div className="container">
        <div className="topOptions">
          <div>
            <ReturnButton />
          </div>
          <div>
            <ResetButton handleClearInputs={handleClearInputs} editMode />
          </div>
        </div>
      </div>
      <div className="container editPersonContainer pageContainer">
        {person && (
          <>
            <h1 className="personMainHeader">
              Muokkaa henkilöä {person.firstNames} {person.lastName}
            </h1>
            <PersonForm
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              person={person}
              buttonText={"Tallenna muutokset"}
            />
          </>
        )}
      </div>
    </>
  );
};

export default EditPerson;
