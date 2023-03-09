import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import FamilyTableForm from "./FamilyTableForm";
import familyTableService from "../services/familytables";
import peopleService from "../services/people";
import Notification from "../components/Notification";
import "../assets/selectCheckbox.css";
import "../assets/familyTableForm.css";

const EditFamilyTable = () => {
  const { state } = useLocation();

  const [personId, setPersonId] = useState(state?.person?._id ?? null);
  const [motherId, setMotherId] = useState(state?.mother?._id ?? null);
  const [fatherId, setFatherId] = useState(state?.father?._id ?? null);
  const [spouseId, setSpouseId] = useState(state?.spouse?._id ?? null);
  const [spouseMotherId, setSpouseMotherId] = useState(
    state?.spouseMother?._id ?? null
  );
  const [spouseFatherId, setSpouseFatherId] = useState(
    state?.spouseFather?._id ?? null
  );
  const [childrenIds, setChildrenIds] = useState(
    state?.children?.map((child) => child?._id) ?? []
  );
  const [lifeStory, setLifeStory] = useState(state?.lifeStory ?? "");
  const [sources, setSources] = useState(state?.sources ?? "");
  const [marriedTime, setMarriedTime] = useState("");
  const [marriedPlace, setMarriedPlace] = useState("");
  const [childrenInformation, setChildrenInformation] = useState("");

  const [people, setPeople] = useState([]);
  const [children, setChildren] = useState(state?.children ?? []);

  const [message, setMessage] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const people = await peopleService.getAll();
      setPeople(people);
    };
    fetchData();
  }, [setPeople]);

  const selectPeopleData = people.map(({ id, firstNames, lastName }) => ({
    value: id,
    label: `${firstNames} ${lastName}`,
  }));

  const childrenOptions = children.map(({ _id, firstNames, lastName }) => ({
    value: _id,
    label: `${firstNames} ${lastName}`,
  }));

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
      const updatedFamilyTable = {
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
      };
      familyTableService.update(state._id, updatedFamilyTable);

      const personData = people.find(
        (obj) => obj.id === updatedFamilyTable.personId
      );

      setMessage({
        type: "edit",
        text: `Henkilön ${personData.firstNames.split(" ")[0]} ${
          personData.lastName
        } perhetaulu päivitetty.`,
      });
      setTimeout(() => {
        setMessage(undefined);
      }, 5000);
    }
  };

  const handleClearInputs = () => {
    setPersonId(state?.person._id ?? null);
    setMotherId(state?.mother._id ?? null);
    setFatherId(state?.father._id ?? null);
    setSpouseId(state?.spouse._id ?? null);
    setSpouseMotherId(state?.spouseMother._id ?? null);
    setSpouseFatherId(state?.spouseFather._id ?? null);
    setChildrenIds(state?.children.map((child) => child._id) ?? []);
    setLifeStory(state?.lifeStory ?? "");
    setSources(state?.sources ?? "");
    setMarriedTime(state?.marriedTime ?? "");
    setMarriedPlace(state?.marriedPlace ?? "");
    setChildrenInformation(state.childrenInformation ?? "");
  };

  return (
    <>
      <Notification
        hasErrors={message?.hasErrors}
        message={message?.text}
        type={message?.type}
      />
      <FamilyTableForm
        childrenOptions={childrenOptions}
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
        headerText={"Muokkaa perhetaulua"}
        text={"Päivitä"}
        editMode={true}
      />
    </>
  );
};

export default EditFamilyTable;
