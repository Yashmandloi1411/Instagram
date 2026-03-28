import React from "react";

import { useState } from "react";
import axios from "axios";
import "../style/form.scss";
function Login() {
  //const [username, setUsername] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [password, setUserPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          identifier,
          password,
        },
        { withCredentials: true },
      );

      console.log("user response at login", response);
    } catch (error) {
      console.log("error while login", error);
    }
  };

  return (
    <main>
      <div className="form-container">
        <h1>Login </h1>
        <form onSubmit={handleSubmit} action="">
          <input
            onChange={(e) => setIdentifier(e.target.value)}
            //onChange={(e) => setUsername(e.target.value)}
            type="text"
            name="username"
            placeholder="Enter user name"
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
