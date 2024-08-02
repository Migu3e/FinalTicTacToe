import './CSS/1v1.css';
import { Player } from './useLocalStorage';
import { useEffect } from 'react';

type MenuPageProps = {
    onLogout: () => void;
    currentPlayer: Player | null;
    onBack: () => void;
};

function initializeGame(currentPlayer:Player): void {
    const cells = document.querySelectorAll<HTMLButtonElement>(".cell");
    const statusElement = document.getElementById("status");

    let currentPlayerGame = "X";
    let gameOver = false;

    const winCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
        [0, 4, 8], [2, 4, 6]              // Diagonals
    ];

    function updateStatus(message: string) {
        if (statusElement) {
            statusElement.textContent = message;
        } else {
            console.error("Status element not found");
        }
    }

    function makeMove(index: number) {
        if (!gameOver && cells[index].textContent === "") {
            cells[index].textContent = currentPlayerGame;
            checkWin();
            if (!gameOver) {
                switchPlayer();
            }
        }
    }

    function switchPlayer() {
        currentPlayerGame = currentPlayerGame === "X" ? "O" : "X";
        updateStatus(`${currentPlayerGame}'s turn`);
    }

    function checkWin() {
        for (const combo of winCombos) {
            if (cells[combo[0]].textContent === currentPlayerGame &&
                cells[combo[1]].textContent === currentPlayerGame &&
                cells[combo[2]].textContent === currentPlayerGame) {
                updateStatus(`${currentPlayerGame} won the game!`);
                if (currentPlayerGame === "X")
                {
                    currentPlayer.score = currentPlayer.score + 1;
                }
                gameOver = true;
                return;
            }
        }

        const isDraw = Array.from(cells).every(cell => cell.textContent !== "");
        if (isDraw) {
            updateStatus("It's a tie!");
            gameOver = true;
        }
    }

    function resetGame() {
        cells.forEach(cell => cell.textContent = "");
        currentPlayerGame = "X";
        gameOver = false;
        updateStatus("X's turn");
    }

    cells.forEach((cell, index) => {
        cell.addEventListener("click", () => makeMove(index));
    });

    document.getElementById("reset")?.addEventListener("click", resetGame);

    updateStatus("X's turn");
}

function GamePage({ onLogout, currentPlayer, onBack }: MenuPageProps) {
    useEffect(() => {
        initializeGame(currentPlayer);
    }, []);

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
                <button className="cell" data-index="0"></button>
                <button className="cell" data-index="1"></button>
                <button className="cell" data-index="2"></button>
                <button className="cell" data-index="3"></button>
                <button className="cell" data-index="4"></button>
                <button className="cell" data-index="5"></button>
                <button className="cell" data-index="6"></button>
                <button className="cell" data-index="7"></button>
                <button className="cell" data-index="8"></button>
            </div>
            <div id="status">X's turn</div>
            <button id="reset">Reset Game</button>
        </div>
    );
}

export default GamePage;
