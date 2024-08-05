import React, {useEffect} from 'react';
import '../../Menu/Menu.css';
import { useName } from '../../NameSave';
import { useNavigationHelpers } from "../../UseFunctions";
import { Player } from '../../useLocalStorage';

interface TwoActionBarProps {
    players: Player[];
    player1: Player | null;
    player2: Player | null;
    SetPlayer1: (p: Player | null) => void;
    SetPlayer2: (p: Player | null) => void;
}

const TwoActionBar: React.FC<TwoActionBarProps> = ({ players, player1, player2, SetPlayer1 , SetPlayer2 }) => {
    const { currentPlayer } = useName();
    const { handleLogout, handleBack } = useNavigationHelpers();

    useEffect(() => {
        const savedPlayers = localStorage.getItem('1v1Players');
        if (savedPlayers) {
            const { player1: p1Name, player2: p2Name } = JSON.parse(savedPlayers);
            SetPlayer1(players.find(p => p.name === p1Name) || null);
            SetPlayer2(players.find(p => p.name === p2Name) || null);
        }
    }, [players]);

    if (!currentPlayer) {
        handleLogout();
        return null;
    }

    return (
        <div className="action-bar">
            <button className="back-button" onClick={handleBack}>Back</button>
            <div className="player-info">
                {player1 && <span>{player1.name} (X) - Score: {player1.score}</span>}
                {player2 && <span>{player2.name} (O) - Score: {player2.score}</span>}
            </div>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default TwoActionBar;