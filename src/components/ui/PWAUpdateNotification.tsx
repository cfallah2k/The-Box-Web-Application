import { AnimatePresence, motion } from 'framer-motion';
import { RefreshCw, X } from 'lucide-react';
import React from 'react';
import { usePWA } from '../../contexts/PWAContext';

const PWAUpdateNotification: React.FC = () => {
  const { updateAvailable, updateApp } = usePWA();

  if (!updateAvailable) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className="fixed top-4 left-4 right-4 z-50 bg-blue-500 text-white rounded-lg shadow-lg p-4 max-w-md mx-auto"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <RefreshCw className="w-5 h-5 animate-spin" />
            <div>
              <h3 className="font-semibold text-sm">Update Available</h3>
              <p className="text-xs opacity-90">
                A new version of The Box is ready to install
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={updateApp}
              className="bg-white text-blue-500 px-3 py-1 rounded text-xs font-medium hover:bg-blue-50 transition-colors"
            >
              Update
            </button>
            <button className="text-white/70 hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PWAUpdateNotification;
