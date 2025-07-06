import { PlayerSymbol, BoardSquare, GameResult, AIDifficulty } from '../constants/gameConstants';
import {checkWinner, getAvailableMoves} from '../utils/gameUtils';

export function getBestMoveWithSymbol(
    board: BoardSquare[],
    aiSymbol: PlayerSymbol,
    playerSymbol: PlayerSymbol,
    difficulty: AIDifficulty = AIDifficulty.HARD
): number {
    const availableMoves = getAvailableMoves(board);
    if (difficulty === AIDifficulty.EASY) {
        const randomIndex = Math.floor(Math.random() * availableMoves.length);
        return availableMoves[randomIndex];
    }
    const scores: Record<PlayerSymbol | GameResult.DRAW, number> = {
        [aiSymbol]: 1,
        [playerSymbol]: -1,
        [GameResult.DRAW]: 0,
        [PlayerSymbol.X]: 0,
        [PlayerSymbol.O]: 0
    };
    let bestScore = -Infinity;
    let bestMoves: number[] = [];
    for (const move of availableMoves) {
        const newBoard = [...board];
        newBoard[move] = aiSymbol;
        const score = minimax(
            newBoard,
            false,
            aiSymbol,
            playerSymbol,
            scores,
            difficulty === AIDifficulty.MEDIUM ? 2 : undefined
        );
        if (score > bestScore) {
            bestScore = score;
            bestMoves = [move];
        } else if (score === bestScore) {
            bestMoves.push(move);
        }
    }
    const randomIndex = Math.floor(Math.random() * bestMoves.length);
    return bestMoves[randomIndex];
}

function minimax(
    board: BoardSquare[],
    isMaximizing: boolean,
    aiSymbol: PlayerSymbol,
    playerSymbol: PlayerSymbol,
    scores: Record<PlayerSymbol | GameResult.DRAW, number>,
    maxDepth?: number,
    depth: number = 0
): number {
    const winner = checkWinner(board);
    if (winner !== null) {
        return scores[winner as PlayerSymbol | GameResult.DRAW];
    }
    if (maxDepth !== undefined && depth >= maxDepth) {
        return 0;
    }
    const availableMoves = getAvailableMoves(board);
    if (isMaximizing) {
        let bestScore = -Infinity;
        for (const move of availableMoves) {
            const newBoard = [...board];
            newBoard[move] = aiSymbol;
            const score = minimax(newBoard, false, aiSymbol, playerSymbol, scores, maxDepth, depth + 1);
            bestScore = Math.max(score, bestScore);
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (const move of availableMoves) {
            const newBoard = [...board];
            newBoard[move] = playerSymbol;
            const score = minimax(newBoard, true, aiSymbol, playerSymbol, scores, maxDepth, depth + 1);
            bestScore = Math.min(score, bestScore);
        }
        return bestScore;
    }
}
