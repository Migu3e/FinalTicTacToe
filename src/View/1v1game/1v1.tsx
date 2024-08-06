import  { useEffect, useState } from 'react';
import '../../assets/CSS/1v1game/1v1.css';
import useLocalStorage, { Player } from '../../services/Utilities/useLocalStorage.tsx';
import { handleWin, makeMove } from '../../Controller/1v1game/BaseOneVOneFunctions.tsx';
import TwoActionBar from "../../components/navigation/TwoActionBar.tsx";

function GamePage() {
    const [players, setPlayers] = useLocalStorage('players', []);
    const [board, setBoard] = useState<string[]>(Array(9).fill(''));
    const [currentPlayerSymbol, setCurrentPlayerSymbol] = useState('X');
    const [gameOver, setGameOver] = useState(false);
    const [status, setStatus] = useState("X's turn");
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

    const handleCellClick = (index: number) => {
        makeMove(index, board, setBoard, currentPlayerSymbol, setCurrentPlayerSymbol, gameOver, () => handleWin(currentPlayerSymbol, player1, player2, players, setPlayers, setStatus, setGameOver), setStatus, setGameOver);
    };

    const resetGame = () => {
        setBoard(Array(9).fill(''));
        setCurrentPlayerSymbol('X');
        setGameOver(false);
        setStatus("X's turn");
    };

    return (
        <div className="game-container">
            <TwoActionBar
                players={players}
                player1={player1}
                player2={player2}
                SetPlayer1={setPlayer1}
                SetPlayer2={setPlayer2}
            />
            <h1>Tic-Tac-Toe</h1>
            <div className="grid">
                {board.map((cell, index) => (
                    <button key={index} className="cell" onClick={() => handleCellClick(index)}>{cell}</button>
                ))}
            </div>
            <div id="status">{status}</div>
            <button id="reset" onClick={resetGame}>Reset Game</button>
        </div>
    );
}

export default GamePage;