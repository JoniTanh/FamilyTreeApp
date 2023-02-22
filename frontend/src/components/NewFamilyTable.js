import FamilyTableForm from "./FamilyTableForm";
import { useState, useEffect } from "react";
import familytableService from "../services/familytables";
import personService from "../services/people";

const NewFamilyTable = () => {
  const [familytables, setFamilytables] = useState([]);
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const people = await personService.getAll();
      setPeople(people);
    };
    fetchData();
  }, [setPeople, setFamilytables]);

  const addFamilytable = async (familytableObject) => {
    const returnedFamilyTable = await familytableService.create(
      familytableObject
    );
    setFamilytables(familytables.concat(returnedFamilyTable));
  };

  return (
    <div>
      <h1>Lisää</h1>
      <FamilyTableForm addFamilytable={addFamilytable} people={people} />
    </div>
  );
};

export default NewFamilyTable;
