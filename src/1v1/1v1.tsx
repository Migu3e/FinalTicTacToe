import { useEffect, useState } from 'react';
import './1v1.css';
import { useName } from "../NameSave";
import { useNavigationHelpers } from "../UseFunctions";
import useLocalStorage, { Player, updatePlayerScore } from '../useLocalStorage';

const winCombos: number[][] = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
    [0, 4, 8], [2, 4, 6]              // Diagonals
];

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
            const p1 = players.find(p => p.name === p1Name);
            const p2 = players.find(p => p.name === p2Name);
            if (p1 && p2) {
                setPlayer1(p1);
                setPlayer2(p2);
            }
        }
    }, [players]);

    useEffect(() => {
        setStatus(`${currentPlayerSymbol}'s turn`);
    }, [currentPlayerSymbol]);

    const handleWin = (winner: string) => {
        const winnerName = winner === 'X' ? player1?.name : player2?.name;
        setStatus(`${winnerName} (${winner}) wins!`);
        setGameOver(true);

        if (winnerName) {
            const updatedPlayers = updatePlayerScore(players, winnerName);
            setPlayers(updatedPlayers);

            if (currentPlayer && currentPlayer.name === winnerName) {
                setCurrentPlayer({...currentPlayer, score: currentPlayer.score + 1});
            }
        }
    };

    const checkWin = (currentBoard: string[], symbol: string) => {
        for (const combo of winCombos) {
            if (combo.every(index => currentBoard[index] === symbol)) {
                handleWin(symbol);
                return true;
            }
        }
        return false;
    };

    const checkDraw = (currentBoard: string[]) => {
        if (currentBoard.every(cell => cell !== '')) {
            setStatus("It's a draw!");
            setGameOver(true);
            return true;
        }
        return false;
    };

    const makeMove = (index: number) => {
        if (!gameOver && board[index] === '') {
            const newBoard = [...board];
            newBoard[index] = currentPlayerSymbol;
            setBoard(newBoard);

            if (!checkWin(newBoard, currentPlayerSymbol) && !checkDraw(newBoard)) {
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
                <div className="logout-button-container">
                    <button className="back-button" onClick={handleBack}>Back</button>
                </div>
                <div className="player-info">
                    {player1 && <span>{player1.name} (X) - Score: {player1.score}</span>}
                    {player2 && <span>{player2.name} (O) - Score: {player2.score}</span>}
                </div>
                <div className="logout-button-container-1v1">
                    <button className="logout-button" onClick={handleLogout}>Logout</button>
                </div>
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