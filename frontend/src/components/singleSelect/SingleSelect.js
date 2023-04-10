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
        placeholder={"valitse..."}
      />
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
    </>
  );
};

export default SingleSelect;
