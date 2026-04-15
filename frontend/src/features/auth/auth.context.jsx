import { createContext, useState } from "react";

import { register, login } from "./services/auth.service";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (identifier, password) => {
    setLoading(true);
    try {
      const response = await login(identifier, password);
      setUser(response);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (username, email, password) => {
    setLoading(true);
    try {
      const response = await register(username, email, password);
      setUser(response);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  // is context ko menea 4 chija deya ha handlelogin,register,user,loading
  return (
    <AuthContext.Provider
      value={{ handleLogin, handleRegister, user, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
