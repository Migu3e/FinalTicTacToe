import { winCombos } from './BaseFunction';

export function getBestMove(board: string[]): number {
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