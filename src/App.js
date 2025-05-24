import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PredictionsOverlay from "./PredictionsOverlay";
import SideSelectionOverlay from "./SideSelectionOverlay";
import TeamLineupOverlay from "./TeamLineupOverlay";
import MostPlayedChampionsOverlay from "./MostPlayedChampionsOverlay";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/predictions" element={<PredictionsOverlay />} />
        <Route path="/most-played" element={<MostPlayedChampionsOverlay />} />
        <Route path="/most-played/:position" element={<MostPlayedChampionsOverlay />} />
        <Route path="/team-lineup" element={<TeamLineupOverlay />} />
        <Route path="/team-lineup/:team" element={<TeamLineupOverlay />} />
        <Route
          path="/side/:side"
          element={<SideSelectionOverlay />}
        />
        <Route
          path="/side/:side/:teamName"
          element={<SideSelectionOverlay />}
        />
        <Route
          path="/side/:side/:teamName/:logo"
          element={<SideSelectionOverlay />}
        />
      </Routes>
    </Router>
  );
}

export default App;