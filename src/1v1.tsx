import { useState, useEffect } from 'react';
import './CSS/1v1.css';
import useLocalStorage, { updatePlayerScore, Player } from './useLocalStorage';

type GamePageProps = {
    onLogout: () => void;
    currentPlayer: Player | null;
    onBack: () => void;
};

const winCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
    [0, 4, 8], [2, 4, 6]              // Diagonals
];

function GamePage({ onLogout, currentPlayer, onBack }: GamePageProps) {
    const [players, setPlayers] = useLocalStorage('players', []);
    const [board, setBoard] = useState<string[]>(Array(9).fill(''));
    const [currentPlayerGame, setCurrentPlayerGame] = useState('X');
    const [gameOver, setGameOver] = useState(false);
    const [status, setStatus] = useState("X's turn");

    useEffect(() => {
        updateStatus(`${currentPlayerGame}'s turn`);
    }, [currentPlayerGame]);

    function updateStatus(message: string) {
        setStatus(message);
    }

    function makeMove(index: number) {
        if (!gameOver && board[index] === '') {
            const newBoard = [...board];
            newBoard[index] = currentPlayerGame;
            setBoard(newBoard);
            checkWin(newBoard);
        }
    }

    function switchPlayer() {
        setCurrentPlayerGame(currentPlayerGame === 'X' ? 'O' : 'X');
    }

    function checkWin(currentBoard: string[]) {
        for (const combo of winCombos) {
            if (currentBoard[combo[0]] === currentPlayerGame &&
                currentBoard[combo[1]] === currentPlayerGame &&
                currentBoard[combo[2]] === currentPlayerGame) {
                updateStatus(`${currentPlayerGame} won the game!`);
                if (currentPlayerGame === 'X' && currentPlayer) {
                    const updatedPlayers = updatePlayerScore(players, currentPlayer.name);
                    setPlayers(updatedPlayers);
                    currentPlayer.score = currentPlayer.score + 1;
                }
                setGameOver(true);
                return;
            }
        }

        const isDraw = currentBoard.every(cell => cell !== '');
        if (isDraw) {
            updateStatus("It's a tie!");
            setGameOver(true);
        } else {
            switchPlayer();
        }
    }

    function resetGame() {
        setBoard(Array(9).fill(''));
        setCurrentPlayerGame('X');
        setGameOver(false);
        updateStatus("X's turn");
    }

    return (
        <div className="game-container">
            <div className="action-bar">
                <div className="logout-button-container">
                    <button className="back-button" onClick={onBack}>Back</button>
                </div>
                <div className="player-info">
                    {currentPlayer && (
                        <>
                            <span>Player: {currentPlayer.name}</span>
                            <span>Score: {currentPlayer.score}</span>
                        </>
                    )}
                </div>
                <div className="logout-button-container-1v1">
                    <button className="logout-button" onClick={onLogout}>Logout</button>
                </div>
            </div>
            <h1>Tic-Tac-Toe</h1>
            <div className="grid">
                {board.map((cell, index) => (
                    <button key={index} className="cell" onClick={() => makeMove(index)}>
                        {cell}
                    </button>
                ))}
            </div>
            <div id="status">{status}</div>
            <button id="reset" onClick={resetGame}>Reset Game</button>
        </div>
    );
}

export default GamePage;