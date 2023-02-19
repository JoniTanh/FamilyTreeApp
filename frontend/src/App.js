import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
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
import personService from "./services/people";
import familytableService from "./services/familytables";
import NewPerson from "./components/NewPerson";
import FamilyTables from "./components/FamilyTables";
import FamilyTable from "./components/FamilyTable";
import FamilyTableForm from "./components/FamilyTableForm";

const App = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("loggedFamilyAppUser")) || null;
  });
  // sisäänkirjautumine toteutettava eri tavalla, koska millä tahansa LocalStorage "userilla" pääsee kirjautumaan sisään konsolin kautta, jos tämä jää näin
  // helpottamassa tällä hetkellä sitä, että ei joka kerta kirjaudu ulos, kun päivittää sivun yms. yms.

  const [people, setPeople] = useState([]);
  const [familytables, setFamilytables] = useState([]);

  const navigate = useNavigate("/");

  useEffect(() => {
    const fetchData = async () => {
      const people = await personService.getAll();
      setPeople(people);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const familytables = await familytableService.getAll();
      setFamilytables(familytables);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedFamilyAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, [navigate]);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedFamilyAppUser", JSON.stringify(user));

      setUser(user);
      setUsername("");
      setPassword("");
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

  const addPerson = async (personObject) => {
    const returnedPerson = await personService.create(personObject);
    setPeople(people.concat(returnedPerson));
  };

  const addFamilytable = async (familytableObject) => {
    const returnedFamilyTable = await familytableService.create(
      familytableObject
    );
    setFamilytables(familytables.concat(returnedFamilyTable));
  };

  // muuta paremmaksi window.confirmin sijaan
  const toggleDelete = async (removedPerson) => {
    const result = window.confirm(
      `Delete ${removedPerson.firstNames} ${removedPerson.lastName} ?`
    );

    if (result) {
      await personService.remove(removedPerson._id);
      setPeople(people.filter((person) => person._id !== removedPerson._id));
    }
  };

  // muuta paremmaksi window.confirmin sijaan
  const toggleDeleteFamilyTable = async (removedFamilytable) => {
    const result = window.confirm(`Delete item?`);

    if (result) {
      await familytableService.remove(removedFamilytable._id);
      setFamilytables(
        familytables.filter(
          (familytable) => familytable._id !== removedFamilytable._id
        )
      );
    }
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
            <Route
              path="/people"
              element={<People people={people} toggleDelete={toggleDelete} />}
            />
            <Route
              path="/people/create"
              element={<NewPerson addPerson={addPerson} />}
            />
            <Route path="/people/:id" element={<Person />} />
            <Route
              path="/familytables/*"
              element={
                <FamilyTables
                  familytables={familytables}
                  toggleDeleteFamilyTable={toggleDeleteFamilyTable}
                />
              }
            />
            <Route path="/familytables/:id" element={<FamilyTable />} />
            <Route
              path="/familytables/create"
              element={
                <FamilyTableForm
                  addFamilytable={addFamilytable}
                  people={people}
                />
              }
            />
            <Route path="/familytree" element={<FamilyTree />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
