// src/GamePage1vPC.tsx
import {useEffect} from 'react';
import './1vPC.css';
import {useName} from "../NameSave.tsx";
import {useNavigationHelpers} from "../UseFunctions.ts";
import useLocalStorage from '../useLocalStorage.tsx';
import {
    useBoardState, updateStatus, makeMove, checkWin, resetGame, winCombos
} from './BaseFunction.tsx';

function GamePage() {
    const [players, setPlayers] = useLocalStorage('players', []);
    const {currentPlayer} = useName();
    const {handleLogout, handleBack} = useNavigationHelpers();
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

    function getBestMove(board: string[]): number {
        let bestScore: number = -Infinity;
        let bestMove: number = -1;

        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = 'O';
                const score: number = minimax(board, 0, false);
                board[i] = '';
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = i;
                }
            }
        }

        return bestMove;
    }

    function minimax(board: string[], depth: number, isMaximizing: boolean): number {
        if (isMaximizing) {
            return findBestMaximizingMove(board, depth);
        } else {
            return findBestMinimizingMove(board, depth);
        }
    }

    function findBestMaximizingMove(board: string[], depth: number): number {
        const winner: string | null = checkWinner(board);
        if (winner !== null) {
            return evaluateWinner(winner);
        }

        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = 'O';
                const score: number = minimax(board, depth + 1, false);
                board[i] = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    }

    function findBestMinimizingMove(board: string[], depth: number): number {
        const winner: string | null = checkWinner(board);
        if (winner !== null) {
            return evaluateWinner(winner);
        }

        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = 'X';
                const score: number = minimax(board, depth + 1, true);
                board[i] = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }

    function checkWinner(board: string[]): string | null {
        for (const combo of winCombos) {
            const [a, b, c] = combo;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return board.includes('') ? null : 'draw';
    }

    function evaluateWinner(winner: string | null): number {
        if (winner === 'O') return 1;
        if (winner === 'X') return -1;
        return 0;
    }

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
                <div className="logout-button-container-1vPC">
                    <button className="logout-button" onClick={handleLogout}>Logout</button>
                </div>
            </div>
            <h1>Tic-Tac-Toe</h1>
            <div className="grid">
                {board.map((cell, index) => (
                    <button key={index} className="cell"
                            onClick={() => makeMove(index, board, setBoard, currentPlayerGame, gameOver, (newBoard) => checkWin(newBoard, currentPlayerGame, (message) => updateStatus(setStatus, message), setGameOver, setPlayers, players, currentPlayer, setCurrentPlayerGame))}>{cell}</button>
                ))}
            </div>
            <div id="status">{status}</div>
            <button id="reset"
                    onClick={() => resetGame(setBoard, setCurrentPlayerGame, setGameOver, (message) => updateStatus(setStatus, message))}>Reset
                Game
            </button>
        </div>
    );
}

export default GamePage;
