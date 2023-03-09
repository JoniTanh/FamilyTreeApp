import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import SingleSelect from "./SingleSelect";
import Checkbox from "./Checkbox";

const FamilyTableForm = ({
  selectPeopleData,
  handleClearInputs,
  handleSubmit,
  handleChange,
  familytable,
  headerText,
  text,
  editMode,
  handleSelectChange,
  handleMultiSelectChange,
  childrenOptions,
}) => {
  const navigate = useNavigate();

  // multiselect
  const [isClearable, setIsClearable] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isSearchable, setIsSearchable] = useState(true);

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
                  value={familytable.personId}
                  text={"personId"}
                  id={familytable.personId}
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
                  value={familytable.motherId}
                  text={"motherId"}
                  id={familytable.motherId}
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
                  value={familytable.fatherId}
                  text={"fatherId"}
                  id={familytable.fatherId}
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
                  value={familytable.spouseId}
                  text={"spouseId"}
                  id={familytable.spouseId}
                />
              </div>
            </div>
            <div className="familyTableFormValueGroup">
              <div>
                <div>vihkimisaika:</div>
                <input
                  value={familytable.marriedTime}
                  onChange={handleChange}
                  name="marriedTime"
                />
              </div>
              <div>
                <div>vihkimispaikka:</div>
                <input
                  value={familytable.marriedPlace}
                  onChange={handleChange}
                  name="marriedPlace"
                />
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
                  id={familytable.spouseMotherId}
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
                  id={familytable.spouseFatherId}
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
                      familytable.childrenIds &&
                      familytable.childrenIds.map((childId) =>
                        selectPeopleData.find(
                          (option) => option.value === childId
                        )
                      )
                    }
                    name="childrenIds"
                  />
                )}

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
                  name="childrenInformation"
                  value={familytable.childrenInformation}
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
                  value={familytable.lifeStory}
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
                  value={familytable.sources}
                  onChange={handleChange}
                />
              </div>
            </div>
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
