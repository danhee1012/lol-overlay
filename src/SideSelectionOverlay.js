import React from "react";
import { useParams } from "react-router-dom";
import "./sideSelectionOverlay.css";
import afkLogo from "./assets/team-2-logo-only.png";
import uw3Logo from "./assets/team-3-logo-only.png";

// Default logos mapping
const defaultLogos = {
  afk: afkLogo,
  uw3: uw3Logo,
};

export default function SideSelectionOverlay() {
  const { side, teamName, logo } = useParams();
  const isBlue = side === "blue";
  
  // Determine the logo source: URL parameter, team name mapping, or fallback
  let logoSrc;
  if (logo) {
    // If logo parameter is provided, check if it's a key in defaultLogos or use it as URL
    logoSrc = defaultLogos[logo.toLowerCase()] || logo;
  } else if (teamName) {
    // Try to map team name to a logo
    logoSrc = defaultLogos[teamName.toLowerCase()] || (isBlue ? afkLogo : uw3Logo);
  } else {
    // Fallback to a default logo based on side
    logoSrc = isBlue ? afkLogo : uw3Logo;
  }

  return (
    <div className={`side-selection-overlay ${isBlue ? "blue" : "red"} side-selection-animated`}>
      <div className="side-header">
        <span className="side-selection-title">SIDE SELECTION</span>
      </div>
      <div className="side-content">
        <div className="side-logo-section">
          <img src={logoSrc} alt={`${side} side`} className="side-logo" />
        </div>
        <div className="side-text-section">
          <span className="side-label">{isBlue ? "BLUE SIDE" : "RED SIDE"}</span>
        </div>
      </div>
    </div>
  );
}