import React from 'react';
import {Container, Typography, Button} from '@mui/material';
import Board from './Board';
import {GameLogic} from '../logic/GameLogic';
import { BoardSquare, GameMode } from '../constants/gameConstants';
import StatsPanel from './Statistic';
import { useTranslation } from 'react-i18next';

export interface GameBoardProps {
    game: GameLogic | null;
    onSquareClick: (idx: number) => void;
    onRestart: () => void;
    stats: any;
    onResetStats: () => void;
}

const GameBoard: React.FC<GameBoardProps> = ({game, onSquareClick, onRestart, stats, onResetStats}) => {
    const { t } = useTranslation();

    return (
        <Container sx={{textAlign: 'center', py: 5}}>
            <Typography variant="h4" gutterBottom>
                {t('gameBoard.title')}
            </Typography>
            <Board squares={game?.board as BoardSquare[] || []} onClick={onSquareClick}/>
            <Typography variant="h6" sx={{my: 3}}>
                {game?.winner
                    ? game.winner === 'Draw'
                        ? t('gameInfo.draw')
                        : `${t('gameInfo.winner')}${game.winner}`
                    : `${t('gameInfo.nextPlayer')}${game?.isPlayerTurn ? t('gameInfo.you') : t('gameInfo.ai')} (${game?.isPlayerTurn ? game?.playerSymbol : game?.aiSymbol})`}
            </Typography>
            <Button variant="outlined" onClick={onRestart} sx={{mb: 3}}>
                {t('gameBoard.restart')}
            </Button>
            <StatsPanel stats={stats} playerSymbol={game?.playerSymbol || null} onResetStats={onResetStats} gameMode={GameMode.SINGLE}/>
        </Container>
    );
};

export default GameBoard;
