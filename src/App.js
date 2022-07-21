import React, { useContext } from "react";
import "./App.css";
// Router
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Context
import { AuthContext } from "./context/Auth";
import { SettingsContext } from "./context/Settings";
// Pages
import Home from "./page/Home";
import Post from "./page/Post";
import Profile from "./page/Profile";
import Settings from "./page/Settings";
import NotFound from "./page/NotFound";
// Components
import Navbar from "./component/Navbar";
// Import `ChakraProvider` component
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
// Import fonts
import { Fonts } from "./shared/Fonts";

function App() {
  // Hooks
  const { isLoggedIn } = useContext(AuthContext);
  const { font } = useContext(SettingsContext);

  const theme = extendTheme({
    fonts: {
      body: font,
    },
  });

  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="post/:postId" element={<Post />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ChakraProvider>
  );
}

export default App;
