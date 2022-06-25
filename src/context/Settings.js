import React, { useEffect, useState, createContext } from "react";

export const SettingsContext = createContext({});

export const SettingsContextProvider = ({ children }) => {
  // States
  const [accentColor, setAccentColor] = useState("");
  const [font, setFont] = useState("");

  useEffect(() => {
    const storedAccentColor = localStorage.getItem("accentColor");

    if (storedAccentColor === null) {
      setAccentColor("orange");
      localStorage.setItem("accentColor", "orange");
    } else {
      setAccentColor(storedAccentColor);
    }

    const storedFont = localStorage.getItem("fontStyle");

    if (storedAccentColor === null) {
      setFont("");
      localStorage.setItem("fontStyle", "");
    } else {
      setFont(storedFont);
    }
  }, []);

  return (
    <SettingsContext.Provider
      value={{ accentColor, setAccentColor, font, setFont }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
