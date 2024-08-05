import React, { useEffect, useState } from 'react';
import './Menu/Menu.css';
import { useName } from './NameSave';
import { useNavigationHelpers } from "./UseFunctions";
import useLocalStorage, { Player } from "./useLocalStorage";

const ActionBar: React.FC = () => {
    const { currentPlayer, setCurrentPlayer } = useName();
    const { handleLogout, handleBack } = useNavigationHelpers();
    const [players] = useLocalStorage('players', []);
    const [player, setPlayer] = useState<Player | null>(null);

    useEffect(() => {
        const updatePlayer = () => {
            if (currentPlayer) {
                const updatedPlayer = players.find(p => p.name === currentPlayer.name);
                if (updatedPlayer) {
                    setPlayer(updatedPlayer);
                    setCurrentPlayer(updatedPlayer);
                }
            }
        };

        updatePlayer();

        window.addEventListener('storage', updatePlayer);

    }, [players, currentPlayer, setCurrentPlayer]);

    if (!currentPlayer) {
        handleLogout();
        return null;
    }

    return (
        <div className="action-bar">
            <div className="logout-button-container">
                <button className="back-button" onClick={handleBack}>Back</button>
            </div>
            <div className="player-info">
                <span>Player: {player?.name || currentPlayer.name}</span>
                <span>Score: {player?.score || currentPlayer.score}</span>
            </div>
            <div className="logout-button-container">
                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
}

export default ActionBar;