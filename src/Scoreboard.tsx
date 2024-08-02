import React from 'react';
import useLocalStorage from './useLocalStorage';
import './CSS/Scoreboard.css';

// Define the Player interface
interface Player {
    name: string;
    score: number;
}

// Define props interface for Scoreboard component
interface ScoreboardProps {
    onBack: () => void;
}

// Function to sort players by score
const sortPlayersByScore = (a: Player, b: Player): number => {
    return b.score - a.score;
};

// Function to create table rows
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

    // Sort players by score
    const sortedPlayers = [...players].sort(sortPlayersByScore);

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

export default Scoreboard;