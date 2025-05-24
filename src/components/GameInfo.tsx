import React from 'react';
import {Typography} from '@mui/material';

interface GameInfoProps {
    winner: string | null;
    isPlayerTurn: boolean;
    playerSymbol: 'X' | 'O';
    aiSymbol: 'X' | 'O';
}

const GameInfo: React.FC<GameInfoProps> = ({winner, isPlayerTurn, playerSymbol, aiSymbol}) => (
    <Typography variant="h6" sx={{my: 3}}>
        {winner
            ? winner === 'Draw'
                ? "It's a Draw!"
                : `Winner: ${winner}`
            : `Next player: ${isPlayerTurn ? 'You' : 'AI'} (${isPlayerTurn ? playerSymbol : aiSymbol})`}
    </Typography>
);

export default GameInfo;
