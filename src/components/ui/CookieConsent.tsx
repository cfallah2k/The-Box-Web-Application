import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheckIcon,
  CogIcon,
  XMarkIcon,
  CheckIcon,
  InformationCircleIcon,
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
  GlobeAltIcon,
  ChartBarIcon,
  UserIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { useTheme } from '@/contexts/ThemeContext';

interface CookieConsentProps {
  isVisible: boolean;
  onAccept: (preferences: CookiePreferences) => void;
  onDecline: () => void;
  onCustomize: () => void;
}

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  personalization: boolean;
  social: boolean;
}

const CookieConsent: React.FC<CookieConsentProps> = ({
  isVisible,
  onAccept,
  onDecline,
  onCustomize
}) => {
  const { theme } = useTheme();
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    marketing: false,
    personalization: false,
    social: false
  });

  const cookieTypes = [
    {
      id: 'essential',
      name: 'Essential Cookies',
      description: 'Required for the website to function properly. Cannot be disabled.',
      icon: ShieldCheckIcon,
      color: 'text-green-500',
      required: true
    },
    {
      id: 'analytics',
      name: 'Analytics Cookies',
      description: 'Help us understand how visitors interact with our website.',
      icon: ChartBarIcon,
      color: 'text-blue-500',
      required: false
    },
    {
      id: 'marketing',
      name: 'Marketing Cookies',
      description: 'Used to deliver personalized advertisements and track campaign performance.',
      icon: SparklesIcon,
      color: 'text-purple-500',
      required: false
    },
    {
      id: 'personalization',
      name: 'Personalization Cookies',
      description: 'Remember your preferences and provide personalized content.',
      icon: UserIcon,
      color: 'text-orange-500',
      required: false
    },
    {
      id: 'social',
      name: 'Social Media Cookies',
      description: 'Enable social media sharing and integration features.',
      icon: GlobeAltIcon,
      color: 'text-pink-500',
      required: false
    }
  ];

  const handleAcceptAll = () => {
    const allPreferences = {
      essential: true,
      analytics: true,
      marketing: true,
      personalization: true,
      social: true
    };
    onAccept(allPreferences);
  };

  const handleAcceptSelected = () => {
    onAccept(preferences);
  };

  const handleTogglePreference = (id: keyof CookiePreferences) => {
    if (id === 'essential') return; // Essential cookies cannot be disabled
    setPreferences(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4"
        >
          <div className="max-w-4xl mx-auto">
            <div className="card border-2 border-primary-200 dark:border-primary-800 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 backdrop-blur-lg">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                      <ShieldCheckIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        🍪 Cookie Preferences
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        We use cookies to enhance your experience and analyze site usage.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onDecline}
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>

                {/* Main Content */}
                <div className="mb-6">
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    We respect your privacy and want to give you control over your data. Choose which types of cookies you'd like us to use:
                  </p>

                  {/* Cookie Types */}
                  <div className="space-y-3 mb-4">
                    {cookieTypes.map((cookieType) => (
                      <div
                        key={cookieType.id}
                        className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                      >
                        <div className="flex items-center space-x-3">
                          <cookieType.icon className={`w-5 h-5 ${cookieType.color}`} />
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                              {cookieType.name}
                            </h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              {cookieType.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {cookieType.required ? (
                            <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                              Required
                            </span>
                          ) : (
                            <button
                              onClick={() => handleTogglePreference(cookieType.id as keyof CookiePreferences)}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                preferences[cookieType.id as keyof CookiePreferences]
                                  ? 'bg-primary-600'
                                  : 'bg-gray-200 dark:bg-gray-700'
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                                  preferences[cookieType.id as keyof CookiePreferences]
                                    ? 'translate-x-6'
                                    : 'translate-x-1'
                                }`}
                              />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Privacy Notice */}
                  <div className="flex items-start space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <InformationCircleIcon className="w-5 h-5 text-blue-500 mt-0.5" />
                    <div className="text-sm text-blue-800 dark:text-blue-200">
                      <p className="font-medium mb-1">Your Privacy Matters</p>
                      <p>
                        We only use cookies to improve your experience and never sell your data. 
                        You can change these settings anytime in your{' '}
                        <button
                          onClick={onCustomize}
                          className="underline hover:no-underline font-medium"
                        >
                          privacy settings
                        </button>.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleAcceptAll}
                    className="btn btn-primary flex-1"
                  >
                    <CheckIcon className="w-4 h-4 mr-2" />
                    Accept All Cookies
                  </button>
                  <button
                    onClick={handleAcceptSelected}
                    className="btn btn-outline flex-1"
                  >
                    <CogIcon className="w-4 h-4 mr-2" />
                    Accept Selected
                  </button>
                  <button
                    onClick={onDecline}
                    className="btn btn-outline flex-1"
                  >
                    <XMarkIcon className="w-4 h-4 mr-2" />
                    Decline All
                  </button>
                </div>

                {/* Learn More Link */}
                <div className="mt-4 text-center">
                  <button
                    onClick={onCustomize}
                    className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
                  >
                    Learn more about our cookie policy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent; 