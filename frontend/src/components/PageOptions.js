import "../assets/pageOptions.css";

const PageOptions = ({
  totalItems,
  totalPages,
  selectOption,
  setRows,
  rows,
  setCurrentPage,
  currentPage,
}) => {
  const handleRowChange = (event) => {
    setRows(Number(event.target.value));
  };

  const handlePageChange = (value) => {
    setCurrentPage(value);
  };

  return (
    <div className="container pageButtons">
      <button
        className="btn btn-outline-dark previousPageButton"
        disabled={currentPage === 1 || !totalItems}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        {"<"}
      </button>
      <div className="pageValues">
        <input
          className="leftPageNumberInput"
          disabled
          value={totalItems ? Math.min(totalPages, currentPage) : 1}
        />{" "}
        of{" "}
        <input
          className="rightPageNumberInput"
          disabled
          value={totalPages > 0 ? totalPages : 1}
        />
        {selectOption ? (
          <select
            className="selectOptions"
            rows={rows}
            onChange={handleRowChange}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="75">75</option>
            <option value="100">100</option>
          </select>
        ) : (
          ""
        )}
      </div>
      <button
        className="btn btn-outline-dark nextPageButton"
        disabled={currentPage === totalPages || !totalItems}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        {">"}
      </button>
    </div>
  );
};

export default PageOptions;
