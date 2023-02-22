const Filter = ({ filter, handleFilterChange, text, styleName }) => (
  <div>
    {text}{" "}
    <input
      className={`${styleName}`}
      value={filter}
      onChange={handleFilterChange}
    />
  </div>
);

export default Filter;
