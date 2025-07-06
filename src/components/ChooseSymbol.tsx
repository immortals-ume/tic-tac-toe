import React, { useState } from 'react';
import { Box, Button, Typography, Paper, useTheme, Container, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { PlayerSymbol, GameMode, AIDifficulty } from '../constants/gameConstants';
import { useTranslation } from 'react-i18next';

export interface ChooseSymbolProps {
    onChooseSymbol: (symbol: PlayerSymbol, difficulty?: AIDifficulty) => void;
    onBack: () => void;
    gameMode: GameMode;
}

const ChooseSymbol: React.FC<ChooseSymbolProps> = ({ onChooseSymbol, onBack, gameMode }) => {
    const theme = useTheme();
    const { t } = useTranslation();
    const [difficulty, setDifficulty] = useState<AIDifficulty>(AIDifficulty.HARD);

    const handleDifficultyChange = (_: any, newDifficulty: AIDifficulty | null) => {
        if (newDifficulty) setDifficulty(newDifficulty);
    };

    return (
        <Container sx={{
            textAlign: 'center',
            py: { xs: 4, sm: 6, md: 10 },
            px: { xs: 2, sm: 3 }
        }}>
            <Paper
                elevation={4}
                sx={{
                    p: { xs: 3, sm: 4, md: 5 },
                    maxWidth: { xs: 320, sm: 400, md: 450 },
                    mx: 'auto',
                    borderRadius: 3,
                    background: theme.palette.mode === 'dark'
                        ? 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)'
                        : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(255,255,255,0.1)',
                        zIndex: 1
                    }
                }}
            >
                <Box sx={{ position: 'relative', zIndex: 2 }}>
                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 3, textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>
                        {gameMode === GameMode.SINGLE ? t('chooseSymbol.singleTitle') : t('chooseSymbol.multiTitle')}
                    </Typography>
                    <Typography variant="h6" sx={{ mb: 4, color: theme.palette.text.secondary }}>
                        {gameMode === GameMode.SINGLE ? t('chooseSymbol.singleDesc') : t('chooseSymbol.multiDesc')}
                    </Typography>
                    {gameMode === GameMode.SINGLE && (
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="subtitle1" sx={{ mb: 1, color: theme.palette.text.secondary }}>
                                AI Difficulty
                            </Typography>
                            <ToggleButtonGroup
                                value={difficulty}
                                exclusive
                                onChange={handleDifficultyChange}
                                color="primary"
                                size="small"
                                sx={{ background: 'rgba(255,255,255,0.12)', borderRadius: 2 }}
                            >
                                <ToggleButton value={AIDifficulty.EASY}>Easy</ToggleButton>
                                <ToggleButton value={AIDifficulty.MEDIUM}>Medium</ToggleButton>
                                <ToggleButton value={AIDifficulty.HARD}>Hard</ToggleButton>
                            </ToggleButtonGroup>
                        </Box>
                    )}
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mb: 4 }}>
                        <Button
                            variant="contained"
                            size="large"
                            color="primary"
                            onClick={() => gameMode === GameMode.SINGLE ? onChooseSymbol(PlayerSymbol.X, difficulty) : onChooseSymbol(PlayerSymbol.X)}
                            sx={{
                                fontWeight: 600,
                                py: 2,
                                px: 4,
                                fontSize: { xs: 16, sm: 18, md: 20 },
                                background: 'rgba(255,255,255,0.2)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255,255,255,0.3)',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    background: 'rgba(255,255,255,0.3)',
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
                                }
                            }}
                        >
                            X
                        </Button>
                        <Button
                            variant="contained"
                            size="large"
                            color="secondary"
                            onClick={() => gameMode === GameMode.SINGLE ? onChooseSymbol(PlayerSymbol.O, difficulty) : onChooseSymbol(PlayerSymbol.O)}
                            sx={{
                                fontWeight: 600,
                                py: 2,
                                px: 4,
                                fontSize: { xs: 16, sm: 18, md: 20 },
                                background: 'rgba(255,255,255,0.2)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255,255,255,0.3)',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    background: 'rgba(255,255,255,0.3)',
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
                                }
                            }}
                        >
                            O
                        </Button>
                    </Box>
                    <Button variant="outlined" color="inherit" onClick={onBack} sx={{ mt: 2 }}>
                        ← Back
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default ChooseSymbol;
