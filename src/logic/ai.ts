export type Player = 'X' | 'O' | null;
const WIN_COMBINATIONS: number[][] = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

/**
 * Returns the best move for the AI using the Minimax algorithm
 * with randomization on equally good moves to avoid predictability.
 */
export function getBestMoveWithSymbol(
    board: Player[],
    aiSymbol: Exclude<Player, null>,
    playerSymbol: Exclude<Player, null>
): number {
    // scores map for evaluating board states
    const scores: Record<Exclude<Player, null> | 'Draw', number> = {
        [aiSymbol]: 1,
        [playerSymbol]: -1,
        Draw: 0,
        X: 0,
        O: 0
    };

    // Find all empty spots on the board
    const availableMoves = board
        .map((cell, idx) => (cell === null ? idx : null))
        .filter((val): val is number => val !== null);

    let bestScore = -Infinity;
    let bestMoves: number[] = [];

    // Evaluate each possible move
    for (const move of availableMoves) {
        const newBoard = [...board];
        newBoard[move] = aiSymbol;

        const score = minimax(newBoard, false, aiSymbol, playerSymbol, scores);

        if (score > bestScore) {
            bestScore = score;
            bestMoves = [move]; // new best move found
        } else if (score === bestScore) {
            bestMoves.push(move); // equally good move found
        }
    }

    // Randomize among equally good moves to avoid predictability
    const randomIndex = Math.floor(Math.random() * bestMoves.length);
    return bestMoves[randomIndex];
}

/**
 * Minimax algorithm to evaluate board positions.
 */
function minimax(
    board: Player[],
    isMaximizing: boolean,
    aiSymbol: Exclude<Player, null>,
    playerSymbol: Exclude<Player, null>,
    scores: Record<Exclude<Player, null> | 'Draw', number>
): number {
    const winner = checkWinner(board);
    if (winner !== null) return scores[winner];

    const availableMoves = board
        .map((cell, idx) => (cell === null ? idx : null))
        .filter((val): val is number => val !== null);

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (const move of availableMoves) {
            const newBoard = [...board];
            newBoard[move] = aiSymbol;
            const score = minimax(newBoard, false, aiSymbol, playerSymbol, scores);
            bestScore = Math.max(score, bestScore);
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (const move of availableMoves) {
            const newBoard = [...board];
            newBoard[move] = playerSymbol;
            const score = minimax(newBoard, true, aiSymbol, playerSymbol, scores);
            bestScore = Math.min(score, bestScore);
        }
        return bestScore;
    }
}

/**
 * Checks for winner or draw in current board.
 * Returns 'X', 'O', 'Draw', or null
 */
export function checkWinner(board: Player[]): Player | 'Draw' | null {
    for (const combo of WIN_COMBINATIONS) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return board.every(cell => cell !== null) ? 'Draw' : null;
}
