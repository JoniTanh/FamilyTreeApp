import { useNavigate } from "react-router";

const HomeButton = () => {
  const navigate = useNavigate();

  return (
    <button
      className="btn btn-outline-warning searchPageButton"
      onClick={() => navigate("/")}
    >{`<- Etusivulle`}</button>
  );
};

export default HomeButton;
