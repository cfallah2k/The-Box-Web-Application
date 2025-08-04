import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BellIcon,
  BellSlashIcon,
  CogIcon,
  WifiIcon,

  CloudArrowUpIcon,
  CloudArrowDownIcon,
  TrashIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XMarkIcon,
  SparklesIcon,
  ShieldCheckIcon,
  ClockIcon,
  DevicePhoneMobileIcon,
} from '@heroicons/react/24/outline';
import notificationService from '../../services/notificationService';
import offlineService, { CacheStatus } from '../../services/offlineService';

interface NotificationSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationSettings: React.FC<NotificationSettingsProps> = ({ isOpen, onClose }) => {
  const [permissionStatus, setPermissionStatus] = useState<NotificationPermission>('default');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [cacheStatus, setCacheStatus] = useState<CacheStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState({
    courseReminders: true,
    achievementNotifications: true,
    newCourseAlerts: true,
    streakReminders: true,
    aiTutorAlerts: true,
    offlineSync: true,
    autoCache: true,
    backgroundSync: true,
  });

  useEffect(() => {
    if (isOpen) {
      loadSettings();
    }
  }, [isOpen]);

  const loadSettings = async () => {
    setIsLoading(true);
    try {
      // Initialize services
      await notificationService.initialize();
      await offlineService.initialize();

      // Get permission status
      setPermissionStatus(notificationService.getPermissionStatus());

      // Get cache status
      const status = await offlineService.getCacheStatus();
      setCacheStatus(status);

      // Load saved settings from localStorage
      const savedSettings = localStorage.getItem('notificationSettings');
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePermissionRequest = async () => {
    setIsLoading(true);
    try {
      const permission = await notificationService.requestPermission();
      setPermissionStatus(permission);
      
      if (permission === 'granted') {
        await notificationService.subscribeToPush();
        setIsSubscribed(true);
      }
    } catch (error) {
      console.error('Failed to request permission:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSettingChange = (key: keyof typeof settings) => {
    const newSettings = { ...settings, [key]: !settings[key] };
    setSettings(newSettings);
    localStorage.setItem('notificationSettings', JSON.stringify(newSettings));
  };

  const handleClearCache = async () => {
    if (!cacheStatus) return;

    setIsLoading(true);
    try {
      const cachedCourses = await offlineService.getAllCachedCourses();
      for (const course of cachedCourses) {
        await offlineService.removeCachedCourse(course.id);
      }
      await loadSettings();
    } catch (error) {
      console.error('Failed to clear cache:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSyncNow = async () => {
    setIsLoading(true);
    try {
      await offlineService.syncWhenOnline();
      await loadSettings();
    } catch (error) {
      console.error('Failed to sync:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getPermissionStatusColor = () => {
    switch (permissionStatus) {
      case 'granted':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'denied':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default:
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
    }
  };

  const getPermissionStatusIcon = () => {
    switch (permissionStatus) {
      case 'granted':
        return <CheckCircleIcon className="w-5 h-5" />;
      case 'denied':
        return <ExclamationTriangleIcon className="w-5 h-5" />;
      default:
        return <InformationCircleIcon className="w-5 h-5" />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <CogIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Notification Settings
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Manage your notifications and offline preferences
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                <>
                  {/* Permission Status */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Push Notifications
                    </h3>
                    
                    <div className={`p-4 rounded-xl border ${getPermissionStatusColor()}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {getPermissionStatusIcon()}
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              Permission Status
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {permissionStatus === 'granted' && 'Notifications enabled'}
                              {permissionStatus === 'denied' && 'Notifications blocked'}
                              {permissionStatus === 'default' && 'Permission not requested'}
                            </p>
                          </div>
                        </div>
                        {permissionStatus !== 'granted' && (
                          <button
                            onClick={handlePermissionRequest}
                            disabled={isLoading}
                            className="btn-primary text-sm"
                          >
                            Enable Notifications
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Notification Types */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Notification Types
                    </h3>
                    
                    <div className="space-y-3">
                      {Object.entries({
                        courseReminders: 'Course Reminders',
                        achievementNotifications: 'Achievement Notifications',
                        newCourseAlerts: 'New Course Alerts',
                        streakReminders: 'Streak Reminders',
                        aiTutorAlerts: 'AI Tutor Alerts',
                      }).map(([key, label]) => (
                        <div key={key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                          <div className="flex items-center space-x-3">
                            <BellIcon className="w-5 h-5 text-gray-500" />
                            <span className="text-gray-900 dark:text-white">{label}</span>
                          </div>
                          <button
                            onClick={() => handleSettingChange(key as keyof typeof settings)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              settings[key as keyof typeof settings]
                                ? 'bg-blue-500'
                                : 'bg-gray-300 dark:bg-gray-600'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                settings[key as keyof typeof settings] ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Offline Settings */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Offline Settings
                    </h3>
                    
                    <div className="space-y-3">
                      {Object.entries({
                        offlineSync: 'Auto-sync when online',
                        autoCache: 'Auto-cache courses',
                        backgroundSync: 'Background sync',
                      }).map(([key, label]) => (
                        <div key={key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                          <div className="flex items-center space-x-3">
                            <CloudArrowUpIcon className="w-5 h-5 text-gray-500" />
                            <span className="text-gray-900 dark:text-white">{label}</span>
                          </div>
                          <button
                            onClick={() => handleSettingChange(key as keyof typeof settings)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              settings[key as keyof typeof settings]
                                ? 'bg-blue-500'
                                : 'bg-gray-300 dark:bg-gray-600'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                settings[key as keyof typeof settings] ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Cache Status */}
                  {cacheStatus && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Offline Cache
                      </h3>
                      
                      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Total Cached:</span>
                            <span className="font-medium text-gray-900 dark:text-white">
                              {formatBytes(cacheStatus.totalSize)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Available Space:</span>
                            <span className="font-medium text-gray-900 dark:text-white">
                              {formatBytes(cacheStatus.availableSpace)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Cached Courses:</span>
                            <span className="font-medium text-gray-900 dark:text-white">
                              {cacheStatus.cachedCourses.length}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Last Sync:</span>
                            <span className="font-medium text-gray-900 dark:text-white">
                              {cacheStatus.lastSync.toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex space-x-2">
                          <button
                            onClick={handleSyncNow}
                            disabled={isLoading}
                            className="btn-secondary text-sm flex items-center space-x-2"
                          >
                            <CloudArrowDownIcon className="w-4 h-4" />
                            <span>Sync Now</span>
                          </button>
                          <button
                            onClick={handleClearCache}
                            disabled={isLoading}
                            className="btn-secondary text-sm flex items-center space-x-2 text-red-600 hover:text-red-700"
                          >
                            <TrashIcon className="w-4 h-4" />
                            <span>Clear Cache</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <ShieldCheckIcon className="w-4 h-4" />
                  <span>Your data is secure and private</span>
                </div>
                <button
                  onClick={onClose}
                  className="btn-primary"
                >
                  Done
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationSettings; 