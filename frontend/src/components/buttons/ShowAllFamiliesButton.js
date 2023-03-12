const ShowAllFamiliesButton = ({
  handleAllFamiliesButton,
  filterBornIntoFamily,
}) => {
  return (
    <>
      <button
        className="btn btn-outline-info allFamiliesButton"
        onClick={handleAllFamiliesButton}
        title={
          filterBornIntoFamily
            ? "Näytä kaikki henkilöt, jotka kuuluvat sukuun"
            : "Näytä vain omaa sukua ja/tai sukuun syntyneet henkilöt"
        }
      >
        {filterBornIntoFamily ? "Näytä sukuunkuuluvat" : "Näytä omaa sukua"}
      </button>
    </>
  );
};

export default ShowAllFamiliesButton;
