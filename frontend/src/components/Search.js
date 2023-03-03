import { useState } from "react";

const Search = () => {
  const [search, setSearch] = useState("");

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <button type="button" className="btn btn-outline-dark">
        Etsi
      </button>{" "}
      <input
        style={{ marginLeft: "0", marginRight: "0" }}
        value={search}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default Search;
