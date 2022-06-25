import React, { useState, createContext } from "react";

export const SettingsContext = createContext({});

export const SettingsContextProvider = ({ children }) => {
  // States
  const [accentColor, setAccentColor] = useState("orange");

  return (
    <SettingsContext.Provider value={{ accentColor, setAccentColor }}>
      {children}
    </SettingsContext.Provider>
  );
};
