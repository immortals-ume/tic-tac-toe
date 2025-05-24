import React from 'react';
import {Box, Button, LinearProgress, Paper, Typography,} from '@mui/material';

interface Stats {
    wins: number;
    losses: number;
    draws: number;
}

interface StatsPanelProps {
    stats: Stats;
    playerSymbol: 'X' | 'O' | null;
    onResetStats: () => void;
}

const StatsPanel: React.FC<StatsPanelProps> = ({
                                                   stats,
                                                   playerSymbol,
                                                   onResetStats,
                                               }) => {
    const totalGames = stats.wins + stats.losses + stats.draws;
    const winRate = totalGames ? ((stats.wins / totalGames) * 100).toFixed(1) : '0';

    return (
        <Paper elevation={3} sx={{p: 3, mt: 4, textAlign: 'center'}}>
            <Typography variant="h6" gutterBottom>
                Game Statistics
            </Typography>

            {playerSymbol && (
                <Typography variant="subtitle1" sx={{mb: 2}}>
                    Playing as: <strong>{playerSymbol}</strong>
                </Typography>
            )}

            <Box sx={{mb: 2}}>
                <Typography>Total Games: <strong>{totalGames}</strong></Typography>
                <Typography>Wins: <strong>{stats.wins}</strong></Typography>

                <LinearProgress
                    variant="determinate"
                    value={+winRate}
                    sx={{height: 10, borderRadius: 5, my: 1}}
                />

                <Typography variant="caption" color="textSecondary">
                    Win Rate: {winRate}%
                </Typography>
            </Box>

            <Box display="flex" justifyContent="space-around" sx={{mt: 2}}>
                <Typography>Losses: <strong>{stats.losses}</strong></Typography>
                <Typography>Draws: <strong>{stats.draws}</strong></Typography>
            </Box>

            <Button
                variant="outlined"
                onClick={onResetStats}
                sx={{mt: 3}}
                size="small"
            >
                Reset Stats
            </Button>
        </Paper>
    );
};

export default StatsPanel;
