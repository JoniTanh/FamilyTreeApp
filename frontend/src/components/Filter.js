import FilterClearButton from "../components/buttons/FilterClearButton";

const Filter = ({
  filter,
  handleFilterChange,
  text,
  styleName,
  handleClearFilter,
}) => (
  <>
    <div>
      {text}{" "}
      <input
        className={`${styleName}`}
        value={filter}
        onChange={handleFilterChange}
        placeholder={"Suodata..."}
      />
    </div>
    <FilterClearButton handleClearFilter={handleClearFilter} />
  </>
);

export default Filter;
