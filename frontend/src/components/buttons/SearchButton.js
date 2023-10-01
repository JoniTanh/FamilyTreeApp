const SearchButton = ({ handleSearch }) => (
  <button
    onClick={handleSearch}
    type="button"
    className="searchButton btn btn-outline-dark"
  >
    Etsi
  </button>
);

export default SearchButton;
