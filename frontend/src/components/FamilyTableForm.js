import React, { useState } from "react";
import Select from "react-select";
import SingleSelect from "./SingleSelect";
import Checkbox from "./Checkbox";
import "../assets/selectCheckbox.css";

const FamilyTableForm = ({ addFamilytable, people }) => {
  const [personId, setPersonId] = useState(null);
  const [motherId, setMotherId] = useState(null);
  const [fatherId, setFatherId] = useState(null);
  const [spouseId, setSpouseId] = useState(null);
  const [spouseMotherId, setSpouseMotherId] = useState(null);
  const [spouseFatherId, setSpouseFatherId] = useState(null);
  const [childrenIds, setChildrenIds] = useState([]);
  const [lifeStory, setLifeStory] = useState("");
  const [sources, setSources] = useState("");

  // multiselect
  const [isClearable, setIsClearable] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isSearchable, setIsSearchable] = useState(true);

  const selectPeopleData = people.map(({ _id, firstNames, lastName }) => ({
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
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <SingleSelect
          selectPeopleData={selectPeopleData}
          handleSelectChange={handleSelectChange}
          text={"person"}
          id={personId}
        />
        <SingleSelect
          selectPeopleData={selectPeopleData}
          handleSelectChange={handleSelectChange}
          text={"mother"}
          id={motherId}
        />
        <SingleSelect
          selectPeopleData={selectPeopleData}
          handleSelectChange={handleSelectChange}
          text={"father"}
          id={fatherId}
        />
        <SingleSelect
          selectPeopleData={selectPeopleData}
          handleSelectChange={handleSelectChange}
          text={"spouse"}
          id={spouseId}
        />
        <SingleSelect
          selectPeopleData={selectPeopleData}
          handleSelectChange={handleSelectChange}
          text={"spouseMother"}
          id={spouseMotherId}
        />
        <SingleSelect
          selectPeopleData={selectPeopleData}
          handleSelectChange={handleSelectChange}
          text={"spouseFather"}
          id={spouseFatherId}
        />

        <Select
          isMulti={true}
          isDisabled={isDisabled}
          isClearable={isClearable}
          isSearchable={isSearchable}
          options={selectPeopleData}
          getOptionValue={(option) => option.value}
          getOptionLabel={(option) => option.label}
          onChange={(selectedOption) =>
            handleSelectChange("children", selectedOption)
          }
          value={
            childrenIds &&
            selectPeopleData.find((option) => option.value === childrenIds)
          }
        />
        <div className="selectCheckbox">
          <Checkbox
            checked={isClearable}
            onChange={() => setIsClearable((state) => !state)}
          >
            Clearable
          </Checkbox>
          <Checkbox
            checked={isSearchable}
            onChange={() => setIsSearchable((state) => !state)}
          >
            Searchable
          </Checkbox>
          <Checkbox
            checked={isDisabled}
            onChange={() => setIsDisabled((state) => !state)}
          >
            Disabled
          </Checkbox>
        </div>
        <div>
          pienoiselämänkerta:{" "}
          <input value={lifeStory} onChange={handleLifeStoryChange} />
        </div>
        <div>
          lähde: <input value={sources} onChange={handleSourcesChange} />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default FamilyTableForm;
