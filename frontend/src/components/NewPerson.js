import PersonFrom from "./PersonForm";

const NewPerson = ({ addPerson }) => (
  <div>
    <h1>Lisää</h1>
    <PersonFrom createPerson={addPerson} />
  </div>
);

export default NewPerson;
