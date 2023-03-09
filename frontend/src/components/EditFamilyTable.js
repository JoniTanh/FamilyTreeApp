import React, { useState, useEffect, useMemo } from "react";
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

  const initialState = useMemo(
    () => ({
      personId: state?.person?._id ?? null,
      motherId: state?.mother?._id ?? null,
      fatherId: state?.father?._id ?? null,
      spouseId: state?.spouse?._id ?? null,
      spouseMotherId: state?.spouseMother?._id ?? null,
      spouseFatherId: state?.spouseFather?._id ?? null,
      childrenIds: state?.children?.map((child) => child?._id) ?? [],
      lifeStory: state?.lifeStory ?? "",
      sources: state?.sources ?? "",
      marriedTime: state?.marriedTime ?? "",
      marriedPlace: state?.marriedPlace ?? "",
      childrenInformation: state?.childrenInformation ?? "",
    }),
    []
  );

  const [message, setMessage] = useState();
  const [people, setPeople] = useState([]);
  const [children, setChildren] = useState(state?.children ?? []);
  const [familytable, setFamilytable] = useState(initialState);

  useEffect(() => {
    const fetchData = async () => {
      const people = await peopleService.getAll();
      setPeople(people);
    };
    fetchData();
  }, [setPeople]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFamilytable({ ...familytable, [name]: value });
  };

  const handleSelectChange = (name, selectedOption) => {
    setFamilytable({
      ...familytable,
      [name]: selectedOption ? selectedOption.value : null,
    });
  };

  const handleMultiSelectChange = (name, selectedOption) => {
    const selectedValues = selectedOption
      ? selectedOption.map((option) => option.value)
      : [];
    setFamilytable({
      ...familytable,
      [name]: selectedValues,
    });
  };

  const selectPeopleData = people.map(({ id, firstNames, lastName }) => ({
    value: id,
    label: `${firstNames} ${lastName}`,
  }));

  const childrenOptions = children.map(({ _id, firstNames, lastName }) => ({
    value: _id,
    label: `${firstNames} ${lastName}`,
  }));

  const handleSubmit = (event) => {
    event.preventDefault();
    familyTableService.update(state._id, familytable);

    const personData = people.find((obj) => obj.id === familytable.personId);

    setMessage({
      type: "edit",
      text: `Henkilön ${personData.firstNames.split(" ")[0]} ${
        personData.lastName
      } perhetaulu päivitetty.`,
    });
    setTimeout(() => {
      setMessage(undefined);
    }, 5000);
  };

  const handleClearInputs = () => {
    setFamilytable(initialState);
  };

  return (
    <>
      <Notification
        hasErrors={message?.hasErrors}
        message={message?.text}
        type={message?.type}
      />
      {familytable && (
        <>
          <FamilyTableForm
            selectPeopleData={selectPeopleData}
            childrenOptions={childrenOptions}
            handleClearInputs={handleClearInputs}
            handleMultiSelectChange={handleMultiSelectChange}
            handleSelectChange={handleSelectChange}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            familytable={familytable}
            headerText={"Muokkaa perhetaulua"}
            text={"Päivitä"}
            editMode={true}
          />
        </>
      )}
    </>
  );
};

export default EditFamilyTable;
