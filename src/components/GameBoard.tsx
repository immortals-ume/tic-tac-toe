import React from 'react';
import {Button, Container, Typography} from '@mui/material';
import Board from './Board';
import Stats from './Statistic';
import {GameLogic} from '../logic/GameLogic';

interface GameBoardProps {
    game: GameLogic | null;
    onSquareClick: (idx: number) => void;
    onRestart: () => void;
    stats: { wins: number; losses: number; draws: number };
    onResetStats: () => void;
}

const GameBoard: React.FC<GameBoardProps> = ({game, onSquareClick, onRestart, stats, onResetStats}) => {
    return (
        <Container sx={{textAlign: 'center', py: 5}}>
            <Typography variant="h4" gutterBottom>
                Tic Tac Toe
            </Typography>

            <Board squares={game?.board || Array(9).fill(null)} onClick={onSquareClick}/>

            <Typography variant="h6" sx={{my: 3}}>
                {game?.winner
                    ? game.winner === 'Draw'
                        ? "It's a Draw!"
                        : `Winner: ${game.winner}`
                    : `Next player: ${game?.isPlayerTurn ? 'You' : 'AI'} (${game?.isPlayerTurn ? game?.playerSymbol : game?.aiSymbol})`}
            </Typography>

            <Button variant="outlined" onClick={onRestart} sx={{mb: 3}}>
                Restart / Back to Landing
            </Button>

            <Stats wins={stats.wins} losses={stats.losses} draws={stats.draws} onResetStats={onResetStats}/>
        </Container>
    );
};

export default GameBoard;
