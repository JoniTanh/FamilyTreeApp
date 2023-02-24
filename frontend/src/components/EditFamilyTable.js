import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import SingleSelect from "./SingleSelect";
import Checkbox from "./Checkbox";
import familyTableService from "../services/familytables";
import peopleService from "../services/people";
import "../assets/selectCheckbox.css";
import "../assets/familyTableForm.css";

const EditFamilyTable = () => {
  const { state } = useLocation();

  const [personId, setPersonId] = useState(state?.person._id ?? null);
  const [motherId, setMotherId] = useState(state?.mother._id ?? null);
  const [fatherId, setFatherId] = useState(state?.father._id ?? null);
  const [spouseId, setSpouseId] = useState(state?.spouse._id ?? null);
  const [spouseMotherId, setSpouseMotherId] = useState(
    state?.spouseMother._id ?? null
  );
  const [spouseFatherId, setSpouseFatherId] = useState(
    state?.spouseFather._id ?? null
  );
  const [childrenIds, setChildrenIds] = useState(
    state?.children.map((child) => child._id) ?? []
  );
  const [lifeStory, setLifeStory] = useState(state?.lifeStory ?? "");
  const [sources, setSources] = useState(state?.sources ?? "");

  // multiselect
  const [isClearable, setIsClearable] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isSearchable, setIsSearchable] = useState(true);

  const [people, setPeople] = useState([]);
  const [children, setChildren] = useState(state?.children ?? []);

  useEffect(() => {
    const fetchData = async () => {
      const people = await peopleService.getAll();
      setPeople(people);
    };
    fetchData();
  }, [setPeople]);

  const navigate = useNavigate();

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
      };
      familyTableService.update(state._id, updatedFamilyTable);
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
              Kumoa muutokset
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
                  defaultValue={childrenOptions}
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
              Päivitä
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditFamilyTable;
