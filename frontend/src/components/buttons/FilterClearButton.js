const FilterClearButton = ({ handleClearFilter }) => (
  <>
    <button
      className="btn btn-outline-danger clearButton"
      onClick={() => handleClearFilter()}
    >
      Tyhjennä
    </button>
  </>
);

export default FilterClearButton;
