import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Alert,
  LinearProgress
} from '@mui/material';
import { useServiceWorker } from '../hooks/useServiceWorker';
import { useOffline } from '../hooks/useOffline';
import {
  getCacheSize,
  clearAllCaches,
  formatBytes
} from '../utils/serviceWorkerUtils';
import { useTranslation } from 'react-i18next';

interface PWASettingsProps {
  open: boolean;
  onClose: () => void;
}

const PWASettings: React.FC<PWASettingsProps> = ({ open, onClose }) => {
  const { isSupported, isRegistered, isInstalled, updateServiceWorker, unregisterServiceWorker } = useServiceWorker();
  const isOffline = useOffline();
  const [cacheSize, setCacheSize] = useState<number>(0);
  const [isClearingCache, setIsClearingCache] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (open) {
      loadCacheSize();
    }
  }, [open]);

  const loadCacheSize = async () => {
    const size = await getCacheSize();
    setCacheSize(size);
  };

  const handleClearCache = async () => {
    setIsClearingCache(true);
    try {
      await clearAllCaches();
      await loadCacheSize();
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Error clearing cache:', error);
    } finally {
      setIsClearingCache(false);
    }
  };

  const handleUnregisterSW = async () => {
    try {
      await unregisterServiceWorker();
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Error unregistering service worker:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h6" component="div">
          {t('pwaSettings.title')}
        </Typography>
      </DialogTitle>

      <DialogContent>
        {showSuccess && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {t('pwaSettings.operationSuccess')}
          </Alert>
        )}

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            {t('pwaSettings.swStatus')}
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography>{t('pwaSettings.supported')}:</Typography>
            <Typography color={isSupported ? 'success.main' : 'error.main'}>
              {isSupported ? t('pwaSettings.yes') : t('pwaSettings.no')}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography>{t('pwaSettings.registered')}:</Typography>
            <Typography color={isRegistered ? 'success.main' : 'warning.main'}>
              {isRegistered ? t('pwaSettings.yes') : t('pwaSettings.no')}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography>{t('pwaSettings.installed')}:</Typography>
            <Typography color={isInstalled ? 'success.main' : 'warning.main'}>
              {isInstalled ? t('pwaSettings.yes') : t('pwaSettings.no')}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography>{t('pwaSettings.onlineStatus')}:</Typography>
            <Typography color={!isOffline ? 'success.main' : 'error.main'}>
              {isOffline ? t('pwaSettings.offline') : t('pwaSettings.online')}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            {t('pwaSettings.cacheManagement')}
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography>{t('pwaSettings.cacheSize')}:</Typography>
            <Typography>{formatBytes(cacheSize)}</Typography>
          </Box>

          {isClearingCache && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" gutterBottom>{t('pwaSettings.clearingCache')}</Typography>
              <LinearProgress />
            </Box>
          )}

          <Button
            variant="outlined"
            onClick={handleClearCache}
            disabled={isClearingCache || cacheSize === 0}
            fullWidth
            sx={{ mb: 1 }}
          >
            {t('pwaSettings.clearAllCaches')}
          </Button>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            {t('pwaSettings.swActions')}
          </Typography>

          <Button
            variant="outlined"
            onClick={updateServiceWorker}
            disabled={!isRegistered}
            fullWidth
            sx={{ mb: 1 }}
          >
            {t('pwaSettings.updateSW')}
          </Button>

          <Button
            variant="outlined"
            color="error"
            onClick={handleUnregisterSW}
            disabled={!isRegistered}
            fullWidth
          >
            {t('pwaSettings.unregisterSW')}
          </Button>
        </Box>

        <Alert severity="info">
          <Typography variant="body2">
            {t('pwaSettings.info')}
          </Typography>
        </Alert>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>{t('pwaSettings.close')}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PWASettings;
