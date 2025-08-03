import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface PWAContextType {
  isOnline: boolean;
  isInstalled: boolean;
  isStandalone: boolean;
  canInstall: boolean;
  showInstallPrompt: boolean;
  setShowInstallPrompt: (show: boolean) => void;
  installApp: () => Promise<void>;
  dismissInstallPrompt: () => void;
  updateAvailable: boolean;
  updateApp: () => void;
}

const PWAContext = createContext<PWAContextType | undefined>(undefined);

interface PWAProviderProps {
  children: ReactNode;
}

export const PWAProvider: React.FC<PWAProviderProps> = ({ children }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [canInstall, setCanInstall] = useState(false);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    // Check if app is already installed
    const checkInstallStatus = () => {
      const standalone = window.matchMedia('(display-mode: standalone)').matches;
      setIsStandalone(standalone);
      setIsInstalled(standalone);
    };

    checkInstallStatus();

    // Online/offline status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    // Before install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setCanInstall(true);
    };

    // App installed
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsStandalone(true);
      setCanInstall(false);
      setShowInstallPrompt(false);
    };

    // Service worker update
    const handleSWUpdate = () => {
      setUpdateAvailable(true);
    };

    // Event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('sw-update', handleSWUpdate);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('sw-update', handleSWUpdate);
    };
  }, []);

  const installApp = async () => {
    if (!deferredPrompt) {
      throw new Error('Install prompt not available');
    }

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        setIsInstalled(true);
        setIsStandalone(true);
        setShowInstallPrompt(false);
      }
      
      setDeferredPrompt(null);
      setCanInstall(false);
    } catch (error) {
      console.error('Installation failed:', error);
      throw error;
    }
  };

  const dismissInstallPrompt = () => {
    setShowInstallPrompt(false);
    setDeferredPrompt(null);
    setCanInstall(false);
  };

  const updateApp = () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.waiting?.postMessage({ type: 'SKIP_WAITING' });
      });
    }
    setUpdateAvailable(false);
    window.location.reload();
  };

  const value: PWAContextType = {
    isOnline,
    isInstalled,
    isStandalone,
    canInstall,
    showInstallPrompt,
    setShowInstallPrompt,
    installApp,
    dismissInstallPrompt,
    updateAvailable,
    updateApp,
  };

  return (
    <PWAContext.Provider value={value}>
      {children}
    </PWAContext.Provider>
  );
};

export const usePWA = (): PWAContextType => {
  const context = useContext(PWAContext);
  if (context === undefined) {
    throw new Error('usePWA must be used within a PWAProvider');
  }
  return context;
}; 