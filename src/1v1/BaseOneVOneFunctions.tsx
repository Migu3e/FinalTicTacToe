import { Player } from '../useLocalStorage';

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
        player.name === winnerName
            ? { ...player, score: player.score + 1 }
            : player
    );
};