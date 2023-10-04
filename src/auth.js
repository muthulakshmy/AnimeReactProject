import { createContext, useState } from "react";
import { useContext } from "react";
const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const [logName, setlogName] = useState(null);

  const login = (logName) => {
    setlogName(logName);
  };
  const [open, setOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const logout = () => {
    setlogName(null);
  };
  //  const [form, setForm] = useState({
  //   username: "",
  //   password: "",
  //   email: "",
  // });
  const[error, setError] = useState({
    username:false,
   email: false,
   password: false
  })

  return (
    <AuthContext.Provider value={{ logName,error,setError,open,setOpen,loggedIn,setLoggedIn,login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  return useContext(AuthContext);
};
