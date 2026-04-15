import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import useAuth from "../hooks/useAuth";
function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [password, setUserPassword] = useState("");

  const { handleRegister, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleRegister(username, email, password);
    navigate("/feed");
  };
  if (loading) {
    return <h1>loading....</h1>;
  }
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
