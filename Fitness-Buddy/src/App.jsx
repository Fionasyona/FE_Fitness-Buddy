import React from "react";
import { Route, Routes } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import LoginPage from "./pages/LoginPage";
import LogWorkoutPage from "./pages/LogWorkoutPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/LoginPage" element={<LoginPage />}/>
      <Route path="/LogWorkoutPage" element={<LogWorkoutPage />}/>
    </Routes>
  );
}

export default App;