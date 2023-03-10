import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import familytableService from "../services/familytables";
import personService from "../services/people";
import FamilyTableForm from "./FamilyTableForm";
import "../assets/selectCheckbox.css";
import "../assets/familyTableForm.css";

const NewFamilyTable = () => {
  const initialState = useMemo(
    () => ({
      personId: null,
      motherId: null,
      fatherId: null,
      spouseId: null,
      spouseMotherId: null,
      spouseFatherId: null,
      childrenIds: [],
      lifeStory: "",
      sources: "",
      marriedTime: "",
      marriedPlace: "",
      childrenInformation: "",
    }),
    []
  );

  const [familytables, setFamilytables] = useState([]);
  const [people, setPeople] = useState([]);
  const [familytable, setFamilytable] = useState(initialState);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const people = await personService.getAll();
      setPeople(people);
    };
    fetchData();
  }, [setPeople, setFamilytables]);

  const selectPeopleData = people.map(({ id, firstNames, lastName }) => ({
    value: id,
    label: `${firstNames} ${lastName}`,
  }));

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

  const handleSubmit = (event) => {
    event.preventDefault();
    addFamilytable(familytable);
    setFamilytable(initialState);
  };

  const handleClearInputs = () => {
    setFamilytable(initialState);
  };

  return (
    <>
      <FamilyTableForm
        selectPeopleData={selectPeopleData}
        handleClearInputs={handleClearInputs}
        handleSubmit={handleSubmit}
        setFamilytable={setFamilytable}
        familytable={familytable}
        headerText={"Uusi perhetaulu"}
        text={"Luo perhetaulu"}
      />
    </>
  );
};

export default NewFamilyTable;
