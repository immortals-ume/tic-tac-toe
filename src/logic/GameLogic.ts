

import { getBestMoveWithSymbol} from './ai';

export type Player = 'X' | 'O' | null;
export class GameLogic {
    board: Player[];
    isPlayerTurn: boolean;
    winner: Player | 'Draw' | null;
    playerSymbol: 'X' | 'O';
    aiSymbol: 'X' | 'O';

    constructor(playerSymbol: 'X' | 'O' = 'X') {
        this.board = Array(9).fill(null);
        this.playerSymbol = playerSymbol;
        this.aiSymbol = playerSymbol === 'X' ? 'O' : 'X';
        this.isPlayerTurn = playerSymbol === 'X';
        this.winner = null;
    }

    private checkWinner(player: Player): boolean {
        const WIN_COMBINATIONS: number[][] = [
            [0,1,2],[3,4,5],[6,7,8],
            [0,3,6],[1,4,7],[2,5,8],
            [0,4,8],[2,4,6]
        ];
        return WIN_COMBINATIONS.some(combo => combo.every(i => this.board[i] === player));
    }

    private isBoardFull(): boolean {
        return this.board.every(sq => sq !== null);
    }

    playerMove(idx: number): boolean {
        if (this.board[idx] !== null || this.winner !== null || !this.isPlayerTurn) return false;

        this.board[idx] = this.playerSymbol;

        if (this.checkWinner(this.playerSymbol)) {
            this.winner = this.playerSymbol;
        } else if (this.isBoardFull()) {
            this.winner = 'Draw';
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

        if (this.checkWinner(this.aiSymbol)) {
            this.winner = this.aiSymbol;
        } else if (this.isBoardFull()) {
            this.winner = 'Draw';
        } else {
            this.isPlayerTurn = true;
        }
        return true;
    }

    reset() {
        this.board = Array(9).fill(null);
        this.isPlayerTurn = this.playerSymbol === 'X';
        this.winner = null;
    }
}
