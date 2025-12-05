import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

// Layout
import InterviewExplorer from "./pages/InterviewExplorer";

// Page Components
import ReactView from "./pages/ReactView";
import DSAView from "./pages/DSAView";
import DesignView from "./pages/DesignView";
import DsaPatterns from "./components/DsaPatterns";
import DsaMastery from "./components/DsaMastery.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Layout Route */}
        <Route path="/" element={<DsaMastery />}>
          {/* 3. Mastery Routes (Algorithms/MSQ via Sidebar) */}
          {/* Handles algorithms, msq/5, etc. */}
          <Route
            path="/:modeParam?/:idParam?/:subIdParam?"
            element={<DsaMastery />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
