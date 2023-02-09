import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  useNavigate,
} from "react-router-dom";

import Families from "./components/Families";
import FamilyMembers from "./components/FamilyMembers";
import FamilyTree from "./components/FamilyTree";
import LoginForm from "./components/LoginForm";
import Home from "./components/Home";
import NavBar from "./components/NavigationBar";

import loginService from "./services/login";
import personService from "./services/people";

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

  const navigate = useNavigate("/");

  useEffect(() => {
    personService.getAll().then((people) => setPeople(people));
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

  const addPerson = (personObject) => {
    personService.create(personObject).then((returnedPerson) => {
      setPeople(people.concat(returnedPerson));
    });
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
            <Route path="/familymembers" element={<FamilyMembers />} />
            <Route path="/familytree" element={<FamilyTree />} />
            <Route path="/" element={<Home addPerson={addPerson} />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
