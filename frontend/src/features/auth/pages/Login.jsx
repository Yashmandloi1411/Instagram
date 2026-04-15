import React from "react";

import { useState } from "react";
import axios from "axios";
import "../style/form.scss";

import useAuth from "../hooks/useAuth";
import { Navigate, useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  //const [username, setUsername] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [password, setUserPassword] = useState("");

  // hooks se 3 chija nikal lo
  const { handleLogin, user, loading } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin(identifier, password);

    navigate("/feed");
  };

  return (
    <main>
      <div className="form-container">
        {/* <h1>Login </h1> */}
        <h1>Instagram</h1>
        <form onSubmit={handleSubmit} action="">
          <input
            onChange={(e) => setIdentifier(e.target.value)}
            //onChange={(e) => setUsername(e.target.value)}
            type="text"
            name="username"
            placeholder="Enter user name,email"
          />
          <input
            onChange={(e) => setUserPassword(e.target.value)}
            type="password"
            name="password"
            placeholder="password"
          />

          <button type="submit">Submit</button>
        </form>
      </div>
    </main>
  );
}

export default Login;
