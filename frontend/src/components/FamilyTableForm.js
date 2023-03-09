import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import SingleSelect from "./SingleSelect";
import Checkbox from "./Checkbox";

const FamilyTableForm = ({
  handleClearInputs,
  handleSubmit,
  selectPeopleData,
  handleSelectChange,
  personId,
  motherId,
  fatherId,
  spouseId,
  marriedTime,
  handleMarriedTimeChange,
  marriedPlace,
  handleMarriedPlaceChange,
  spouseMotherId,
  spouseFatherId,
  childrenIds,
  childrenInformation,
  handleChildrenInformationChange,
  lifeStory,
  handleLifeStoryChange,
  sources,
  handleSourcesChange,
  headerText,
  text,
  editMode,
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
                      handleSelectChange("children", selectedOption)
                    }
                    defaultValue={childrenOptions}
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
                      handleSelectChange("children", selectedOption)
                    }
                    value={
                      childrenIds &&
                      selectPeopleData.find(
                        (option) => option.value === childrenIds
                      )
                    }
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
              {text}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default FamilyTableForm;
