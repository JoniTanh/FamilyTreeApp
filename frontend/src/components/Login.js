import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import loginService from "../services/login";
import LoginForm from "./LoginForm";

const Login = () => {
  const [message, setMessage] = useState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("token");

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      if (user.token) {
        setUser(user);
      } else {
        window.localStorage.removeItem("token");
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const { token, ...userData } = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem(
        "token",
        JSON.stringify({ token, ...userData })
      );
      setUser({ token, ...userData });
      setUsername("");
      setPassword("");
      navigate("/");
    } catch (error) {
      setMessage({
        text: "Käyttäjätunnus tai salasana väärin",
      });
      setTimeout(() => setMessage(undefined), 5000);
    }
  };

  return (
    <LoginForm
      message={message}
      handleLogin={handleLogin}
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
    />
  );
};

export default Login;
