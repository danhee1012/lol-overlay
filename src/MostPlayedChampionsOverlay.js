import React from "react";
import { useParams } from "react-router-dom";
import championsData from "./assets/mostPlayedChampions.json";
import "./mostPlayedChampions.css";

export default function MostPlayedChampionsOverlay() {
  const { position } = useParams();
  
  // Get champions for the specified position, default to mid if not found
  const champions = championsData[position?.toLowerCase()] || championsData.mid;
  
  // Capitalize position name for display
  const positionDisplay = position 
    ? position.charAt(0).toUpperCase() + position.slice(1).toLowerCase()
    : "Mid";

  return (
    <div className="most-played-overlay">
      <div className="most-played-label-box">Most Played - {positionDisplay}</div>
      {champions.map((champion, idx) => (
        <div 
          className="champion-card champion-card-animated" 
          key={idx}
          style={{
            backgroundImage: `url(${champion.championImage})`,
            animationDelay: `${idx * 0.15}s`
          }}
        >
          <div className="champion-content">
            <span className="champion-name">{champion.championName}</span>
            <div className="champion-stats">
              <div className="win-loss">
                <span className="wins">{champion.wins}W</span> - <span className="losses">{champion.losses}L</span>
              </div>
              <span className="win-rate">{champion.winRate}%</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 