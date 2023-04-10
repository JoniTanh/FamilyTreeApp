import React, { useState } from "react";
import Select from "react-select";
import SingleSelect from "./singleSelect/SingleSelect";
import Checkbox from "../components/checkbox/Checkbox";

const FamilyTableForm = ({
  selectPeopleData,
  handleSubmit,
  familyTable,
  headerText,
  text,
  editMode,
  childrenOptions,
  setFamilyTable,
  error,
}) => {
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFamilyTable({
      ...familyTable,
      [name]: value.charAt(0).toUpperCase() + value.slice(1),
    });
  };

  const handleSelectChange = (name, selectedOption) => {
    setFamilyTable({
      ...familyTable,
      [name]: selectedOption ? selectedOption.value : null,
    });
  };

  const handleMultiSelectChange = (name, selectedOption) => {
    const selectedValues = selectedOption
      ? selectedOption.map((option) => option.value)
      : [];
    setFamilyTable({
      ...familyTable,
      [name]: selectedValues,
    });
  };

  // multiselect
  const [isClearable, setIsClearable] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isSearchable, setIsSearchable] = useState(true);

  return (
    <>
      <div className="container familyTableFormContainer">
        <h1 className="familyTableFormHeader">{headerText}</h1>
        <div className="familyTableFormContent">
          <form onSubmit={handleSubmit}>
            <div className="familyTableFormValueGroup">
              <div>henkilö:</div>
              <div>
                <SingleSelect
                  name="personId"
                  selectPeopleData={selectPeopleData}
                  handleSelectChange={handleSelectChange}
                  value={familyTable.personId}
                  text={"personId"}
                  id={familyTable.personId}
                />
              </div>
            </div>
            <div className="familyTableFormValueGroup">
              <div>henkilön äiti:</div>
              <div>
                <SingleSelect
                  name="motherId"
                  selectPeopleData={selectPeopleData}
                  handleSelectChange={handleSelectChange}
                  value={familyTable.motherId}
                  text={"motherId"}
                  id={familyTable.motherId}
                />
              </div>
            </div>
            <div className="familyTableFormValueGroup">
              <div>henkilön isä:</div>
              <div>
                <SingleSelect
                  name="fathedId"
                  selectPeopleData={selectPeopleData}
                  handleSelectChange={handleSelectChange}
                  value={familyTable.fatherId}
                  text={"fatherId"}
                  id={familyTable.fatherId}
                />
              </div>
            </div>
            <div className="familyTableFormValueGroup">
              <div>henkilön puoliso:</div>
              <div>
                <SingleSelect
                  name="spouseId"
                  selectPeopleData={selectPeopleData}
                  handleSelectChange={handleSelectChange}
                  value={familyTable.spouseId}
                  text={"spouseId"}
                  id={familyTable.spouseId}
                />
              </div>
            </div>
            <div className="familyTableFormValueGroup">
              <div className="marriageInputFields">
                <div>
                  <div>vihkimisaika:</div>
                  <input
                    className="familyTableFormInput"
                    value={familyTable.marriedTime}
                    onChange={handleChange}
                    name="marriedTime"
                  />
                </div>
                <div>
                  <div>vihkimispaikka:</div>
                  <input
                    className="familyTableFormInput"
                    value={familyTable.marriedPlace}
                    onChange={handleChange}
                    name="marriedPlace"
                  />
                </div>
              </div>
            </div>
            <div className="familyTableFormValueGroup">
              <div>puolison äiti:</div>
              <div>
                <SingleSelect
                  name="spouseMotherId"
                  selectPeopleData={selectPeopleData}
                  handleSelectChange={handleSelectChange}
                  text={"spouseMotherId"}
                  id={familyTable.spouseMotherId}
                />
              </div>
            </div>
            <div className="familyTableFormValueGroup">
              <div>puolison isä:</div>
              <div>
                <SingleSelect
                  name="spouseFatherId"
                  selectPeopleData={selectPeopleData}
                  handleSelectChange={handleSelectChange}
                  text={"spouseFatherId"}
                  id={familyTable.spouseFatherId}
                />
              </div>
            </div>
            <div className="familyTableFormValueGroup">
              <div>lapset:</div>
              <div>
                {editMode ? (
                  <Select
                    isMulti={true}
                    isDisabled={isDisabled}
                    isClearable={isClearable}
                    isSearchable={isSearchable}
                    options={selectPeopleData}
                    getOptionValue={(option) => option.value}
                    getOptionLabel={(option) => option.label}
                    onChange={(selectedOption) =>
                      handleMultiSelectChange("childrenIds", selectedOption)
                    }
                    defaultValue={childrenOptions}
                    name="childrenIds"
                    placeholder={"valitse..."}
                  />
                ) : (
                  <Select
                    isMulti={true}
                    isDisabled={isDisabled}
                    isClearable={isClearable}
                    isSearchable={isSearchable}
                    options={selectPeopleData}
                    getOptionValue={(option) => option.value}
                    getOptionLabel={(option) => option.label}
                    onChange={(selectedOption) =>
                      handleMultiSelectChange("childrenIds", selectedOption)
                    }
                    value={
                      familyTable.childrenIds &&
                      familyTable.childrenIds.map((childId) =>
                        selectPeopleData.find(
                          (option) => option.value === childId
                        )
                      )
                    }
                    name="childrenIds"
                    placeholder={"valitse..."}
                  />
                )}

                <div className="selectCheckbox">
                  <Checkbox
                    checked={isClearable}
                    onChange={() => setIsClearable((state) => !state)}
                  >
                    tyhjennettävissä
                  </Checkbox>
                  <Checkbox
                    checked={isSearchable}
                    onChange={() => setIsSearchable((state) => !state)}
                  >
                    hakuominaisuus
                  </Checkbox>
                  <Checkbox
                    checked={isDisabled}
                    onChange={() => setIsDisabled((state) => !state)}
                  >
                    lukitse
                  </Checkbox>
                </div>
              </div>
            </div>
            <div className="familyTableFormValueGroup">
              <div>lisätietoa lapsista:</div>
              <div>
                <input
                  className="familyTableSourceInput"
                  name="childrenInformation"
                  value={familyTable.childrenInformation}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="familyTableFormValueGroup">
              <div>pienoiselämänkerta:</div>
              <div>
                <textarea
                  className="familyTableFormTextArea"
                  name="lifeStory"
                  value={familyTable.lifeStory}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="familyTableFormValueGroup">
              <div>lähde:</div>
              <div>
                <input
                  className="familyTableSourceInput"
                  name="sources"
                  value={familyTable.sources}
                  onChange={handleChange}
                />
              </div>
            </div>
            {error && <div className="familyFormError">{error}</div>}
            <button
              className="btn btn-outline-success familyTableFormCreateButton"
              type="submit"
            >
              {text}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default FamilyTableForm;
