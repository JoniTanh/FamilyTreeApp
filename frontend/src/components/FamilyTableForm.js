import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import SingleSelect from "./SingleSelect";
import Checkbox from "./Checkbox";
import "../assets/selectCheckbox.css";
import "../assets/familyTableForm.css";

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
  const [marriedTime, setMarriedTime] = useState("");
  const [marriedPlace, setMarriedPlace] = useState("");
  const [childrenInformation, setChildrenInformation] = useState("");

  // multiselect
  const [isClearable, setIsClearable] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isSearchable, setIsSearchable] = useState(true);

  const navigate = useNavigate();

  const selectPeopleData = people.map(({ id, firstNames, lastName }) => ({
    value: id,
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
      <div className="container">
        <div className="familyTableFormOptions">
          <div>
            <button
              className="btn btn-outline-warning familyTableFormReturnButton"
              onClick={() => navigate(-1)}
            >
              {"<- Takaisin"}
            </button>
          </div>
          <div>
            <button
              className="btn btn-outline-danger familyTableFormClearButton"
              onClick={() => handleClearInputs()}
            >
              Nollaa
            </button>
          </div>
        </div>
      </div>
      <div className="container familyTableFormContainer">
        <h1 className="familyTableFormHeader">Uusi perhetaulu</h1>
        <div className="familyTableFormContent">
          <form onSubmit={handleSubmit}>
            <div className="familyTableFormValueGroup">
              <div>henkilö:</div>
              <div>
                <SingleSelect
                  selectPeopleData={selectPeopleData}
                  handleSelectChange={handleSelectChange}
                  text={"person"}
                  id={personId}
                />
              </div>
            </div>
            <div className="familyTableFormValueGroup">
              <div>henkilön äiti:</div>
              <div>
                <SingleSelect
                  selectPeopleData={selectPeopleData}
                  handleSelectChange={handleSelectChange}
                  text={"mother"}
                  id={motherId}
                />
              </div>
            </div>
            <div className="familyTableFormValueGroup">
              <div>henkilön isä:</div>
              <div>
                <SingleSelect
                  selectPeopleData={selectPeopleData}
                  handleSelectChange={handleSelectChange}
                  text={"father"}
                  id={fatherId}
                />
              </div>
            </div>
            <div className="familyTableFormValueGroup">
              <div>henkilön puoliso:</div>
              <div>
                <SingleSelect
                  selectPeopleData={selectPeopleData}
                  handleSelectChange={handleSelectChange}
                  text={"spouse"}
                  id={spouseId}
                />
              </div>
            </div>
            <div className="familyTableFormValueGroup">
              <div>
                <div>vihkimisaika:</div>
                <input value={marriedTime} onChange={handleMarriedTimeChange} />
              </div>
              <div>
                <div>vihkimispaikka:</div>
                <input
                  value={marriedPlace}
                  onChange={handleMarriedPlaceChange}
                />
              </div>
            </div>
            <div className="familyTableFormValueGroup">
              <div>puolison äiti:</div>
              <div>
                <SingleSelect
                  selectPeopleData={selectPeopleData}
                  handleSelectChange={handleSelectChange}
                  text={"spouseMother"}
                  id={spouseMotherId}
                />
              </div>
            </div>
            <div className="familyTableFormValueGroup">
              <div>puolison isä:</div>
              <div>
                <SingleSelect
                  selectPeopleData={selectPeopleData}
                  handleSelectChange={handleSelectChange}
                  text={"spouseFather"}
                  id={spouseFatherId}
                />
              </div>
            </div>
            <div className="familyTableFormValueGroup">
              <div>lapset:</div>
              <div>
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
                    selectPeopleData.find(
                      (option) => option.value === childrenIds
                    )
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
              </div>
            </div>
            <div className="familyTableFormValueGroup">
              <div>lisätietoa lapsista:</div>
              <div>
                <input
                  className="familyTableSourceInput"
                  value={childrenInformation}
                  onChange={handleChildrenInformationChange}
                />
              </div>
            </div>
            <div className="familyTableFormValueGroup">
              <div>pienoiselämänkerta:</div>
              <div>
                <textarea
                  className="familyTableFormTextArea"
                  value={lifeStory}
                  onChange={handleLifeStoryChange}
                />
              </div>
            </div>
            <div className="familyTableFormValueGroup">
              <div>lähde:</div>
              <div>
                <input
                  className="familyTableSourceInput"
                  value={sources}
                  onChange={handleSourcesChange}
                />
              </div>
            </div>
            <button
              className="btn btn-outline-success familyTableFormCreateButton"
              type="submit"
            >
              Luo perhetaulu
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default FamilyTableForm;
