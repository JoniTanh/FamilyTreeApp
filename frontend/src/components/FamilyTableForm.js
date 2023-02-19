import React, { useState } from "react";
import Select from "react-select";

const FamilyTableForm = ({ addFamilytable, people }) => {
  const [personId, setPersonId] = useState(null);

  const newArray = people.map(({ _id, firstNames, lastName }) => ({
    value: _id,
    label: `${firstNames} ${lastName}`,
  }));

  const handleSelectChange = (selectedOption) => {
    console.log("13", selectedOption, "ja", selectedOption.value);
    setPersonId(selectedOption.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (personId) {
      console.log("20", personId);
      addFamilytable({ personId });
      setPersonId(null);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Select
          options={newArray}
          getOptionValue={(option) => option.value}
          getOptionLabel={(option) => option.label}
          onChange={handleSelectChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FamilyTableForm;
