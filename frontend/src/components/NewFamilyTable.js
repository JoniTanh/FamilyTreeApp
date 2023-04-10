import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import familytableService from "../services/familytables";
import personService from "../services/people";
import FamilyTableForm from "./FamilyTableForm";
import ReturnButton from "./buttons/ReturnButton";
import ResetButton from "./buttons/ResetButton";
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
  const [familyTable, setFamilytable] = useState(initialState);
  const [error, setError] = useState();
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addFamilytable(familyTable);
      setFamilytable(initialState);
    } catch (error) {
      setError("Tarkista, että olet valinnut henkilön!");
    }
    setTimeout(() => {
      setError(undefined);
    }, 5000);
  };

  const handleClearInputs = () => {
    setFamilytable(initialState);
  };

  return (
    <>
      <div className="container">
        <div className="familyTableFormOptions">
          <div>
            <ReturnButton />
          </div>
          <div>
            <ResetButton handleClearInputs={handleClearInputs} />
          </div>
        </div>
      </div>
      <FamilyTableForm
        selectPeopleData={selectPeopleData}
        handleSubmit={handleSubmit}
        setFamilyTable={setFamilytable}
        familyTable={familyTable}
        headerText={"Uusi perhetaulu"}
        text={"Luo perhetaulu"}
        error={error}
      />
    </>
  );
};

export default NewFamilyTable;
