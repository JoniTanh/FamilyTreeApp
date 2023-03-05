import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import peopleService from "../services/people";
import Notification from "../components/Notification";
import PersonForm from "./PersonForm";
import "../assets/person.css";

const EditPerson = () => {
  const { state } = useLocation();

  const [person, setPerson] = useState();
  const [initialPerson, setInitialPerson] = useState();

  const [message, setMessage] = useState();
  const navigate = useNavigate();

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
    setPerson({ ...person, [name]: value });
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
            <button
              className="btn btn-outline-warning returnButton"
              onClick={() => navigate(-1)}
            >
              {"<- Takaisin"}
            </button>
          </div>
          <div>
            <button
              className="btn btn-outline-danger clearButton"
              onClick={() => handleClearInputs()}
            >
              Kumoa muutokset
            </button>
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
