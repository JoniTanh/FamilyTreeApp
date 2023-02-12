const Filter = ({ filter, handleFilterChange }) => (
  <div>
    Suodata <input value={filter} onChange={handleFilterChange} />
  </div>
);

export default Filter;
