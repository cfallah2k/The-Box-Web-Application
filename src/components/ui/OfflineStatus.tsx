import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { usePWA } from '../../contexts/PWAContext';

const OfflineStatus: React.FC = () => {
  const { isOnline, updateAvailable, updateApp } = usePWA();

  if (isOnline && !updateAvailable) return null;

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-0 left-0 right-0 z-50 bg-yellow-500 text-white px-4 py-2 text-center"
        >
          <div className="flex items-center justify-center space-x-2">
            <WifiOff className="w-4 h-4" />
            <span className="text-sm font-medium">
              You're offline. Some features may be limited.
            </span>
          </div>
        </motion.div>
      )}

      {updateAvailable && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-0 left-0 right-0 z-50 bg-blue-500 text-white px-4 py-2"
        >
          <div className="flex items-center justify-between max-w-md mx-auto">
            <div className="flex items-center space-x-2">
              <RefreshCw className="w-4 h-4" />
              <span className="text-sm font-medium">
                New version available
              </span>
            </div>
            <button
              onClick={updateApp}
              className="text-sm font-medium hover:text-blue-100 transition-colors"
            >
              Update
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OfflineStatus; 