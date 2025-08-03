import { motion } from 'framer-motion';
import {
  Bell,
  BellOff,
  Download,
  Settings,
  Wifi,
  WifiOff,
  X,
} from 'lucide-react';
import React, { useState } from 'react';
import { usePWA } from '../../contexts/PWAContext';

interface PWASettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

const PWASettings: React.FC<PWASettingsProps> = ({ isOpen, onClose }) => {
  const { isOnline, isInstalled, canInstall, installApp } = usePWA();
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  const handleInstall = async () => {
    setIsInstalling(true);
    try {
      await installApp();
    } catch (error) {
      console.error('Installation failed:', error);
    } finally {
      setIsInstalling(false);
    }
  };

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      setNotificationsEnabled(permission === 'granted');
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full p-6"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
            <Settings className="w-5 h-5 mr-2" />
            PWA Settings
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Installation Status */}
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center">
              <Download className="w-5 h-5 text-blue-500 mr-3" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  App Installation
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {isInstalled ? 'Installed' : 'Not installed'}
                </p>
              </div>
            </div>
            {canInstall && !isInstalled && (
              <button
                onClick={handleInstall}
                disabled={isInstalling}
                className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-600 disabled:opacity-50"
              >
                {isInstalling ? 'Installing...' : 'Install'}
              </button>
            )}
          </div>

          {/* Online Status */}
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center">
              {isOnline ? (
                <Wifi className="w-5 h-5 text-green-500 mr-3" />
              ) : (
                <WifiOff className="w-5 h-5 text-red-500 mr-3" />
              )}
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  Connection Status
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {isOnline ? 'Online' : 'Offline'}
                </p>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center">
              {notificationsEnabled ? (
                <Bell className="w-5 h-5 text-green-500 mr-3" />
              ) : (
                <BellOff className="w-5 h-5 text-gray-400 mr-3" />
              )}
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  Push Notifications
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {notificationsEnabled ? 'Enabled' : 'Disabled'}
                </p>
              </div>
            </div>
            <button
              onClick={requestNotificationPermission}
              className="text-blue-500 hover:text-blue-600 text-sm font-medium"
            >
              {notificationsEnabled ? 'Manage' : 'Enable'}
            </button>
          </div>

          {/* PWA Features Info */}
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
              PWA Features
            </h3>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <li>• Offline access to courses</li>
              <li>• Push notifications</li>
              <li>• App-like experience</li>
              <li>• Background sync</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="w-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PWASettings;
