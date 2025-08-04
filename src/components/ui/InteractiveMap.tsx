import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPinIcon, UsersIcon, GlobeAltIcon, SparklesIcon } from '@heroicons/react/24/outline';

interface UserLocation {
  id: string;
  city: string;
  country: string;
  coordinates: [number, number];
  userCount: number;
  lastActive: string;
  color: string;
}

const userLocations: UserLocation[] = [
  {
    id: 'sf',
    city: 'San Francisco',
    country: 'USA',
    coordinates: [37.7749, -122.4194],
    userCount: 15420,
    lastActive: '2 min ago',
    color: 'bg-blue-500',
  },
  {
    id: 'ny',
    city: 'New York',
    country: 'USA',
    coordinates: [40.7128, -74.006],
    userCount: 12340,
    lastActive: '1 min ago',
    color: 'bg-green-500',
  },
  {
    id: 'london',
    city: 'London',
    country: 'UK',
    coordinates: [51.5074, -0.1278],
    userCount: 9870,
    lastActive: '3 min ago',
    color: 'bg-purple-500',
  },
  {
    id: 'berlin',
    city: 'Berlin',
    country: 'Germany',
    coordinates: [52.52, 13.405],
    userCount: 7650,
    lastActive: '5 min ago',
    color: 'bg-yellow-500',
  },
  {
    id: 'tokyo',
    city: 'Tokyo',
    country: 'Japan',
    coordinates: [35.6762, 139.6503],
    userCount: 11230,
    lastActive: '1 min ago',
    color: 'bg-red-500',
  },
  {
    id: 'sydney',
    city: 'Sydney',
    country: 'Australia',
    coordinates: [-33.8688, 151.2093],
    userCount: 5430,
    lastActive: '4 min ago',
    color: 'bg-indigo-500',
  },
  {
    id: 'mumbai',
    city: 'Mumbai',
    country: 'India',
    coordinates: [19.076, 72.8777],
    userCount: 8760,
    lastActive: '2 min ago',
    color: 'bg-pink-500',
  },
  {
    id: 'sao',
    city: 'São Paulo',
    country: 'Brazil',
    coordinates: [-23.5505, -46.6333],
    userCount: 4320,
    lastActive: '6 min ago',
    color: 'bg-orange-500',
  },
];

const InteractiveMap: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<UserLocation | null>(null);
  const [activeUsers, setActiveUsers] = useState(0);
  const [totalCountries, setTotalCountries] = useState(0);

  // Simulate live user activity
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveUsers(prev => prev + Math.floor(Math.random() * 50));
      setTotalCountries(prev => Math.min(prev + Math.floor(Math.random() * 2), 150));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Convert coordinates to CSS positioning (simplified world map)
  const getPosition = (lat: number, lng: number) => {
    // Simple conversion for demo purposes
    const x = ((lng + 180) / 360) * 100;
    const y = ((90 - lat) / 180) * 100;
    return { left: `${x}%`, top: `${y}%` };
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <GlobeAltIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Live Global Map</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Real-time user activity</p>
          </div>
        </div>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-1">
            <UsersIcon className="w-4 h-4 text-green-500" />
            <span className="text-gray-600 dark:text-gray-300">{activeUsers.toLocaleString()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <GlobeAltIcon className="w-4 h-4 text-blue-500" />
            <span className="text-gray-600 dark:text-gray-300">{totalCountries} countries</span>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-700 dark:to-gray-800 rounded-xl p-4 h-80 mb-4 overflow-hidden">
        {/* World Map Background (simplified) */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-gradient-to-br from-blue-200 to-indigo-300 dark:from-gray-600 dark:to-gray-700 rounded-lg"></div>
        </div>

        {/* Animated Connection Lines */}
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
          <defs>
            <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          {userLocations.slice(0, 3).map((location, index) => {
            const nextLocation = userLocations[index + 1];
            if (!nextLocation) return null;
            
            const start = getPosition(location.coordinates[0], location.coordinates[1]);
            const end = getPosition(nextLocation.coordinates[0], nextLocation.coordinates[1]);
            
            return (
              <motion.line
                key={`connection-${location.id}`}
                x1={`${parseFloat(start.left)}%`}
                y1={`${parseFloat(start.top)}%`}
                x2={`${parseFloat(end.left)}%`}
                y2={`${parseFloat(end.top)}%`}
                stroke="url(#connectionGradient)"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: index * 0.5 }}
              />
            );
          })}
        </svg>

        {/* Location Markers */}
        {userLocations.map((location, index) => {
          const position = getPosition(location.coordinates[0], location.coordinates[1]);
          
          return (
            <motion.div
              key={location.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              style={{ left: position.left, top: position.top, zIndex: 2 }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              whileHover={{ scale: 1.2 }}
              onClick={() => setSelectedLocation(location)}
            >
              {/* Pulse Animation */}
              <motion.div
                className={`absolute inset-0 ${location.color} rounded-full opacity-30`}
                animate={{ scale: [1, 2, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              {/* Main Marker */}
              <div className={`relative w-4 h-4 ${location.color} rounded-full shadow-lg border-2 border-white dark:border-gray-800`}>
                <div className="absolute inset-0 bg-white dark:bg-gray-800 rounded-full scale-50"></div>
              </div>
              
              {/* User Count Badge */}
              <motion.div
                className="absolute -top-2 -right-2 bg-white dark:bg-gray-800 text-xs font-semibold text-gray-700 dark:text-gray-300 px-1.5 py-0.5 rounded-full shadow-md border border-gray-200 dark:border-gray-600"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.2 + 0.5 }}
              >
                {(location.userCount / 1000).toFixed(1)}k
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Location Details */}
      <AnimatePresence>
        {selectedLocation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-800 rounded-xl p-4 border border-blue-200 dark:border-gray-600"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 ${selectedLocation.color} rounded-full flex items-center justify-center`}>
                  <MapPinIcon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {selectedLocation.city}, {selectedLocation.country}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {selectedLocation.userCount.toLocaleString()} active learners
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 dark:text-gray-400">Last active</p>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {selectedLocation.lastActive}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats Footer */}
      <div className="mt-4 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <div className="flex items-center space-x-2">
          <SparklesIcon className="w-3 h-3" />
          <span>Live data updates every 3 seconds</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Real-time</span>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap; 