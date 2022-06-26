import React, { useEffect, useState, createContext } from "react";

export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  // States
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const localUser = localStorage.getItem("localUser");
    // console.log(localUser);

    if (localUser === null) {
      setUser({});
      localStorage.setItem("localUser", "{}");
    } else {
      const parseData = JSON.parse(localUser);

      // Return if empty object
      if (Object.keys(parseData).length === 0) {
        return;
      }

      const tokenExpirationTime = parseData.stsTokenManager.expirationTime;

      // Clear user data if token expired (requires user to log in)
      if (Date.now() > tokenExpirationTime) {
        localStorage.removeItem("localUser");
      } else {
        setUser(parseData);
        setIsLoggedIn(true);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
