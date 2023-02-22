import PersonFrom from "./PersonForm";
import personService from "../services/people";
import { useState, useEffect } from "react";

const NewPerson = () => {
  const [people, setPeople] = useState([]);

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
  };

  return (
    <div>
      <h1>Lisää</h1>
      <PersonFrom createPerson={addPerson} />
    </div>
  );
};

export default NewPerson;
