import { Player } from '../../useLocalStorage.tsx';

export const winCombos: number[][] = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
    [0, 4, 8], [2, 4, 6]              // Diagonals
];

export const checkWin = (board: string[], symbol: string): boolean => {
    return winCombos.some(combo => combo.every(index => board[index] === symbol));
};

export const checkDraw = (board: string[]): boolean => {
    return board.every(cell => cell !== '');
};

export const updatePlayerScore = (players: Player[], winnerName: string): Player[] => {
    return players.map(player =>
        player.name === winnerName ? { ...player, score: player.score + 1 } : player
    );
};

export const handleWin = (winner: string, player1: Player | null, player2: Player | null, players: Player[], setPlayers: (players: Player[]) => void, setStatus: (status: string) => void, setGameOver: (gameOver: boolean) => void
) => {
    const winnerName = winner === 'X' ? player1?.name : player2?.name;
    setStatus(`${winnerName} (${winner}) wins!`);
    setGameOver(true);
    if (winnerName) {
        setPlayers(updatePlayerScore(players, winnerName));
    }
};

export const makeMove = (index: number, board: string[], setBoard: (board: string[]) => void, currentPlayerSymbol: string, setCurrentPlayerSymbol: (symbol: string) => void, gameOver: boolean, handleWin: () => void, setStatus: (status: string) => void, setGameOver: (gameOver: boolean) => void
) => {
    if (!gameOver && board[index] === '') {
        const newBoard = [...board];
        newBoard[index] = currentPlayerSymbol;
        setBoard(newBoard);
        if (checkWin(newBoard, currentPlayerSymbol)) 
        {
            handleWin();
        } else if (checkDraw(newBoard)) {
            setStatus("It's a draw!");
            setGameOver(true);
        } else {
            setCurrentPlayerSymbol(currentPlayerSymbol === 'X' ? 'O' : 'X');
            setStatus(currentPlayerSymbol + " turn");
        }
    }
};