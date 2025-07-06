import React, { useState } from 'react';
import { Button, Typography, Box, IconButton, useTheme, Paper } from '@mui/material';
import AddToHomeScreenIcon from '@mui/icons-material/AddToHomeScreen';
import CloseIcon from '@mui/icons-material/Close';
import { useInstallPrompt } from '../hooks/useInstallPrompt';
import { useTranslation } from 'react-i18next';

const InstallPrompt: React.FC = () => {
  const { isInstallable, installApp } = useInstallPrompt();
  const [isVisible, setIsVisible] = useState(true);
  const theme = useTheme();
  const { t } = useTranslation();

  if (!isInstallable || !isVisible) return null;

  const handleInstall = async () => {
    const success = await installApp();
    if (success) setIsVisible(false);
  };

  const handleDismiss = () => setIsVisible(false);

  return (
    <Paper
      elevation={8}
      sx={{
        position: 'fixed',
        right: { xs: 16, sm: 32 },
        bottom: { xs: 80, sm: 40 },
        zIndex: 1400,
        minWidth: 280,
        maxWidth: 340,
        p: 2.5,
        borderRadius: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 1.5,
        background: theme.palette.mode === 'dark'
          ? 'rgba(40, 48, 72, 0.85)'
          : 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(12px)',
        boxShadow: theme.shadows[16],
        border: `1.5px solid ${theme.palette.divider}`,
        transition: 'background 0.3s',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <AddToHomeScreenIcon color="primary" sx={{ fontSize: 28, mr: 1 }} />
        <Typography variant="subtitle1" fontWeight={700} flexGrow={1}>
          {t('installPrompt.title')}
        </Typography>
        <IconButton size="small" onClick={handleDismiss} sx={{ ml: 1, color: 'text.secondary' }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
      <Typography variant="body2" sx={{ opacity: 0.85, mb: 1 }}>
        {t('installPrompt.description')}
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
        <Button
          onClick={handleInstall}
          variant="contained"
          color="primary"
          size="small"
          sx={{ flex: 1 }}
        >
          {t('installPrompt.install')}
        </Button>
        <Button
          onClick={handleDismiss}
          variant="outlined"
          color="secondary"
          size="small"
          sx={{ flex: 1 }}
        >
          {t('installPrompt.notNow')}
        </Button>
      </Box>
    </Paper>
  );
};

export default InstallPrompt;
