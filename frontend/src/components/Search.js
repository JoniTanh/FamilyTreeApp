const Search = ({ search, handleSearchChange }) => (
  <div>
    <button>Search</button>{" "}
    <input value={search} onChange={handleSearchChange} />
  </div>
);

export default Search;
