import PersonFrom from "./PersonForm";

const Home = ({ addPerson }) => {
  return (
    <div>
      <h1>Home</h1>
      <PersonFrom createPerson={addPerson} />
    </div>
  );
};

export default Home;
