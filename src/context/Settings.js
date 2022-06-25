import React, { useEffect, useState, createContext } from "react";

export const SettingsContext = createContext({});

export const SettingsContextProvider = ({ children }) => {
  // States
  const [accentColor, setAccentColor] = useState("");

  useEffect(() => {
    const storedAccentColor = localStorage.getItem("accentColor");

    if (storedAccentColor === null) {
      setAccentColor("orange");
      localStorage.setItem("accentColor", "orange");
    } else {
      setAccentColor(storedAccentColor);
    }
  }, []);

  return (
    <SettingsContext.Provider value={{ accentColor, setAccentColor }}>
      {children}
    </SettingsContext.Provider>
  );
};
