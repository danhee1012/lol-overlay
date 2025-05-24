import React from "react";
import predictions from "./assets/predictions.json";
import "./overlay.css";
import afkLogo from "./assets/team-2-logo-only.png";
import uw3Logo from "./assets/team-3-logo-only.png";

const teamLogo = {
  afk: afkLogo,
  uw3: uw3Logo,
};

const teamClass = {
  afk: "afk-win",
  uw3: "uw3-win",
};

export default function PredictionsOverlay() {
  return (
    <div className="overlay-bar">
      <div className="score-prediction-label-box">Predictions</div>
      {predictions.map((pred, idx) => (
        <div 
          className={`prediction ${teamClass[pred.winner]} prediction-animated`} 
          key={idx}
          style={{
            animationDelay: `${idx * 0.15}s`
          }}
        >
          <span className="player">{pred.player}</span>
          <span className="score">{pred.score}</span>
          <img
            src={teamLogo[pred.winner]}
            alt={pred.winner.toUpperCase()}
            className="predicted-logo"
          />
        </div>
      ))}
    </div>
  );
} 