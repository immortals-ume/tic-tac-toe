import {AppBar, Toolbar, Typography, IconButton, Box, Tooltip, Fade} from '@mui/material';
import {ColorModeContext} from '../theme/ThemeContext';
import ThemeToggle from "../theme/ThemedSwitch";
import React, {useContext, useState, useEffect} from 'react';
import {useTheme} from '@mui/material/styles';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import { isSoundMuted, setSoundMuted } from '../utils/gameUtils';
import PWASettings from './PWASettings';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';

interface HeaderProps {
    onGoToLanding?: () => void;
    showPwaSettingsIcon?: boolean;
}

const Header: React.FC<HeaderProps> = ({onGoToLanding, showPwaSettingsIcon = false}) => {
    const {toggleColorMode} = useContext(ColorModeContext);
    const theme = useTheme();
    const [soundMuted, setSoundMutedState] = useState(isSoundMuted());
    const [pwaSettingsOpen, setPwaSettingsOpen] = useState(false);
    const [showPwaSettingsIconState, setShowPwaSettingsIconState] = useState(showPwaSettingsIcon);
    const { t } = useTranslation();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
            if ((isMac ? e.metaKey : e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === 'p') {
                setShowPwaSettingsIconState(prev => !prev);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleSoundToggle = () => {
        const newMutedState = !soundMuted;
        setSoundMutedState(newMutedState);
        setSoundMuted(newMutedState);
    };

    return (
        <>
            <AppBar
                position="static"
                elevation={0}
                sx={{
                    background: theme.palette.mode === 'dark'
                        ? 'linear-gradient(135deg, rgba(44, 62, 80, 0.95) 0%, rgba(52, 73, 94, 0.95) 100%)'
                        : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(245, 247, 250, 0.95) 100%)',
                    backdropFilter: 'blur(10px)',
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    transition: 'all 0.3s ease'
                }}
            >
                <Toolbar sx={{justifyContent: 'space-between', py: 1}}>
                    <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                        <Typography
                            variant="h5"
                            component="div"
                            sx={{
                                cursor: 'pointer',
                                fontWeight: 800,
                                background: theme.palette.mode === 'dark'
                                    ? 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)'
                                    : 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    opacity: 0.8,
                                    transform: 'scale(1.05)'
                                }
                            }}
                            onClick={onGoToLanding}
                        >
                            Tic Tac Toe
                        </Typography>
                        {onGoToLanding && (
                            <Fade in={true} timeout={1000}>
                                <Tooltip title={t('header.goToHome')} arrow>
                                    <IconButton
                                        onClick={onGoToLanding}
                                        sx={{
                                            color: theme.palette.primary.main,
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                transform: 'scale(1.1)',
                                                color: theme.palette.primary.dark
                                            }
                                        }}
                                    >
                                        <HomeIcon />
                                    </IconButton>
                                </Tooltip>
                            </Fade>
                        )}
                    </Box>

                    <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                        <LanguageSelector />
                        <Tooltip title={soundMuted ? t('header.unmuteSound') : t('header.muteSound')} arrow>
                            <IconButton
                                onClick={handleSoundToggle}
                                sx={{
                                    color: theme.palette.text.secondary,
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'scale(1.1)',
                                        color: theme.palette.primary.main
                                    }
                                }}
                            >
                                {soundMuted ? <VolumeOffIcon/> : <VolumeUpIcon/>}
                            </IconButton>
                        </Tooltip>
                        {showPwaSettingsIconState && (
                            <Tooltip title={t('header.pwaSettings')} arrow>
                                <IconButton
                                    onClick={() => setPwaSettingsOpen(true)}
                                    sx={{
                                        color: theme.palette.text.secondary,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            transform: 'scale(1.1)',
                                            color: theme.palette.primary.main
                                        }
                                    }}
                                >
                                    <SettingsIcon />
                                </IconButton>
                            </Tooltip>
                        )}
                        <ThemeToggle
                            darkMode={theme.palette.mode === 'dark'}
                            toggleTheme={toggleColorMode}
                        />
                    </Box>
                </Toolbar>
            </AppBar>

            <PWASettings
                open={pwaSettingsOpen}
                onClose={() => setPwaSettingsOpen(false)}
            />
        </>
    );
};

export default Header;
