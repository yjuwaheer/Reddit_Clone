import React, { useContext } from "react";
import "./App.css";
// Router
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Context
import { AuthContext } from "./context/Auth";
// Pages
import Home from "./page/Home";
import Profile from "./page/Profile";
// Components
import Navbar from "./component/Navbar";

function App() {
  // Hooks
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
