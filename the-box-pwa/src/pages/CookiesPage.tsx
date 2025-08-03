import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheckIcon,
  CogIcon,
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
  GlobeAltIcon,
  ChartBarIcon,
  UserIcon,
  SparklesIcon,
  InformationCircleIcon,
  CheckIcon,
  XMarkIcon,
  ArrowRightIcon,
  DocumentTextIcon,
  ClockIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { Badge } from '@/components/ui/Badge';

interface CookieSettings {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  personalization: boolean;
  social: boolean;
}

const CookiesPage: React.FC = () => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState<'overview' | 'settings' | 'policy'>('overview');
  const [settings, setSettings] = useState<CookieSettings>({
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
      description: 'These cookies are necessary for the website to function and cannot be switched off.',
      icon: ShieldCheckIcon,
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      examples: ['Authentication', 'Security', 'Session management'],
      duration: 'Session',
      required: true
    },
    {
      id: 'analytics',
      name: 'Analytics Cookies',
      description: 'Help us understand how visitors interact with our website by collecting and reporting information.',
      icon: ChartBarIcon,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      examples: ['Page views', 'User behavior', 'Performance metrics'],
      duration: '2 years',
      required: false
    },
    {
      id: 'marketing',
      name: 'Marketing Cookies',
      description: 'Used to track visitors across websites to display relevant advertisements.',
      icon: SparklesIcon,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      examples: ['Ad targeting', 'Campaign tracking', 'Conversion analysis'],
      duration: '1 year',
      required: false
    },
    {
      id: 'personalization',
      name: 'Personalization Cookies',
      description: 'Remember your preferences and provide personalized content and features.',
      icon: UserIcon,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      examples: ['Language preferences', 'Theme settings', 'Content recommendations'],
      duration: '1 year',
      required: false
    },
    {
      id: 'social',
      name: 'Social Media Cookies',
      description: 'Enable social media sharing and integration features.',
      icon: GlobeAltIcon,
      color: 'text-pink-500',
      bgColor: 'bg-pink-50 dark:bg-pink-900/20',
      examples: ['Social sharing', 'Login with social accounts', 'Social widgets'],
      duration: '90 days',
      required: false
    }
  ];

  const handleToggleSetting = (id: keyof CookieSettings) => {
    if (id === 'essential') return; // Essential cookies cannot be disabled
    setSettings(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleSaveSettings = () => {
    // Save to localStorage
    localStorage.setItem('cookiePreferences', JSON.stringify(settings));
    addToast({
      type: 'success',
      title: 'Settings Saved',
      message: 'Your cookie preferences have been updated successfully.'
    });
  };

  const handleResetSettings = () => {
    setSettings({
      essential: true,
      analytics: false,
      marketing: false,
      personalization: false,
      social: false
    });
    addToast({
      type: 'info',
      title: 'Settings Reset',
      message: 'Cookie preferences have been reset to default values.'
    });
  };

  const getActiveCookiesCount = () => {
    return Object.values(settings).filter(Boolean).length;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                🍪 Cookie Policy & Settings
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage your privacy preferences and understand how we use cookies
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="success">
                {getActiveCookiesCount()} Active
              </Badge>
              <button
                onClick={handleSaveSettings}
                className="btn btn-primary"
              >
                <CheckIcon className="w-4 h-4 mr-2" />
                Save Settings
              </button>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            {[
              { id: 'overview', name: 'Overview', icon: InformationCircleIcon },
              { id: 'settings', name: 'Settings', icon: CogIcon },
              { id: 'policy', name: 'Policy', icon: DocumentTextIcon }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white dark:bg-gray-700 text-primary-600 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Cookie Overview */}
              <div className="card p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <ShieldCheckIcon className="w-6 h-6 text-primary-600" />
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    What Are Cookies?
                  </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Cookies are small text files that are stored on your device when you visit our website. 
                  They help us provide you with a better experience by remembering your preferences, 
                  analyzing site usage, and personalizing content.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <ShieldCheckIcon className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                    <h3 className="font-semibold text-gray-900 dark:text-white">Security</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Protect your data and ensure secure browsing</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <UserIcon className="w-8 h-8 text-green-500 mx-auto mb-2" />
                    <h3 className="font-semibold text-gray-900 dark:text-white">Personalization</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Remember your preferences and settings</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <ChartBarIcon className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                    <h3 className="font-semibold text-gray-900 dark:text-white">Analytics</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Improve our services based on usage data</p>
                  </div>
                </div>
              </div>

              {/* Cookie Types */}
              <div className="card p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Types of Cookies We Use
                </h2>
                <div className="space-y-4">
                  {cookieTypes.map((cookieType, index) => (
                    <motion.div
                      key={cookieType.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-4 rounded-lg border ${cookieType.bgColor}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <cookieType.icon className={`w-6 h-6 ${cookieType.color} mt-1`} />
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {cookieType.name}
                              </h3>
                              {cookieType.required && (
                                <Badge variant="success">Required</Badge>
                              )}
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 mb-3">
                              {cookieType.description}
                            </p>
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <ClockIcon className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                  Duration: {cookieType.duration}
                                </span>
                              </div>
                              <div>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                  Examples:
                                </span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {cookieType.examples.map((example, idx) => (
                                    <Badge key={idx} variant="outline" className="text-xs">
                                      {example}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              {/* Settings Overview */}
              <div className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Cookie Settings
                  </h2>
                  <button
                    onClick={handleResetSettings}
                    className="btn btn-outline btn-sm"
                  >
                    Reset to Default
                  </button>
                </div>
                
                <div className="space-y-4">
                  {cookieTypes.map((cookieType, index) => (
                    <motion.div
                      key={cookieType.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                    >
                      <div className="flex items-center space-x-3">
                        <cookieType.icon className={`w-6 h-6 ${cookieType.color}`} />
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {cookieType.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {cookieType.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        {cookieType.required ? (
                          <Badge variant="success">Always Active</Badge>
                        ) : (
                          <>
                            <button
                              onClick={() => handleToggleSetting(cookieType.id as keyof CookieSettings)}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                settings[cookieType.id as keyof CookieSettings]
                                  ? 'bg-primary-600'
                                  : 'bg-gray-200 dark:bg-gray-700'
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                                  settings[cookieType.id as keyof CookieSettings]
                                    ? 'translate-x-6'
                                    : 'translate-x-1'
                                }`}
                              />
                            </button>
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {settings[cookieType.id as keyof CookieSettings] ? 'Enabled' : 'Disabled'}
                            </span>
                          </>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Summary */}
                <div className="mt-6 p-4 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        Current Settings Summary
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {getActiveCookiesCount()} of {cookieTypes.length} cookie types are active
                      </p>
                    </div>
                    <button
                      onClick={handleSaveSettings}
                      className="btn btn-primary"
                    >
                      <CheckIcon className="w-4 h-4 mr-2" />
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'policy' && (
            <div className="space-y-6">
              <div className="card p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Cookie Policy
                </h2>
                
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <h3>Last Updated: January 15, 2024</h3>
                  
                  <h4>1. Introduction</h4>
                  <p>
                    This Cookie Policy explains how The Box ("we", "us", "our") uses cookies and similar technologies 
                    when you visit our website. By using our website, you consent to the use of cookies in accordance 
                    with this policy.
                  </p>

                  <h4>2. What Are Cookies?</h4>
                  <p>
                    Cookies are small text files that are placed on your device when you visit our website. 
                    They help us provide you with a better experience by remembering your preferences, 
                    analyzing site usage, and personalizing content.
                  </p>

                  <h4>3. Types of Cookies We Use</h4>
                  <ul>
                    <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
                    <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our website</li>
                    <li><strong>Marketing Cookies:</strong> Used for advertising and marketing purposes</li>
                    <li><strong>Personalization Cookies:</strong> Remember your preferences and settings</li>
                    <li><strong>Social Media Cookies:</strong> Enable social media integration features</li>
                  </ul>

                  <h4>4. How to Manage Cookies</h4>
                  <p>
                    You can control and manage cookies through your browser settings. However, disabling certain 
                    cookies may affect the functionality of our website. You can also manage your cookie preferences 
                    through the settings panel on this page.
                  </p>

                  <h4>5. Third-Party Cookies</h4>
                  <p>
                    We may use third-party services that place cookies on your device. These services help us 
                    provide analytics, advertising, and social media features. We do not control these third-party cookies.
                  </p>

                  <h4>6. Updates to This Policy</h4>
                  <p>
                    We may update this Cookie Policy from time to time. We will notify you of any changes by 
                    posting the new policy on this page and updating the "Last Updated" date.
                  </p>

                  <h4>7. Contact Us</h4>
                  <p>
                    If you have any questions about this Cookie Policy, please contact us at privacy@thebox.com
                  </p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CookiesPage; 