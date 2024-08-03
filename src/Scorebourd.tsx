import React from 'react';
import useLocalStorage from './useLocalStorage';
import './CSS/Scoreboard.css';

interface Player {
    name: string;
    score: number;
}

interface ScoreboardProps {
    onBack: () => void;
}

const bubbleSortPlayersByScore = (players: Player[]): Player[] => {
    const sortedPlayers:Player[] = [...players];
    let n = sortedPlayers.length;
    let swapped;

    do {
        swapped = false;
        for (let i = 1; i < n; i++) {
            if (sortedPlayers[i - 1].score < sortedPlayers[i].score) {
                // Swap players
                const temp = sortedPlayers[i - 1];
                sortedPlayers[i - 1] = sortedPlayers[i];
                sortedPlayers[i] = temp;
                swapped = true;
            }
        }
        n--;
    } while (swapped);

    return sortedPlayers;
};

const createPlayerRow = (player: Player): JSX.Element => {
    return (
        <tr key={player.name}>
            <td>{player.name}</td>
            <td>{player.score}</td>
        </tr>
    );
};

const Scoreboard: React.FC<ScoreboardProps> = ({ onBack }) => {
    const [players] = useLocalStorage('players', []) as [Player[], (players: Player[]) => void];

    const sortedPlayers = bubbleSortPlayersByScore(players);

    return (
        <div className="scoreboard-container">
            <h1>Scoreboard</h1>
            <table>
                <thead>
                <tr>
                    <th>Player</th>
                    <th>Score</th>
                </tr>
                </thead>
                <tbody>
                {sortedPlayers.map(createPlayerRow)}

                </tbody>
            </table>
            <button onClick={onBack}>Back</button>
        </div>
    );
};

/*
map היא פונקציה מובנית בג'אווהזקיפ]ט שמופעלת על מערכים.
הפונקציה map לוקחת כל אלמנט במערך ומפעילה עליו פונקציה מסוימת, ומחזירה מערך חדש עם התוצאות.
createPlayerRow:
זוהי הפונקציה שמועברת לפונקציית map.
הפונקציה createPlayerRow מקבלת אובייקט של שחקן ויוצרת ממנו שורת טבל
*/

export default Scoreboard;
