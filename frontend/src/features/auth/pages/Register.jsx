import React, { useState } from "react";

import { Link } from "react-router-dom";

import axios from "axios";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [password, setUserPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      "http://localhost:3000/api/auth/register",
      {
        username,
        password,
        email,
      },
      { withCredentials: true },
    );

    console.log("res of register", res);
  };
  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <input
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            type="text"
            placeholder="email"
          />
          <input
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            name="username"
            placeholder="username"
          />
          <input
            onChange={(e) => setUserPassword(e.target.value)}
            type="text"
            name="password"
            placeholder="password"
          />
          <button type="submit">Register</button>
        </form>

        <p>
          Already have Account ?{" "}
          <Link className="toggleAuthForm" to="/login">
            Login
          </Link>{" "}
        </p>
      </div>
    </main>
  );
}

export default Register;
