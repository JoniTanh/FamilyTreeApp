import PersonFrom from "./PersonForm";
import personService from "../services/people";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const NewPerson = () => {
  const [people, setPeople] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const people = await personService.getAll();
      setPeople(people);
    };
    fetchData();
  }, [setPeople]);

  const addPerson = async (personObject) => {
    const returnedPerson = await personService.create(personObject);
    setPeople(people.concat(returnedPerson));
    localStorage.setItem("newPerson", JSON.stringify(returnedPerson));
    navigate("/people");
  };

  return (
    <div>
      <PersonFrom createPerson={addPerson} />
    </div>
  );
};

export default NewPerson;
