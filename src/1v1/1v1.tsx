// src/GamePage1v1.tsx
import { useEffect } from 'react';
import './1v1.css';
import { useName } from "../NameSave.tsx";
import { useNavigationHelpers } from "../UseFunctions.ts";
import useLocalStorage from '../useLocalStorage.tsx';
import {
    useBoardState,
    updateStatus,
    makeMove,
    checkWin,
    resetGame
} from '../JointGameFunc.tsx';

function GamePage() {
    const [players, setPlayers] = useLocalStorage('players', []);
    const { currentPlayer } = useName();
    const { handleLogout, handleBack } = useNavigationHelpers();
    const {
        board, setBoard, currentPlayerGame, setCurrentPlayerGame,
        gameOver, setGameOver, status, setStatus
    } = useBoardState();

    useEffect(() => {
        updateStatus(setStatus, `${currentPlayerGame}'s turn`);
    }, [currentPlayerGame]);

    return (
        <div className="game-container">
            <div className="action-bar">
                <div className="logout-button-container">
                    <button className="back-button" onClick={handleBack}>Back</button>
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
                    <button className="logout-button" onClick={handleLogout}>Logout</button>
                </div>
            </div>
            <h1>Tic-Tac-Toe</h1>
            <div className="grid">
                {board.map((cell, index) => (
                    <button key={index} className="cell" onClick={() => makeMove(index, board, setBoard, currentPlayerGame, gameOver, (newBoard) => checkWin(newBoard, currentPlayerGame, (message) => updateStatus(setStatus, message), setGameOver, setPlayers, players, currentPlayer, setCurrentPlayerGame))}>{cell}</button>
                ))}
            </div>
            <div id="status">{status}</div>
            <button id="reset" onClick={() => resetGame(setBoard, setCurrentPlayerGame, setGameOver, (message) => updateStatus(setStatus, message))}>Reset Game</button>
        </div>
    );
}

export default GamePage;
