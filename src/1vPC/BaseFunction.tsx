import { useState, Dispatch, SetStateAction } from 'react';
import { updatePlayerScore, Player } from '../useLocalStorage.tsx';
export const winCombos: number[][] = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
    [0, 4, 8], [2, 4, 6]              // Diagonals
];

export function useBoardState() {
    const [board, setBoard] = useState<string[]>(Array(9).fill(''));
    const [currentPlayerGame, setCurrentPlayerGame] = useState('X');
    const [gameOver, setGameOver] = useState(false);
    const [status, setStatus] = useState("X's turn");
    return { board, setBoard, currentPlayerGame, setCurrentPlayerGame, gameOver, setGameOver, status, setStatus };
}

export function updateStatus(setStatus: Dispatch<SetStateAction<string>>, message: string): void
{
    setStatus(message);
}

export function makeMove(index: number, board: string[], setBoard: Dispatch<SetStateAction<string[]>>, currentPlayerGame: string, gameOver: boolean, checkWin: (board: string[]) => void
): void {
    if (!gameOver && board[index] === '') {
        const newBoard: string[] = [...board];
        newBoard[index] = currentPlayerGame;
        setBoard(newBoard);
        checkWin(newBoard);
    }
}

export function switchPlayer(setCurrentPlayerGame: Dispatch<SetStateAction<string>>, currentPlayerGame: string): void {
    setCurrentPlayerGame(currentPlayerGame === 'X' ? 'O' : 'X');
}

export function checkWin(currentBoard: string[], currentPlayerGame: string, updateStatus: (message: string) => void, setGameOver: Dispatch<SetStateAction<boolean>>, setPlayers: Dispatch<SetStateAction<Player[]>>, players: Player[], currentPlayer: Player | null, setCurrentPlayerGame: Dispatch<SetStateAction<string>>
): void {
    for (const combo of winCombos) {
        if (currentBoard[combo[0]] === currentPlayerGame && currentBoard[combo[1]] === currentPlayerGame && currentBoard[combo[2]] === currentPlayerGame) {
            updateStatus(`${currentPlayerGame} won the game!`);
            if (currentPlayerGame === 'X' && currentPlayer) {
                const updatedPlayers: Player[] = updatePlayerScore(players, currentPlayer.name);
                setPlayers(updatedPlayers);
                currentPlayer.score = currentPlayer.score + 1;
            }
            setGameOver(true);
            return;
        }
    }

    const isDraw: boolean = currentBoard.every(cell => cell !== '');
    if (isDraw) 
    {
        updateStatus("It's a tie!");
        setGameOver(true);
    } else {
        switchPlayer(setCurrentPlayerGame, currentPlayerGame);
    }
}

export function resetGame(setBoard: Dispatch<SetStateAction<string[]>>, setCurrentPlayerGame: Dispatch<SetStateAction<string>>, setGameOver: Dispatch<SetStateAction<boolean>>, updateStatus: (message: string) => void
): void {
    setBoard(Array(9).fill(''));
    setCurrentPlayerGame('X');
    setGameOver(false);
    updateStatus("X's turn");
}