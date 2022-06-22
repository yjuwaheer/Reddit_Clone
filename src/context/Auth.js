import React, { useState, createContext } from "react";

export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  // States
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
