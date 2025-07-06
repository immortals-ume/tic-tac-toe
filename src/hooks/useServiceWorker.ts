import { useState, useEffect } from 'react';

interface ServiceWorkerState {
  isSupported: boolean;
  isRegistered: boolean;
  isInstalled: boolean;
  isUpdated: boolean;
  registration: ServiceWorkerRegistration | null;
}

export const useServiceWorker = () => {
  const [state, setState] = useState<ServiceWorkerState>({
    isSupported: 'serviceWorker' in navigator,
    isRegistered: false,
    isInstalled: false,
    isUpdated: false,
    registration: null,
  });

  useEffect(() => {
    if (!state.isSupported) return;

    const checkServiceWorker = async () => {
      try {
        const registration = await navigator.serviceWorker.getRegistration();

        if (registration) {
          setState(prev => ({
            ...prev,
            isRegistered: true,
            registration,
          }));

          // Check if service worker is installed
          if (registration.installing) {
            registration.installing.addEventListener('statechange', (e) => {
              if ((e.target as ServiceWorker).state === 'installed') {
                setState(prev => ({
                  ...prev,
                  isInstalled: true,
                }));
              }
            });
          } else if (registration.waiting) {
            setState(prev => ({
              ...prev,
              isInstalled: true,
            }));
          }

          // Listen for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  setState(prev => ({
                    ...prev,
                    isUpdated: true,
                  }));
                }
              });
            }
          });
        }
      } catch (error) {
        console.error('Error checking service worker:', error);
      }
    };

    checkServiceWorker();
  }, [state.isSupported]);

  const updateServiceWorker = () => {
    if (state.registration && state.registration.waiting) {
      state.registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      window.location.reload();
    }
  };

  const unregisterServiceWorker = async () => {
    if (state.registration) {
      await state.registration.unregister();
      setState(prev => ({
        ...prev,
        isRegistered: false,
        isInstalled: false,
        isUpdated: false,
        registration: null,
      }));
    }
  };

  return {
    ...state,
    updateServiceWorker,
    unregisterServiceWorker,
  };
};
