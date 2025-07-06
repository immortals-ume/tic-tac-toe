import React from 'react';
import {Typography} from '@mui/material';
import { PlayerSymbol, GameMode, GameResult } from '../constants/gameConstants';
import { useTranslation } from 'react-i18next';

export interface GameInfoProps {
    winner: PlayerSymbol | GameResult.DRAW | null;
    isPlayerTurn: boolean;
    playerSymbol: PlayerSymbol;
    aiSymbol: PlayerSymbol;
    gameMode?: GameMode;
}

const GameInfo: React.FC<GameInfoProps> = ({winner, isPlayerTurn, playerSymbol, aiSymbol, gameMode = GameMode.SINGLE}) => {
    const { t } = useTranslation();

    let turnMessage = '';
    if (!winner) {
        if (gameMode === GameMode.SINGLE) {
            turnMessage = isPlayerTurn
                ? `${t('gameInfo.yourTurn')} (${playerSymbol})`
                : `${t('gameInfo.aiTurn')} (${aiSymbol})`;
        } else {
            turnMessage = playerSymbol === 'X'
                ? `${t('gameInfo.player1Turn')} (X)`
                : `${t('gameInfo.player2Turn')} (O)`;
        }
    }

    return (
        <Typography variant="h6" sx={{my: 3}}>
            {winner
                ? winner === GameResult.DRAW
                    ? t('gameInfo.draw')
                    : `${t('gameInfo.winner')}${winner}`
                : turnMessage}
        </Typography>
    );
};

export default GameInfo;
