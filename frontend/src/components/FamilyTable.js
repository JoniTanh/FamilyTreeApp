import { useLocation } from "react-router";

const FamilyTable = () => {
  const { state } = useLocation();
  console.log(state);

  return <div>Henkilön xx perhetaulu</div>;
};

export default FamilyTable;
