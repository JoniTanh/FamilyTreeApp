import React, { useState } from "react";
import Select from "react-select";
import Checkbox from "../checkbox/Checkbox";
import "../../assets/selectCheckbox.css";

const SingleSelect = ({ selectPeopleData, handleSelectChange, text, id }) => {
  const [isClearable, setIsClearable] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isSearchable, setIsSearchable] = useState(true);

  return (
    <>
      <Select
        isDisabled={isDisabled}
        isClearable={isClearable}
        isSearchable={isSearchable}
        options={selectPeopleData}
        getOptionValue={(option) => option.value}
        getOptionLabel={(option) => option.label}
        onChange={(selectedOption) => handleSelectChange(text, selectedOption)}
        value={id && selectPeopleData.find((option) => option.value === id)}
      />
      <div className="selectCheckbox">
        <Checkbox
          checked={isClearable}
          onChange={() => setIsClearable((state) => !state)}
        >
          Tyhjennettävissä
        </Checkbox>
        <Checkbox
          checked={isSearchable}
          onChange={() => setIsSearchable((state) => !state)}
        >
          Hakuominaisuus
        </Checkbox>
        <Checkbox
          checked={isDisabled}
          onChange={() => setIsDisabled((state) => !state)}
        >
          Lukitse
        </Checkbox>
      </div>
    </>
  );
};

export default SingleSelect;
