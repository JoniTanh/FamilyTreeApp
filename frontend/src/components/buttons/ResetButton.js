const ResetButton = ({ handleClearInputs, editMode }) => (
  <button
    className="btn btn-outline-danger clearButton"
    onClick={() => handleClearInputs()}
  >
    {editMode ? "Kumoa muutokset" : "Nollaa"}
  </button>
);

export default ResetButton;
