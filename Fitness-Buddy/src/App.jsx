import React from "react";
import { Route, Routes } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import LoginPage from "./pages/LoginPage";
import LogWorkoutPage from "./pages/LogWorkoutPage";
import SearchPage from "./pages/SearchPage";
import ProgressPage from "./pages/ProgressPage";
import ProfilePage from "./pages/ProfilePage"; // Importing ProfilePage

function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/LoginPage" element={<LoginPage />}/>
      <Route path="/LogWorkoutPage" element={<LogWorkoutPage />} />
      <Route path="/SearchPage" element={<SearchPage />} />
      <Route path="/ProgressPage" element={<ProgressPage />} /> 
      <Route path="/ProfilePage" element={<ProfilePage />} />
    </Routes>
  );
}

export default App;