import React, { useState, useEffect } from 'react';
import { Paper, Typography, Box, useTheme, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useOffline } from '../hooks/useOffline';
import { useTranslation } from 'react-i18next';

const OfflineIndicator: React.FC = () => {
  const isOffline = useOffline();
  const theme = useTheme();
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOffline) setVisible(true);
  }, [isOffline]);

  if (!isOffline || !visible) return null;

  return (
    <Paper
      elevation={8}
      sx={{
        position: 'fixed',
        left: { xs: 16, sm: 32 },
        top: { xs: 80, sm: 40 },
        zIndex: 1400,
        minWidth: 280,
        maxWidth: 340,
        p: 2.5,
        borderRadius: 3,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 1.5,
        background: theme.palette.mode === 'dark'
          ? 'rgba(244, 67, 54, 0.85)'
          : 'rgba(255, 235, 238, 0.95)',
        backdropFilter: 'blur(12px)',
        boxShadow: theme.shadows[16],
        border: `1.5px solid ${theme.palette.error.main}`,
        color: theme.palette.mode === 'dark' ? '#fff' : theme.palette.error.main,
        transition: 'background 0.3s',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <svg width={24} height={24} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
        </svg>
      </Box>
      <Typography variant="body2" fontWeight={600} sx={{ opacity: 0.95, flex: 1 }}>
        {t('offline.message')}
      </Typography>
      <IconButton size="small" onClick={() => setVisible(false)} sx={{ color: 'inherit', ml: 1 }}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </Paper>
  );
};

export default OfflineIndicator;
