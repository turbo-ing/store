import React from "react";
import GamePage from "@zknoid/sdk/components/framework/GamePage";
import { game2048Config } from "./config";

const Game2048: React.FC = () => {
  // Styles for the container and iframe
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    padding: '5px'
  };

  const iframeStyle = {
    width: '95%',
    maxWidth: '900px',
    height: '90vh',
    minHeight: '800px',
    border: 'none',
    borderRadius: '6px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
  };

  return (
    <GamePage gameConfig={game2048Config}>
      <div style={containerStyle}>
        <iframe
          src="https://mina.2048.turbo.ing/"
          style={iframeStyle}
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />
      </div>
    </GamePage>
  );
};

export default Game2048; 