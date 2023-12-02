import { createBrowserRouter, Navigate } from "react-router-dom";
import PrivateRoutes from "../utils/PrivateRoutes";
import Families from "../components/Families";
import FamilyTree from "../components/FamilyTree";
import Home, { loader as notesLoader } from "../components/Home";
import People from "../components/People";
import Person from "../components/Person";
import NewPerson from "../components/NewPerson";
import FamilyTables from "../components/FamilyTables";
import FamilyTable from "../components/FamilyTable";
import NewFamilyTable from "../components/NewFamilyTable";
import EditPerson from "../components/EditPerson";
import FamiliesMembers from "../components/FamiliesMembers";
import EditFamilyTable from "../components/EditFamilyTable";
import Login from "../components/Login";
import SearchResults from "../components/SearchResults";
import MapPage from "../components/MapPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoutes />,
    children: [
      { path: "families", element: <Families />, index: true },
      { path: "families/members", element: <FamiliesMembers />, index: true },
      { path: "people", element: <People />, index: true },
      { path: "people/create", element: <NewPerson />, index: true },
      { path: "people/:id", element: <Person />, index: true },
      { path: "people/edit/:id", element: <EditPerson />, index: true },
      { path: "familytables", element: <FamilyTables />, index: true },
      { path: "familytables/create", element: <NewFamilyTable />, index: true },
      { path: "familytables/:id", element: <FamilyTable />, index: true },
      {
        path: "familytables/edit/:id",
        element: <EditFamilyTable />,
        index: true,
      },
      { path: "familytree", element: <FamilyTree />, index: true },
      { path: "search", element: <SearchResults />, index: true },
      { path: "map", element: <MapPage />, index: true },
      { path: "", element: <Home />, index: true, loader: notesLoader },
      { path: "*", element: <Navigate to="/" /> },
    ],
  },
  { path: "login", element: <Login />, index: true },
]);

export default router;
