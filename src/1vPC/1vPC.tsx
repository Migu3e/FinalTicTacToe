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
    //gets the players for local storage
    const [board, setBoard] = useState<string[]>(Array(9).fill(''));
    // the board
    const [currentPlayerGame, setCurrentPlayerGame] = useState('X');
    // if x or 0
    const [gameOver, setGameOver] = useState(false);
    // if the came is over by win or draw
    const [status, setStatus] = useState("X's turn");
    // the messsage status


    useEffect(():void => {
        const statusMessage = `${currentPlayerGame}'s turn`;

        updateStatus(statusMessage);

    }, [currentPlayerGame]);

    function updateStatus(message: string):void {
        setStatus(message);
    }

    function makeMove(index: number):void {
        if (!gameOver && board[index] === '') {
            const newBoard :string[] = [...board];
            newBoard[index] = currentPlayerGame;
            setBoard(newBoard);
            checkWin(newBoard);
        }
    }

    function switchPlayer():void {
        setCurrentPlayerGame(currentPlayerGame === 'X' ? 'O' : 'X');
    }

    function checkWin(currentBoard: string[]):void {
        for (const combo of winCombos) {
            if (currentBoard[combo[0]] === currentPlayerGame &&
                currentBoard[combo[1]] === currentPlayerGame &&
                currentBoard[combo[2]] === currentPlayerGame) {
                updateStatus(`${currentPlayerGame} won the game!`);
                if (currentPlayerGame === 'X' && currentPlayer) {
                    const updatedPlayers:Player[] = updatePlayerScore(players, currentPlayer.name);
                    setPlayers(updatedPlayers);
                    currentPlayer.score = currentPlayer.score + 1;
                }
                setGameOver(true);
                return;
            }
        }

        const isDraw : boolean = currentBoard.every(cell => cell !== '');
        if (isDraw) {
            updateStatus("It's a tie!");
            setGameOver(true);
        }
        else
        {
            switchPlayer();
        }
    }

    function resetGame():void {
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
                <button className="cell" onClick={() => makeMove(0)}>{board[0]}</button>
                <button className="cell" onClick={() => makeMove(1)}>{board[1]}</button>
                <button className="cell" onClick={() => makeMove(2)}>{board[2]}</button>
                <button className="cell" onClick={() => makeMove(3)}>{board[3]}</button>
                <button className="cell" onClick={() => makeMove(4)}>{board[4]}</button>
                <button className="cell" onClick={() => makeMove(5)}>{board[5]}</button>
                <button className="cell" onClick={() => makeMove(6)}>{board[6]}</button>
                <button className="cell" onClick={() => makeMove(7)}>{board[7]}</button>
                <button className="cell" onClick={() => makeMove(8)}>{board[8]}</button>
            </div>
            <div id="status">{status}</div>
            <button id="reset" onClick={resetGame}>Reset Game</button>
        </div>
    );
}

export default GamePage;