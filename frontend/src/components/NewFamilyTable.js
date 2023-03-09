import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import familytableService from "../services/familytables";
import personService from "../services/people";
import FamilyTableForm from "./FamilyTableForm";
import "../assets/selectCheckbox.css";
import "../assets/familyTableForm.css";

const NewFamilyTable = () => {
  const [personId, setPersonId] = useState(null);
  const [motherId, setMotherId] = useState(null);
  const [fatherId, setFatherId] = useState(null);
  const [spouseId, setSpouseId] = useState(null);
  const [spouseMotherId, setSpouseMotherId] = useState(null);
  const [spouseFatherId, setSpouseFatherId] = useState(null);
  const [childrenIds, setChildrenIds] = useState([]);
  const [lifeStory, setLifeStory] = useState("");
  const [sources, setSources] = useState("");
  const [marriedTime, setMarriedTime] = useState("");
  const [marriedPlace, setMarriedPlace] = useState("");
  const [childrenInformation, setChildrenInformation] = useState("");

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

  const handleSelectChange = (field, selectedOption) => {
    switch (field) {
      case "person":
        setPersonId(selectedOption ? selectedOption.value : null);
        break;
      case "mother":
        setMotherId(selectedOption ? selectedOption.value : null);
        break;
      case "father":
        setFatherId(selectedOption ? selectedOption.value : null);
        break;
      case "spouse":
        setSpouseId(selectedOption ? selectedOption.value : null);
        break;
      case "spouseMother":
        setSpouseMotherId(selectedOption ? selectedOption.value : null);
        break;
      case "spouseFather":
        setSpouseFatherId(selectedOption ? selectedOption.value : null);
        break;
      case "children":
        setChildrenIds(selectedOption.map((option) => option.value));
        break;
      default:
        break;
    }
  };

  const handleLifeStoryChange = (event) => {
    setLifeStory(event.target.value);
  };

  const handleSourcesChange = (event) => {
    setSources(event.target.value);
  };

  const handleMarriedTimeChange = (event) => {
    setMarriedTime(event.target.value);
  };

  const handleMarriedPlaceChange = (event) => {
    setMarriedPlace(event.target.value);
  };

  const handleChildrenInformationChange = (event) => {
    setChildrenInformation(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (personId) {
      addFamilytable({
        personId,
        motherId,
        fatherId,
        spouseId,
        spouseMotherId,
        spouseFatherId,
        childrenIds,
        lifeStory,
        sources,
        marriedTime,
        marriedPlace,
        childrenInformation,
      });
      setPersonId(null);
      setMotherId(null);
      setFatherId(null);
      setSpouseId(null);
      setSpouseMotherId(null);
      setSpouseFatherId(null);
      setChildrenIds(null);
      setLifeStory("");
      setSources("");
      setMarriedTime("");
      setMarriedPlace("");
      setChildrenInformation("");
    }
  };

  const handleClearInputs = () => {
    setPersonId(null);
    setMotherId(null);
    setFatherId(null);
    setSpouseId(null);
    setSpouseMotherId(null);
    setSpouseFatherId(null);
    setChildrenIds(null);
    setLifeStory("");
    setSources("");
    setMarriedTime("");
    setMarriedPlace("");
    setChildrenInformation("");
  };

  return (
    <>
      <FamilyTableForm
        handleClearInputs={handleClearInputs}
        handleSubmit={handleSubmit}
        selectPeopleData={selectPeopleData}
        handleSelectChange={handleSelectChange}
        personId={personId}
        motherId={motherId}
        fatherId={fatherId}
        spouseId={spouseId}
        marriedTime={marriedTime}
        handleMarriedTimeChange={handleMarriedTimeChange}
        marriedPlace={marriedPlace}
        handleMarriedPlaceChange={handleMarriedPlaceChange}
        spouseMotherId={spouseMotherId}
        spouseFatherId={spouseFatherId}
        childrenIds={childrenIds}
        childrenInformation={childrenInformation}
        handleChildrenInformationChange={handleChildrenInformationChange}
        lifeStory={lifeStory}
        handleLifeStoryChange={handleLifeStoryChange}
        sources={sources}
        handleSourcesChange={handleSourcesChange}
        headerText={"Uusi perhetaulu"}
        text={"Luo perhetaulu"}
      />
    </>
  );
};

export default NewFamilyTable;
