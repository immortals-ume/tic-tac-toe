import { PlayerSymbol, BoardSquare, GameResult, WIN_COMBINATIONS } from '../constants/gameConstants';

export interface GameStats {
    wins: number;
    losses: number;
    draws: number;
    currentStreak: number;
    bestStreak: number;
}

export const calculateWinRate = (stats: GameStats): number => {
    const totalGames = stats.wins + stats.losses + stats.draws;
    return totalGames > 0 ? Math.round((stats.wins / totalGames) * 100) : 0;
};

export const calculateLossRate = (stats: GameStats): number => {
    const totalGames = stats.wins + stats.losses + stats.draws;
    return totalGames > 0 ? Math.round((stats.losses / totalGames) * 100) : 0;
};

export const calculateDrawRate = (stats: GameStats): number => {
    const totalGames = stats.wins + stats.losses + stats.draws;
    return totalGames > 0 ? Math.round((stats.draws / totalGames) * 100) : 0;
};

export const getTotalGames = (stats: GameStats): number => {
    return stats.wins + stats.losses + stats.draws;
};

export const checkWinner = (board: BoardSquare[]): PlayerSymbol | GameResult.DRAW | null => {
    for (const combo of WIN_COMBINATIONS) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a] as PlayerSymbol;
        }
    }
    return board.every(cell => cell !== null) ? GameResult.DRAW : null;
};

export const getWinningLine = (board: BoardSquare[], winner: PlayerSymbol | null): number[] | null => {
    if (!winner) return null;
    return WIN_COMBINATIONS.find(combo =>
        board[combo[0]] === winner &&
        board[combo[1]] === winner &&
        board[combo[2]] === winner
    ) || null;
};

export const getAvailableMoves = (board: BoardSquare[]): number[] => {
    return board
        .map((cell, idx) => (cell === null ? idx : null))
        .filter((val): val is number => val !== null);
};

export const isBoardFull = (board: BoardSquare[]): boolean => {
    return board.every(cell => cell !== null);
};

export const getOppositeSymbol = (symbol: PlayerSymbol): PlayerSymbol => {
    return symbol === PlayerSymbol.X ? PlayerSymbol.O : PlayerSymbol.X;
};

export const createEmptyBoard = (): BoardSquare[] => {
    return Array(9).fill(null);
};

export const updateStats = (
    currentStats: GameStats,
    winner: PlayerSymbol | GameResult.DRAW | null,
    playerSymbol: PlayerSymbol
): GameStats => {
    const newStats = { ...currentStats };

    if (winner === GameResult.DRAW) {
        newStats.draws = currentStats.draws + 1;
        newStats.currentStreak = 0;
    } else if (winner === playerSymbol) {
        newStats.wins = currentStats.wins + 1;
        newStats.currentStreak = currentStats.currentStreak + 1;
        newStats.bestStreak = Math.max(currentStats.bestStreak, currentStats.currentStreak + 1);
    } else if (winner) {
        newStats.losses = currentStats.losses + 1;
        newStats.currentStreak = 0;
    }

    return newStats;
};

export const resetStats = (): GameStats => ({
    wins: 0,
    losses: 0,
    draws: 0,
    currentStreak: 0,
    bestStreak: 0
});

export const getWinRateColor = (winRate: number): 'success' | 'warning' | 'error' => {
    if (winRate >= 70) return 'success';
    if (winRate >= 40) return 'warning';
    return 'error';
};

export const isSoundMuted = (): boolean => {
    return localStorage.getItem('soundMuted') === 'true';
};

export const setSoundMuted = (muted: boolean): void => {
    localStorage.setItem('soundMuted', muted.toString());
};
