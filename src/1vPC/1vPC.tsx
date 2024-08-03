import { useState, useEffect } from 'react';
import './1vPC.css';
import useLocalStorage, { updatePlayerScore, Player } from '../useLocalStorage.tsx';

type GamePageProps = {
    onLogout: () => void;
    currentPlayer: Player | null;
    onBack: () => void;
};

const winCombos : number[][] = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
    [0, 4, 8], [2, 4, 6]              // Diagonals
];

function GamePage({ onLogout, currentPlayer, onBack }: GamePageProps) {
    const [players, setPlayers] = useLocalStorage('players', []);
    const [board, setBoard] = useState<string[]>(Array(9).fill(''));
    const [currentPlayerGame, setCurrentPlayerGame] = useState('X');
    const [gameOver, setGameOver] = useState(false);
    const [status, setStatus] = useState("Your turn");

    useEffect(() => {
        if (currentPlayerGame === 'O' && !gameOver) {
            const pcMove = getBestMove(board);
            makeMove(pcMove);
        }
    }, [currentPlayerGame, gameOver]);

    function updateStatus(message: string): void {
        setStatus(message);
    }

    function makeMove(index: number): void {
        if (!gameOver && board[index] === '') {
            const newBoard = [...board];
            newBoard[index] = currentPlayerGame;
            setBoard(newBoard);
            checkWin(newBoard);
        }
    }

    function switchPlayer(): void {
        setCurrentPlayerGame(currentPlayerGame === 'X' ? 'O' : 'X');
    }

    function checkWin(currentBoard: string[]): void {
        for (const combo of winCombos) {
            if (currentBoard[combo[0]] === currentPlayerGame &&
                currentBoard[combo[1]] === currentPlayerGame &&
                currentBoard[combo[2]] === currentPlayerGame) {
                updateStatus(currentPlayerGame === 'X' ? "You won!" : "AI won!");
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

    function resetGame(): void {
        setBoard(Array(9).fill(''));
        setCurrentPlayerGame('X');
        setGameOver(false);
        updateStatus("Your turn");
    }


    function minimax(board: string[], depth: number, isMaximizing: boolean): number {
        if (isMaximizing) {
            return findBestMaximizingMove(board, depth);
        } else {
            return findBestMinimizingMove(board, depth);
        }
    }

    function checkWinner(board: string[]): string | null {
        //winning combinations check
        for (const [firstIndex, secondIndex, thirdIndex] of winCombos) {
            const firstCell: string = board[firstIndex];
            const secondCell: string = board[secondIndex];
            const thirdCell : string= board[thirdIndex];

            const isWinningCombination: boolean = firstCell !== '' &&
                firstCell === secondCell &&
                firstCell === thirdCell;

            if (isWinningCombination) {
                return firstCell;  // return the winniing player ('x' or '0')
            }
        }

        // tie?
        const isBoardFull = board.every(cell => cell !== '');
        if (isBoardFull) {
            return 'tie';
        }

        // game didnt end no win ot tie.
        return null;
    }


    function evaluateWinner(winner: string): number {
        if (winner === 'X') return -1;
        if (winner === 'O') return 1;
        return 0; // tie
    }

    // turn of '0' in culculation
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

    //turn of 'x' in calculation
    function findBestMinimizingMove(board: string[], depth: number): number {
        const winner: string | null = checkWinner(board);
        if (winner !== null) {
            return evaluateWinner(winner);
        }

        let bestScore: number = Infinity;
        for (let i: number = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = 'X';
                const score: number = minimax(board, depth + 1, true);
                board[i] = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }

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
            <h1>Tic-Tac-Toe vs PC</h1>
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
