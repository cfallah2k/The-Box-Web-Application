import { Activity, Clock, HardDrive, Zap } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { usePWA } from '../../contexts/PWAContext';

interface PerformanceMetrics {
  loadTime: number;
  cacheSize: number;
  offlineCapability: boolean;
  networkSpeed: string;
}

const PWAPerformance: React.FC = () => {
  const { isOnline } = usePWA();
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    loadTime: 0,
    cacheSize: 0,
    offlineCapability: true,
    networkSpeed: 'Unknown',
  });

  useEffect(() => {
    // Measure page load time
    const loadTime = performance.now();
    setMetrics(prev => ({ ...prev, loadTime }));

    // Check cache size (if available)
    if ('caches' in window) {
      caches.keys().then(cacheNames => {
        let totalSize = 0;
        cacheNames.forEach(cacheName => {
          caches.open(cacheName).then(cache => {
            cache.keys().then(requests => {
              totalSize += requests.length;
              setMetrics(prev => ({ ...prev, cacheSize: totalSize }));
            });
          });
        });
      });
    }

    // Check network speed
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      if (connection) {
        setMetrics(prev => ({
          ...prev,
          networkSpeed: connection.effectiveType || 'Unknown',
        }));
      }
    }
  }, []);

  const getPerformanceColor = (value: number) => {
    if (value < 1000) return 'text-green-500';
    if (value < 3000) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-4">
        <Activity className="w-5 h-5 text-blue-500 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          PWA Performance
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Load Time */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
          <div className="flex items-center mb-2">
            <Clock className="w-4 h-4 text-gray-500 mr-2" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Load Time
            </span>
          </div>
          <p
            className={`text-lg font-bold ${getPerformanceColor(
              metrics.loadTime
            )}`}
          >
            {metrics.loadTime.toFixed(0)}ms
          </p>
        </div>

        {/* Cache Size */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
          <div className="flex items-center mb-2">
            <HardDrive className="w-4 h-4 text-gray-500 mr-2" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Cache Size
            </span>
          </div>
          <p className="text-lg font-bold text-blue-500">
            {metrics.cacheSize} items
          </p>
        </div>

        {/* Network Speed */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
          <div className="flex items-center mb-2">
            <Zap className="w-4 h-4 text-gray-500 mr-2" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Network
            </span>
          </div>
          <p className="text-lg font-bold text-green-500">
            {metrics.networkSpeed}
          </p>
        </div>

        {/* Offline Capability */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
          <div className="flex items-center mb-2">
            <div
              className={`w-4 h-4 rounded-full mr-2 ${
                isOnline ? 'bg-green-500' : 'bg-red-500'
              }`}
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Status
            </span>
          </div>
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            {isOnline ? 'Online' : 'Offline'}
          </p>
        </div>
      </div>

      {/* Performance Tips */}
      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
          Performance Tips
        </h4>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>• Keep the app updated for best performance</li>
          <li>• Use offline mode when connection is slow</li>
          <li>• Clear cache if experiencing issues</li>
        </ul>
      </div>
    </div>
  );
};

export default PWAPerformance;
