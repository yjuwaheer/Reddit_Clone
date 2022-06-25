import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// Import `ChakraProvider` component
import { ChakraProvider } from "@chakra-ui/react";

// Context
import { AuthContextProvider } from "./context/Auth";
import { FirestoreDBContextProvider } from "./context/FirestoreDB";
import { SettingsContextProvider } from "./context/Settings";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChakraProvider>
    <FirestoreDBContextProvider>
      <AuthContextProvider>
        <SettingsContextProvider>
          <App />
        </SettingsContextProvider>
      </AuthContextProvider>
    </FirestoreDBContextProvider>
  </ChakraProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
