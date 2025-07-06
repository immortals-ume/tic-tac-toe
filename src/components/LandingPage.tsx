import React from 'react';
import { Button, Typography, Box, Paper, useTheme } from '@mui/material';
import { GameMode } from '../constants/gameConstants';
import { useTranslation } from 'react-i18next';

export interface LandingProps {
    onSelectMode: (mode: GameMode) => void;
}

const LandingPage: React.FC<LandingProps> = ({ onSelectMode }) => {
    const theme = useTheme();
    const { t } = useTranslation();

    return (
        <Box sx={{
            minHeight: '70vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: theme.palette.background.default,
            transition: 'background 0.4s',
        }}>
            <Paper elevation={4} sx={{
                px: { xs: 3, sm: 6 },
                py: { xs: 4, sm: 5 },
                borderRadius: 5,
                minWidth: 320,
                maxWidth: 380,
                textAlign: 'center',
                background: theme.palette.mode === 'dark'
                    ? 'linear-gradient(135deg, #374151 0%, #4b5563 100%)'
                    : '#fff',
                boxShadow: theme.palette.mode === 'dark'
                    ? '0 8px 32px 0 rgba(31, 38, 135, 0.15)'
                    : '0 4px 24px 0 rgba(100, 150, 255, 0.08)',
                border: theme.palette.mode === 'dark'
                    ? '1.5px solid #4b5563'
                    : '2.5px solid #e3f0ff',
                position: 'relative',
            }}>
                {/* Pastel accent dot */}
                <Box sx={{
                    width: 18,
                    height: 18,
                    borderRadius: '50%',
                    background: theme.palette.mode === 'dark' ? '#667eea' : '#aee1fb',
                    position: 'absolute',
                    top: 18,
                    left: 24,
                    boxShadow: '0 2px 8px 0 rgba(100, 150, 255, 0.10)'
                }} />
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{ fontWeight: 700, mb: 2 }}
                >
                    {t('landing.title')}
                </Typography>
                <Typography
                    variant="subtitle1"
                    sx={{ mb: 3, color: theme.palette.text.secondary }}
                >
                    {t('landing.subtitle')}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Button
                        variant="contained"
                        size="medium"
                        color="primary"
                        onClick={() => onSelectMode(GameMode.SINGLE)}
                        sx={{
                            fontWeight: 600,
                            borderRadius: 99,
                            boxShadow: '0 2px 8px 0 rgba(100, 150, 255, 0.10)',
                            transition: 'background 0.2s, box-shadow 0.2s',
                            '&:hover': {
                                background: '#e3f0ff',
                                color: theme.palette.primary.main,
                                boxShadow: '0 4px 16px 0 rgba(100, 150, 255, 0.15)',
                            }
                        }}
                    >
                        {t('landing.singlePlayer')}
                    </Button>
                    <Button
                        variant="contained"
                        size="medium"
                        color="primary"
                        onClick={() => onSelectMode(GameMode.MULTI)}
                        sx={{
                            fontWeight: 600,
                            borderRadius: 99,
                            boxShadow: '0 2px 8px 0 rgba(100, 150, 255, 0.10)',
                            transition: 'background 0.2s, box-shadow 0.2s',
                            '&:hover': {
                                background: '#e3f0ff',
                                color: theme.palette.primary.main,
                                boxShadow: '0 4px 16px 0 rgba(100, 150, 255, 0.15)',
                            }
                        }}
                    >
                        {t('landing.multiPlayer')}
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default LandingPage;
