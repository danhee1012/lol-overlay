import React from 'react';
import { useParams } from 'react-router-dom';
import html2canvas from 'html2canvas';
import styles from './TeamLineupOverlay.module.css';

// Import lane icons
import topIcon from './assets/lane-logos/top.png';
import jungleIcon from './assets/lane-logos/jungle.png';
import middleIcon from './assets/lane-logos/middle.png';
import bottomIcon from './assets/lane-logos/bottom.png';
import supportIcon from './assets/lane-logos/support.png';

// Import team logos
import team2Logo from './assets/team-2-logo-only.png';
import team3Logo from './assets/team-3-logo-only.png';

// Import team 2 player images
import team2Top from './assets/team-2-players/top.jpg';
import team2Jungle from './assets/team-2-players/jg.jpg';
import team2Mid from './assets/team-2-players/mid.jpg';
import team2Adc from './assets/team-2-players/adc.jpg';
import team2Support from './assets/team-2-players/supp.jpg';

// Import team 3 player images
import team3Top from './assets/team-3-players/top.jpg';
import team3Jungle from './assets/team-3-players/jg.jpg';
import team3Mid from './assets/team-3-players/mid.jpg';
import team3Adc from './assets/team-3-players/adc.jpg';
import team3Support from './assets/team-3-players/supp.jpg';

const roleIcons = {
  TOP: topIcon,
  JNG: jungleIcon,
  MID: middleIcon,
  ADC: bottomIcon,
  SUP: supportIcon,
};

const TeamLineupOverlay = () => {
  const { team } = useParams();
  
  // Export overlay as PNG function
  const exportOverlay = async () => {
    const element = document.getElementById('overlay-container');
    if (element) {
      try {
        console.log('Starting export...');
        
        // Wait for images to load
        const images = element.querySelectorAll('img');
        await Promise.all(Array.from(images).map(img => {
          if (img.complete) return Promise.resolve();
          return new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
          });
        }));
        
        console.log('Images loaded, capturing...');
        
        const canvas = await html2canvas(element, {
          width: 1920,
          height: 1200,
          backgroundColor: null,
          scale: 1,
          useCORS: false, // Changed to false to avoid CORS issues
          allowTaint: true,
          scrollX: 0,
          scrollY: 0,
          windowWidth: 1920,
          windowHeight: 1200,
          logging: true, // Enable logging for debugging
          onclone: (clonedDoc) => {
            console.log('Document cloned');
          }
        });
        
        console.log('Canvas created, downloading...');
        
        // Create download link
        const link = document.createElement('a');
        link.download = `team-lineup-${team || 'overlay'}.png`;
        link.href = canvas.toDataURL('image/png');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        console.log('Export completed!');
      } catch (error) {
        console.error('Error exporting overlay:', error);
        alert('Export failed. Check console for details.');
      }
    } else {
      console.error('Overlay container not found');
      alert('Overlay container not found');
    }
  };
  
  // Data for both teams - please update player names as needed
  const teamsData = {
    // Team 2 (afk) - only participated in Round 1 and 2, then went to finals
    afk: {
      teamName: "AFK",
      logo: team2Logo,
      players: [
        {
          name: "CDKEY", // Replace with actual top player name
          role: "TOP",
          image: team2Top
        },
        {
          name: "Happy Borry", // Replace with actual jungle player name
          role: "JNG",
          image: team2Jungle
        },
        {
          name: "tankboi", // Replace with actual mid player name
          role: "MID", 
          image: team2Mid
        },
        {
          name: "shy929", // Replace with actual adc player name
          role: "ADC",
          image: team2Adc
        },
        {
          name: "KR Snitch", // Replace with actual support player name
          role: "SUP",
          image: team2Support
        }
      ],
      matchHistory: [
        { stage: "ROUND 1", round: "", opponent: "JNI", result: "W", score: "2:0" },
        { stage: "ROUND 2", round: "", opponent: "UW3", result: "W", score: "2:1" },
      ]
    },
    // Team 3 (uw3) - participated in all rounds
    uw3: {
      teamName: "UW3",
      logo: team3Logo,
      players: [
        {
          name: "Pæssion of Rice", // Replace with actual top player name
          role: "TOP",
          image: team3Top
        },
        {
          name: "Shaco most", // Replace with actual jungle player name
          role: "JNG",
          image: team3Jungle
        },
        {
          name: "Surl", // Replace with actual mid player name
          role: "MID", 
          image: team3Mid
        },
        {
          name: "sbs", // Replace with actual adc player name
          role: "ADC",
          image: team3Adc
        },
        {
          name: "NeverEndingSARS", // Replace with actual support player name
          role: "SUP",
          image: team3Support
        }
      ],
      matchHistory: [
        { stage: "ROUND 1", round: "", opponent: "OB", result: "W", score: "2:0" },
        { stage: "ROUND 2", round: "", opponent: "AFK", result: "L", score: "1:2" },
        { stage: "ROUND 3", round: "", opponent: "JNI", result: "W", score: "2:1" },
      ]
    }
  };

  // Get team data based on parameter, default to afk if no param or invalid param
  const teamData = teamsData[team] || teamsData.afk;

  return (
    <div>
      {/* Export button - positioned outside overlay */}
      <button 
        onClick={exportOverlay}
        style={{
          position: 'fixed',
          top: '10px',
          right: '10px',
          zIndex: 9999,
          padding: '10px 20px',
          backgroundColor: '#d4af37',
          color: '#000',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        Export PNG
      </button>
      
      <div id="overlay-container" className={styles.overlay}>
        <div className={styles.background}>
          {/* Header section */}
          <div className={styles.header}>
            <div className={styles.championship}>
              <div className={styles.championshipText}>{teamData.championship}</div>
              <div className={styles.locationText}>{teamData.location}</div>
              <div className={styles.stageText}>{teamData.stage}</div>
            </div>
            
            <div className={styles.teamInfo}>
              <div className={styles.teamLogo}>
                <img src={teamData.logo} alt={teamData.teamName} />
              </div>
              {/* <div className={styles.teamName}>{teamData.teamName}</div> */}
              {/* <div className={styles.teamRegion}>{teamData.region}</div> */}
            </div>
            <div className={styles.leagueLogo}>
            </div>
          </div>

          {/* Players container */}
          <div className={styles.playersContainer}>
            {/* Player lineup section with position icons */}
            <div className={styles.players}>
              {teamData.players.map((player, index) => (
                <div key={index} className={styles.playerCard}>
                  <div className={styles.playerRoleIcon}>
                    <img src={roleIcons[player.role]} alt={player.role} />
                  </div>
                  <div className={styles.playerName}>{player.name}</div>
                  <div className={styles.playerImage}>
                    <div 
                      style={{
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url(${player.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                      }}
                      className={styles.playerImageBg}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tournament progression section */}
          <div className={styles.tournament}>
            {teamData.matchHistory.map((match, index) => (
              <div key={index} className={styles.matchInfo}>
                <div className={styles.stageName}>{match.stage}</div>
                <div className={styles.matchDetails}>
                  {match.round && <span className={styles.round}>{match.round}</span>}
                  <span className={styles.vsText}>vs {match.opponent}</span>
                  {match.score && <span className={styles.score}>{match.score}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamLineupOverlay; 