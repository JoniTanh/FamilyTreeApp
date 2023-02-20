import FamilyTableForm from "./FamilyTableForm";

const NewFamilyTable = ({ addFamilytable, people }) => (
  <div>
    <h1>Lisää</h1>
    <FamilyTableForm addFamilytable={addFamilytable} people={people} />
  </div>
);

export default NewFamilyTable;
