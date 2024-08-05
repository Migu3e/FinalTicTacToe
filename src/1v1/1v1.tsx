import { useEffect, useState } from 'react';
import './1v1.css';
import { useName } from "../NameSave";
import { useNavigationHelpers } from "../UseFunctions";
import useLocalStorage, { Player } from '../useLocalStorage';
import { checkWin, checkDraw, updatePlayerScore } from './BaseOneVOneFunctions';

function GamePage() {
    const [players, setPlayers] = useLocalStorage('players', []);
    const { currentPlayer, setCurrentPlayer } = useName();
    const { handleLogout, handleBack } = useNavigationHelpers();

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

    const handleWin = (winner: string) => {
        const winnerName = winner === 'X' ? player1?.name : player2?.name;
        setStatus(`${winnerName} (${winner}) wins!`);
        setGameOver(true);
        if (winnerName) {
            setPlayers(updatePlayerScore(players, winnerName));
            if (currentPlayer && currentPlayer.name === winnerName) {
                setCurrentPlayer({...currentPlayer, score: currentPlayer.score + 1});
            }
        }
    };

    const makeMove = (index: number) => {
        if (!gameOver && board[index] === '') {
            const newBoard = [...board];
            newBoard[index] = currentPlayerSymbol;
            setBoard(newBoard);
            if (checkWin(newBoard, currentPlayerSymbol)) {
                handleWin(currentPlayerSymbol);
            } else if (checkDraw(newBoard)) {
                setStatus("It's a draw!");
                setGameOver(true);
            } else {
                setCurrentPlayerSymbol(currentPlayerSymbol === 'X' ? 'O' : 'X');
            }
        }
    };

    const resetGame = () => {
        setBoard(Array(9).fill(''));
        setCurrentPlayerSymbol('X');
        setGameOver(false);
        setStatus("X's turn");
    };

    return (
        <div className="game-container">
            <div className="action-bar">
                <button className="back-button" onClick={handleBack}>Back</button>
                <div className="player-info">
                    {player1 && <span>{player1.name} (X) - Score: {player1.score}</span>}
                    {player2 && <span>{player2.name} (O) - Score: {player2.score}</span>}
                </div>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>
            <h1>Tic-Tac-Toe</h1>
            <div className="grid">
                {board.map((cell, index) => (
                    <button key={index} className="cell" onClick={() => makeMove(index)}>{cell}</button>
                ))}
            </div>
            <div id="status">{status}</div>
            <button id="reset" onClick={resetGame}>Reset Game</button>
        </div>
    );
}

export default GamePage;