import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Families from "./components/Families";
import FamilyTree from "./components/FamilyTree";
import LoginForm from "./components/LoginForm";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import People from "./components/People";
import Person from "./components/Person";
import loginService from "./services/login";
import NewPerson from "./components/NewPerson";
import FamilyTables from "./components/FamilyTables";
import FamilyTable from "./components/FamilyTable";
import NewFamilyTable from "./components/NewFamilyTable";
import EditPerson from "./components/EditPerson";
import FamiliesMembers from "./components/FamiliesMembers";
import EditFamilyTable from "./components/EditFamilyTable";

// App.js tyhjennettävä lähes kokonaan!

const App = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  // testaile vielä kirjautumista konsolista yms. yms.

  const navigate = useNavigate("/");

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedFamilyAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      if (user) {
        setUser(user);
      } else {
        window.localStorage.removeItem("loggedFamilyAppUser");
      }
    }
  }, [navigate]);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const { token, ...user } = await loginService.login({
        username,
        password,
      });

      if (user) {
        window.localStorage.setItem(
          "loggedFamilyAppUser",
          JSON.stringify({ token, ...user })
        );
        setUser({ token, ...user });
        setUsername("");
        setPassword("");
      } else {
        setErrorMessage("wrong credentials");
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      }
    } catch (exception) {
      setErrorMessage("wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedFamilyAppUser");
    setUser(null);
  };

  const login = () => (
    <LoginForm
      handleLogin={handleLogin}
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
    />
  );

  return (
    <div>
      {!user && login()}
      {user && (
        <div>
          <NavBar handleLogout={handleLogout} user={user} />
          <Routes>
            <Route path="/families" element={<Families />} />
            <Route path="/families/members" element={<FamiliesMembers />} />
            <Route path="/people" element={<People />} />
            <Route path="/people/create" element={<NewPerson />} />
            <Route path="/people/:id" element={<Person />} />
            <Route path="/people/edit/:id" element={<EditPerson />} />
            <Route path="/familytables" element={<FamilyTables />} />
            <Route path="/familytables/create" element={<NewFamilyTable />} />
            <Route path="/familytables/:id" element={<FamilyTable />} />
            <Route
              path="/familytables/edit/:id"
              element={<EditFamilyTable />}
            />
            <Route path="/familytree" element={<FamilyTree />} />
            <Route path="/" element={<Home user={user} />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
