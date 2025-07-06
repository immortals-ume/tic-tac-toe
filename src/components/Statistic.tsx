import React from 'react';
import {Box, Button, LinearProgress, Paper, Typography, Chip, Divider, useTheme} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import RemoveIcon from '@mui/icons-material/Remove';
import RefreshIcon from '@mui/icons-material/Refresh';
import { PlayerSymbol, GameMode } from '../constants/gameConstants';
import { GameStats, calculateWinRate, calculateLossRate, calculateDrawRate, getTotalGames, getWinRateColor } from '../utils/gameUtils';
import { useTranslation } from 'react-i18next';

export interface Stats extends GameStats {}

export interface StatsPanelProps {
    stats: Stats;
    playerSymbol: PlayerSymbol | null;
    onResetStats: () => void;
    gameMode: GameMode;
}

const StatsPanel: React.FC<StatsPanelProps> = ({stats, playerSymbol, onResetStats, gameMode}) => {
    const theme = useTheme();
    const { t } = useTranslation();
    const totalGames = getTotalGames(stats);
    const winRate = calculateWinRate(stats);
    const lossRate = calculateLossRate(stats);
    const drawRate = calculateDrawRate(stats);

    return (
        <Paper elevation={3} sx={{
            p: { xs: 2, sm: 3 },
            mt: 3,
            borderRadius: 3,
            mx: { xs: 1, sm: 0 }
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'space-between',
                alignItems: { xs: 'flex-start', sm: 'center' },
                mb: 3,
                gap: { xs: 2, sm: 0 }
            }}>
                <Typography variant="h5" sx={{
                    fontWeight: 700,
                    color: theme.palette.text.primary,
                    fontSize: { xs: '1.5rem', sm: '2rem' }
                }}>
                    Statistics
                </Typography>
                <Chip
                    label={gameMode === GameMode.SINGLE ? t('stats.singlePlayer') : t('stats.multiplayer')}
                    color={gameMode === GameMode.SINGLE ? "primary" : "secondary"}
                    variant="outlined"
                    sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, mb: 2 }}
                />
            </Box>

            <Box sx={{
                display: 'grid',
                gridTemplateColumns: {
                    xs: 'repeat(2, 1fr)',
                    sm: 'repeat(3, 1fr)',
                    md: 'repeat(auto-fit, minmax(120px, 1fr))'
                },
                gap: { xs: 1.5, sm: 2 },
                mb: 3
            }}>
                <Box sx={{
                    p: { xs: 1.5, sm: 2 },
                    borderRadius: 2,
                    background: theme.palette.mode === 'dark'
                        ? 'rgba(76, 175, 80, 0.1)'
                        : 'rgba(76, 175, 80, 0.1)',
                    border: `1px solid ${theme.palette.success.main}40`
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                        <EmojiEventsIcon sx={{
                            color: theme.palette.success.main,
                            mr: 1,
                            fontSize: { xs: '1.5rem', sm: '2rem' }
                        }} />
                        <Typography variant="h6" sx={{
                            color: theme.palette.success.main,
                            fontWeight: 700,
                            fontSize: { xs: '1.25rem', sm: '1.5rem' }
                        }}>
                            {stats.wins}
                        </Typography>
                    </Box>
                    <Typography variant="body2" sx={{
                        color: theme.palette.text.primary,
                        fontSize: { xs: '0.75rem', sm: '0.875rem' }
                    }}>Wins</Typography>
                </Box>
                <Box sx={{
                    p: { xs: 1.5, sm: 2 },
                    borderRadius: 2,
                    background: theme.palette.mode === 'dark'
                        ? 'rgba(244, 67, 54, 0.1)'
                        : 'rgba(231, 76, 60, 0.1)',
                    border: `1px solid ${theme.palette.error.main}40`
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                        <ThumbDownIcon sx={{
                            color: theme.palette.error.main,
                            mr: 1,
                            fontSize: { xs: '1.5rem', sm: '2rem' }
                        }} />
                        <Typography variant="h6" sx={{
                            color: theme.palette.error.main,
                            fontWeight: 700,
                            fontSize: { xs: '1.25rem', sm: '1.5rem' }
                        }}>
                            {stats.losses}
                        </Typography>
                    </Box>
                    <Typography variant="body2" sx={{
                        color: theme.palette.text.primary,
                        fontSize: { xs: '0.75rem', sm: '0.875rem' }
                    }}>{t('stats.losses')}</Typography>
                </Box>
                <Box sx={{
                    p: { xs: 1.5, sm: 2 },
                    borderRadius: 2,
                    background: theme.palette.mode === 'dark'
                        ? 'rgba(158, 158, 158, 0.1)'
                        : 'rgba(149, 165, 166, 0.1)',
                    border: `1px solid ${theme.palette.grey[500]}40`,
                    gridColumn: { xs: 'span 2', sm: 'span 1' }
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                        <RemoveIcon sx={{
                            color: theme.palette.grey[500],
                            mr: 1,
                            fontSize: { xs: '1.5rem', sm: '2rem' }
                        }} />
                        <Typography variant="h6" sx={{
                            color: theme.palette.grey[500],
                            fontWeight: 700,
                            fontSize: { xs: '1.25rem', sm: '1.5rem' }
                        }}>
                            {stats.draws}
                        </Typography>
                    </Box>
                    <Typography variant="body2" sx={{
                        color: theme.palette.text.primary,
                        fontSize: { xs: '0.75rem', sm: '0.875rem' }
                    }}>Draws</Typography>
                </Box>
            </Box>

            {stats.currentStreak !== undefined && stats.bestStreak !== undefined && (
                <Box sx={{mb: 3}}>
                    <Typography variant="h6" sx={{
                        mb: 2,
                        color: theme.palette.text.primary,
                        fontWeight: 600,
                        fontSize: { xs: '1rem', sm: '1.25rem' }
                    }}>
                        Streaks
                    </Typography>
                    <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: 'repeat(2, 1fr)',
                            sm: 'repeat(auto-fit, minmax(150px, 1fr))'
                        },
                        gap: { xs: 1.5, sm: 2 }
                    }}>
                        <Box sx={{
                            p: { xs: 1.5, sm: 2 },
                            borderRadius: 2,
                            background: theme.palette.mode === 'dark'
                                ? 'rgba(255, 193, 7, 0.1)'
                                : 'rgba(255, 193, 7, 0.1)',
                            border: `1px solid ${theme.palette.warning.main}40`
                        }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                                <TrendingUpIcon sx={{
                                    color: theme.palette.warning.main,
                                    mr: 1,
                                    fontSize: { xs: '1.5rem', sm: '2rem' }
                                }} />
                                <Typography variant="h6" sx={{
                                    color: theme.palette.warning.main,
                                    fontWeight: 700,
                                    fontSize: { xs: '1.25rem', sm: '1.5rem' }
                                }}>
                                    {stats.currentStreak}
                                </Typography>
                            </Box>
                            <Typography variant="body2" sx={{
                                color: theme.palette.text.primary,
                                fontSize: { xs: '0.75rem', sm: '0.875rem' }
                            }}>Current Streak</Typography>
                        </Box>
                        <Box sx={{
                            p: { xs: 1.5, sm: 2 },
                            borderRadius: 2,
                            background: theme.palette.mode === 'dark'
                                ? 'rgba(156, 39, 176, 0.1)'
                                : 'rgba(156, 39, 176, 0.1)',
                            border: `1px solid ${theme.palette.secondary.main}40`
                        }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                                <EmojiEventsIcon sx={{
                                    color: theme.palette.secondary.main,
                                    mr: 1,
                                    fontSize: { xs: '1.5rem', sm: '2rem' }
                                }} />
                                <Typography variant="h6" sx={{
                                    color: theme.palette.secondary.main,
                                    fontWeight: 700,
                                    fontSize: { xs: '1.25rem', sm: '1.5rem' }
                                }}>
                                    {stats.bestStreak}
                                </Typography>
                            </Box>
                            <Typography variant="body2" sx={{
                                color: theme.palette.text.primary,
                                fontSize: { xs: '0.75rem', sm: '0.875rem' }
                            }}>Best Streak</Typography>
                        </Box>
                    </Box>
                </Box>
            )}

            <Divider sx={{my: 3}}/>

            <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{
                    mb: 2,
                    color: theme.palette.text.primary,
                    fontWeight: 600,
                    fontSize: { xs: '1rem', sm: '1.25rem' }
                }}>
                    Total Games: <strong style={{ color: theme.palette.info.main }}>{totalGames}</strong>
                </Typography>
                <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" sx={{
                            color: theme.palette.success.main,
                            fontSize: { xs: '0.75rem', sm: '0.875rem' }
                        }}>Win Rate</Typography>
                        <Typography variant="body2" sx={{
                            color: theme.palette.success.main,
                            fontWeight: 600,
                            fontSize: { xs: '0.75rem', sm: '0.875rem' }
                        }}>
                            {winRate}%
                        </Typography>
                    </Box>
                    <LinearProgress
                        variant="determinate"
                        value={winRate}
                        color={getWinRateColor(winRate) as any}
                        sx={{ height: { xs: 6, sm: 8 }, borderRadius: 4 }}
                    />
                </Box>
                <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" sx={{
                            color: theme.palette.error.main,
                            fontSize: { xs: '0.75rem', sm: '0.875rem' }
                        }}>Loss Rate</Typography>
                        <Typography variant="body2" sx={{
                            color: theme.palette.error.main,
                            fontWeight: 600,
                            fontSize: { xs: '0.75rem', sm: '0.875rem' }
                        }}>
                            {lossRate}%
                        </Typography>
                    </Box>
                    <LinearProgress
                        variant="determinate"
                        value={lossRate}
                        color="error"
                        sx={{ height: { xs: 6, sm: 8 }, borderRadius: 4 }}
                    />
                </Box>
                <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" sx={{
                            color: theme.palette.grey[500],
                            fontSize: { xs: '0.75rem', sm: '0.875rem' }
                        }}>Draw Rate</Typography>
                        <Typography variant="body2" sx={{
                            color: theme.palette.grey[500],
                            fontWeight: 600,
                            fontSize: { xs: '0.75rem', sm: '0.875rem' }
                        }}>
                            {drawRate}%
                        </Typography>
                    </Box>
                    <LinearProgress
                        variant="determinate"
                        value={drawRate}
                        color="inherit"
                        sx={{ height: { xs: 6, sm: 8 }, borderRadius: 4 }}
                    />
                </Box>
            </Box>

            <Box sx={{textAlign: 'center'}}>
                <Button
                    variant="outlined"
                    startIcon={<RefreshIcon/>}
                    onClick={onResetStats}
                    sx={{
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 600,
                        px: { xs: 2, sm: 3 },
                        py: { xs: 1, sm: 1.5 },
                        fontSize: { xs: '0.875rem', sm: '1rem' }
                    }}
                >
                    Reset Statistics
                </Button>
            </Box>
        </Paper>
    );
};

export default StatsPanel;
