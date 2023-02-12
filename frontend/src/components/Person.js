import { useLocation } from "react-router";

const Person = () => {
  const { state } = useLocation();

  return (
    <div>
      <h1>Henkilö</h1>
      <ul>
        <li>{state.firstName}</li>
        <li>{state.lastName}</li>
      </ul>
    </div>
  );
};

export default Person;
