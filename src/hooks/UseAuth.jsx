import React, { useContext, useState, createContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isNewUser, setIsNewUser] = useState(false);

  const signin = (newUser) => {
    setUser(newUser);
    setIsNewUser(true);
  };

  const login = (existingUser) => {
    setUser(existingUser);
    setIsNewUser(false);
  };

  const logout = () => {
    setUser(null);
    setIsNewUser(false);
  };

  return (
    <AuthContext.Provider value={{ user, isNewUser, signin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
