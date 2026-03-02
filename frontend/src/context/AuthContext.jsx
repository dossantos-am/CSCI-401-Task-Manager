import { createContext, useState } from "react";
import { dummyUsers } from "../assets/dummyUsers";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    
    const foundUser = dummyUsers.find(
      (u) => u.emailAddress === email && u.hashedPassword === password
    );

    if (foundUser) {
      setUser(foundUser);
      return true; // login success
    } else {
      return false; // login failed
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
