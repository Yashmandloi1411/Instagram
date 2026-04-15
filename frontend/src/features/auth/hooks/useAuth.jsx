import { AuthContext } from "../auth.context";
import { useContext } from "react";

// custom hook
// useContext hook me AuthContext  likha ha isa mtlb ya ha ki
// mera AuthContext me jo value ha vo nikallo jesagi 4 value
//handleLogin, handleRegister, user, loading
function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export default useAuth;
