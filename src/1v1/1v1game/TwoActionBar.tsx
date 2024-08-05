import '../../Menu/Menu.css';
import { useName } from '../../NameSave.tsx';
import {useNavigationHelpers} from "../../UseFunctions.ts";
import useLocalStorage, {Player} from "../../useLocalStorage.tsx";
import {useEffect, useState} from "react";

function TwoActionBar() {
    const { currentPlayer } = useName();
    const { handleLogout, handleBack} = useNavigationHelpers();

    const [players] = useLocalStorage('players', []);

    const [player1, setPlayer1] = useState<Player | null>(null);
    const [player2, setPlayer2] = useState<Player | null>(null);

    useEffect(() => {
        const savedPlayers = localStorage.getItem('1v1Players');
        if (savedPlayers) {
            const { player1: p1Name, player2: p2Name } = JSON.parse(savedPlayers);
            setPlayer1(players.find(p => p.name === p1Name) || null);
            setPlayer2(players.find(p => p.name === p2Name) || null);
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