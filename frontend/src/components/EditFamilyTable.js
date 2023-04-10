import React, { useState, useEffect } from "react";
import FamilyTableForm from "./FamilyTableForm";
import familyTableService from "../services/familytables";
import peopleService from "../services/people";
import Notification from "../components/notification/Notification";
import ReturnButton from "./buttons/ReturnButton";
import ResetButton from "./buttons/ResetButton";
import { useParams } from "react-router";
import "../assets/selectCheckbox.css";
import "../assets/familyTableForm.css";

const EditFamilyTable = () => {
  const { id } = useParams();

  const [initialFamilyTable, setInitialFamilyTable] = useState();
  const [familyTable, setFamilyTable] = useState();
  const [children, setChildren] = useState();
  const [error, setError] = useState();
  const [message, setMessage] = useState();
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const familyTable = await familyTableService.getById(id);
      setChildren(familyTable.children ?? []);
      setInitialFamilyTable({
        personId: familyTable?.person?._id ?? null,
        motherId: familyTable?.mother?._id ?? null,
        fatherId: familyTable?.father?._id ?? null,
        spouseId: familyTable?.spouse?._id ?? null,
        spouseMotherId: familyTable?.spouseMother?._id ?? null,
        spouseFatherId: familyTable?.spouseFather?._id ?? null,
        childrenIds: familyTable?.children?.map((child) => child?._id) ?? [],
        lifeStory: familyTable?.lifeStory ?? "",
        sources: familyTable?.sources ?? "",
        marriedTime: familyTable?.marriedTime ?? "",
        marriedPlace: familyTable?.marriedPlace ?? "",
        childrenInformation: familyTable?.childrenInformation ?? "",
      });
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    setFamilyTable(initialFamilyTable);
  }, [initialFamilyTable]);

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

  const childrenOptions = children?.map(({ _id, firstNames, lastName }) => ({
    value: _id,
    label: `${firstNames} ${lastName}`,
  }));

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      familyTableService.update(id, familyTable);
      const personData = people.find((obj) => obj.id === familyTable.personId);

      setMessage({
        type: "edit",
        text: `Henkilön ${personData.firstNames.split(" ")[0]} ${
          personData.lastName
        } perhetaulu päivitetty.`,
      });
    } catch (error) {
      setError("Tarkista, että olet valinnut henkilön!");
    }
    setTimeout(() => {
      setMessage(undefined);
      setError(undefined);
    }, 5000);
  };

  const handleClearInputs = () => {
    setFamilyTable(initialFamilyTable);
  };

  return (
    <>
      <Notification
        hasErrors={message?.hasErrors}
        message={message?.text}
        type={message?.type}
      />
      <div className="container">
        <div className="familyTableFormOptions">
          <div>
            <ReturnButton />
          </div>
          <div>
            <ResetButton handleClearInputs={handleClearInputs} editMode />
          </div>
        </div>
      </div>
      {familyTable && (
        <>
          <FamilyTableForm
            selectPeopleData={selectPeopleData}
            childrenOptions={childrenOptions}
            setFamilyTable={setFamilyTable}
            handleClearInputs={handleClearInputs}
            handleSubmit={handleSubmit}
            familyTable={familyTable}
            headerText={"Muokkaa perhetaulua"}
            text={"Päivitä"}
            editMode={true}
            error={error}
          />
        </>
      )}
    </>
  );
};

export default EditFamilyTable;
