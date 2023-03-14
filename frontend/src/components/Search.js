import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SearchButton from "./buttons/SearchButton";
import "../assets/search.css";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const searchRef = useRef(null);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = () => {
    navigate("/search", { state: searchValue });
    setSearchValue("");
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13 && searchRef.current === document.activeElement) {
      handleSearch();
    }
  };

  return (
    <div>
      <SearchButton handleSearch={handleSearch} />
      <input
        className="searchInput"
        value={searchValue}
        onChange={handleSearchChange}
        ref={searchRef}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default Search;
