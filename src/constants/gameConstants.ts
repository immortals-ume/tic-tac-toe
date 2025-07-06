export enum PlayerSymbol {
    X = 'X',
    O = 'O',
}

export enum GameMode {
    SINGLE = 'single',
    MULTI = 'multi',
}

export enum AIDifficulty {
    EASY = 'easy',
    MEDIUM = 'medium',
    HARD = 'hard',
}

export enum GameResult {
    DRAW = 'Draw',
}

export type BoardSquare = PlayerSymbol | null;

export const WIN_COMBINATIONS: number[][] = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

export const BOARD_SIZE = 9;
export const EMPTY_BOARD: BoardSquare[] = Array(BOARD_SIZE).fill(null);

export const PLAYER_SYMBOLS = {
    X: 'X' as const,
    O: 'O' as const,
} as const;

export const GAME_MODES = {
    SINGLE: 'single' as const,
    MULTI: 'multi' as const,
} as const;

export const GAME_RESULTS = {
    DRAW: 'Draw' as const,
} as const;
