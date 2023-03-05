import React, { useState, useEffect, useMemo, useCallback } from "react";
import personService from "../services/people";
import { useNavigate } from "react-router-dom";
import PersonForm from "./PersonForm";
import "../assets/person.css";

const NewPerson = () => {
  const initialState = useMemo(
    () => ({
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
    }),
    []
  );

  const [people, setPeople] = useState([]);
  const [person, setPerson] = useState(initialState);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const people = await personService.getAll();
      setPeople(people);
    };
    fetchData();
  }, [setPeople]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPerson({ ...person, [name]: value });
  };

  const createPerson = useCallback(
    async (personObject) => {
      const returnedPerson = await personService.create(personObject);
      setPeople(people.concat(returnedPerson));
      localStorage.setItem("newPerson", JSON.stringify(returnedPerson));
      navigate("/people");
    },
    [people, navigate]
  );

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
              Nollaa
            </button>
          </div>
        </div>
      </div>
      <div className="container newPersonContainer pageContainer">
        <h1 className="personMainHeader">Uusi henkilö</h1>
        <PersonForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          person={person}
          buttonText={"Luo henkilö"}
        />
      </div>
    </>
  );
};

export default NewPerson;
