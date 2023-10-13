import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "./utils/PrivateRoutes";
import Families from "./components/Families";
import FamilyTree from "./components/FamilyTree";
import Home from "./components/Home";
import People from "./components/People";
import Person from "./components/Person";
import NewPerson from "./components/NewPerson";
import FamilyTables from "./components/FamilyTables";
import FamilyTable from "./components/FamilyTable";
import NewFamilyTable from "./components/NewFamilyTable";
import EditPerson from "./components/EditPerson";
import FamiliesMembers from "./components/FamiliesMembers";
import EditFamilyTable from "./components/EditFamilyTable";
import Login from "./components/Login";
import SearchResults from "./components/SearchResults";
import MapPage from "./components/MapPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/families" exact element={<Families />} />
          <Route path="/families/members" exact element={<FamiliesMembers />} />
          <Route path="/people" exact element={<People />} />
          <Route path="/people/create" exact element={<NewPerson />} />
          <Route path="/people/:id" exact element={<Person />} />
          <Route path="/people/edit/:id" exact element={<EditPerson />} />
          <Route path="/familytables" exact element={<FamilyTables />} />
          <Route
            path="/familytables/create"
            exact
            element={<NewFamilyTable />}
          />
          <Route path="/familytables/:id" exact element={<FamilyTable />} />
          <Route
            path="/familytables/edit/:id"
            exact
            element={<EditFamilyTable />}
          />
          <Route path="/familytree" exact element={<FamilyTree />} />
          <Route path="/search" exact element={<SearchResults />} />
          <Route path="/map" exact element={<MapPage />} />
          <Route path="/" exact element={<Home />} />
        </Route>
        <Route path="/login" exact element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
