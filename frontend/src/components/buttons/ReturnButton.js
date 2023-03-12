import { useNavigate } from "react-router-dom";

const ReturnButton = () => {
  const navigate = useNavigate();

  return (
    <>
      <button
        className="btn btn-outline-warning personButton"
        onClick={() => navigate(-1)}
      >
        {"<- Takaisin"}
      </button>
    </>
  );
};

export default ReturnButton;
