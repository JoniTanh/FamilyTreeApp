import FamilyTableForm from "./FamilyTableForm";
import { useState, useEffect } from "react";
import familytableService from "../services/familytables";
import personService from "../services/people";
import { useNavigate } from "react-router";

const NewFamilyTable = () => {
  const [familytables, setFamilytables] = useState([]);
  const [people, setPeople] = useState([]);
  const navigate = useNavigate();

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
    const personName = people.find(
      (obj) => obj.id === returnedFamilyTable.person
    );
    localStorage.setItem("newTable", JSON.stringify(personName));
    navigate("/familytables");
  };

  return (
    <div>
      <FamilyTableForm addFamilytable={addFamilytable} people={people} />
    </div>
  );
};

export default NewFamilyTable;
