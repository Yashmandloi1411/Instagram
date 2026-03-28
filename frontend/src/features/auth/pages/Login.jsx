import React from "react";

import "../style/form.scss";
function Login() {
  return (
    <main>
      <div className="form-container">
        <h1>Login </h1>
        <form action="">
          <input type="text" name="username" placeholder="Enter user name" />
          <input type="password" name="password" placeholder="password" />

          <button type="submit">Submit</button>
        </form>
      </div>
    </main>
  );
}

export default Login;
