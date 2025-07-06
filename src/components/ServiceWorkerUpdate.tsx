import React from 'react';
import { useServiceWorker } from '../hooks/useServiceWorker';
import { useTranslation } from 'react-i18next';

const ServiceWorkerUpdate: React.FC = () => {
  const { isUpdated, updateServiceWorker } = useServiceWorker();
  const { t } = useTranslation();

  if (!isUpdated) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 z-50">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-lg shadow-lg border border-blue-400">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold mb-1">{t('serviceWorkerUpdate.updateAvailable')}</h3>
            <p className="text-xs opacity-90 mb-3">
              {t('serviceWorkerUpdate.updateMessage')}
            </p>
            <div className="flex space-x-2">
              <button
                onClick={updateServiceWorker}
                className="bg-white text-blue-600 px-3 py-1.5 rounded text-xs font-medium hover:bg-gray-100 transition-colors"
              >
                {t('serviceWorkerUpdate.updateNow')}
              </button>
              <button
                onClick={() => window.location.reload()}
                className="bg-transparent border border-white text-white px-3 py-1.5 rounded text-xs font-medium hover:bg-white hover:text-blue-600 transition-colors"
              >
                {t('serviceWorkerUpdate.reload')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceWorkerUpdate;
