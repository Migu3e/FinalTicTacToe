import { useEffect } from 'react';
import './1vPC.css';
import ActionBar from '../NavActBar';
import { useName } from "../NameSave";
import useLocalStorage from '../useLocalStorage';
import { useBoardState, updateStatus, makeMove, checkWin, resetGame } from './BaseFunction';
import { getBestMove } from './minmaxlogic';

function GamePage() {
    const [players, setPlayers] = useLocalStorage('players', []);
    const { currentPlayer } = useName();
    const {
        board, setBoard, currentPlayerGame, setCurrentPlayerGame,
        gameOver, setGameOver, status, setStatus
    } = useBoardState();

    useEffect(() => {
        if (currentPlayerGame === 'O' && !gameOver) {
            const pcMove = getBestMove(board);
            makeMove(pcMove, board, setBoard, currentPlayerGame, gameOver, (newBoard) => checkWin(newBoard, currentPlayerGame, (message) => updateStatus(setStatus, message), setGameOver, setPlayers, players, currentPlayer, setCurrentPlayerGame));
        }
    }, [currentPlayerGame, gameOver]);

    const handleCellClick = (index: number) => {
        makeMove(index, board, setBoard, currentPlayerGame, gameOver, (newBoard) =>
            checkWin(newBoard, currentPlayerGame, (message) => updateStatus(setStatus, message), setGameOver, setPlayers, players, currentPlayer, setCurrentPlayerGame)
        );
    };

    const handleResetGame = () => {
        resetGame(setBoard, setCurrentPlayerGame, setGameOver, (message) => updateStatus(setStatus, message));
    };

    return (
        <div className="game-container">
            <ActionBar />
            <h1>Tic-Tac-Toe</h1>
            <div className="grid">
                {board.map((cell, index) => (
                    <button key={index} className="cell" onClick={() => handleCellClick(index)}>
                        {cell}
                    </button>
                ))}
            </div>
            <div id="status">{status}</div>
            <button id="reset" onClick={handleResetGame}>Reset Game</button>
        </div>
    );
}
export default GamePage;