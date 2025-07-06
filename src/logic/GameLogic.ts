import { getBestMoveWithSymbol } from './ai';
import { PlayerSymbol, BoardSquare, GameResult } from '../constants/gameConstants';
import { checkWinner, isBoardFull, getOppositeSymbol, createEmptyBoard } from '../utils/gameUtils';

export class GameLogic {
    board: BoardSquare[];
    isPlayerTurn: boolean;
    winner: PlayerSymbol | GameResult.DRAW | null;
    playerSymbol: PlayerSymbol;
    aiSymbol: PlayerSymbol;

    constructor(playerSymbol: PlayerSymbol = PlayerSymbol.X) {
        this.board = createEmptyBoard();
        this.playerSymbol = playerSymbol;
        this.aiSymbol = getOppositeSymbol(playerSymbol);
        this.isPlayerTurn = playerSymbol === PlayerSymbol.X;
        this.winner = null;
    }

    private checkWinnerForPlayer(player: PlayerSymbol): boolean {
        return checkWinner(this.board) === player;
    }

    playerMove(idx: number): boolean {
        if (this.board[idx] !== null || this.winner !== null || !this.isPlayerTurn) return false;

        this.board[idx] = this.playerSymbol;

        if (this.checkWinnerForPlayer(this.playerSymbol)) {
            this.winner = this.playerSymbol;
        } else if (isBoardFull(this.board)) {
            this.winner = GameResult.DRAW;
        } else {
            this.isPlayerTurn = false;
        }
        return true;
    }

    aiMove(): boolean {
        if (this.winner !== null || this.isPlayerTurn) return false;

        const move = getBestMoveWithSymbol(this.board, this.aiSymbol, this.playerSymbol);
        if (move === undefined) return false;

        this.board[move] = this.aiSymbol;

        if (this.checkWinnerForPlayer(this.aiSymbol)) {
            this.winner = this.aiSymbol;
        } else if (isBoardFull(this.board)) {
            this.winner = GameResult.DRAW;
        } else {
            this.isPlayerTurn = true;
        }
        return true;
    }

    reset(): void {
        this.board = createEmptyBoard();
        this.isPlayerTurn = this.playerSymbol === PlayerSymbol.X;
        this.winner = null;
    }
}
