import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  PaintBrushIcon,
  PhotoIcon,
  CogIcon,
  EyeIcon,
  ArrowUpTrayIcon,
  TrashIcon,
  CheckIcon,
  XMarkIcon,
  SwatchIcon,
  DocumentIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';

interface BrandingSettings {
  logo: string;
  favicon: string;
  companyName: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
  customCSS: string;
  whiteLabel: boolean;
  customDomain: string;
}

const CustomBranding: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'branding' | 'themes' | 'white-label'>('branding');
  const [brandingSettings, setBrandingSettings] = useState<BrandingSettings>({
    logo: '/logo192.png',
    favicon: '/favicon.ico',
    companyName: 'The Box Learning',
    primaryColor: '#3B82F6',
    secondaryColor: '#1F2937',
    accentColor: '#10B981',
    fontFamily: 'Inter',
    customCSS: '',
    whiteLabel: false,
    customDomain: 'learning.company.com',
  });

  const colorPresets = [
    { name: 'Blue', primary: '#3B82F6', secondary: '#1F2937', accent: '#10B981' },
    { name: 'Purple', primary: '#8B5CF6', secondary: '#1F2937', accent: '#F59E0B' },
    { name: 'Green', primary: '#10B981', secondary: '#1F2937', accent: '#3B82F6' },
    { name: 'Orange', primary: '#F59E0B', secondary: '#1F2937', accent: '#EF4444' },
    { name: 'Red', primary: '#EF4444', secondary: '#1F2937', accent: '#10B981' },
  ];

  const fontOptions = [
    { name: 'Inter', value: 'Inter' },
    { name: 'Roboto', value: 'Roboto' },
    { name: 'Open Sans', value: 'Open Sans' },
    { name: 'Lato', value: 'Lato' },
    { name: 'Poppins', value: 'Poppins' },
  ];

  const handleColorChange = (type: 'primary' | 'secondary' | 'accent', color: string) => {
    setBrandingSettings(prev => ({
      ...prev,
      [type === 'primary' ? 'primaryColor' : type === 'secondary' ? 'secondaryColor' : 'accentColor']: color,
    }));
  };

  const handleFileUpload = (type: 'logo' | 'favicon') => {
    // Simulate file upload
    const file = type === 'logo' ? '/logo192.png' : '/favicon.ico';
    setBrandingSettings(prev => ({
      ...prev,
      [type]: file,
    }));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <PaintBrushIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Custom Branding</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Customize your learning platform</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="btn-secondary">
            <EyeIcon className="w-4 h-4" />
            Preview
          </button>
          <button className="btn-primary">
            <CheckIcon className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
        {[
          { id: 'branding', label: 'Branding', icon: PaintBrushIcon },
          { id: 'themes', label: 'Themes', icon: SwatchIcon },
          { id: 'white-label', label: 'White Label', icon: ShieldCheckIcon },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="space-y-6">
        {activeTab === 'branding' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Logo & Assets */}
            <div className="space-y-6">
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Logo & Assets</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Company Logo
                    </label>
                    <div className="flex items-center space-x-4">
                      <img
                        src={brandingSettings.logo}
                        alt="Logo"
                        className="w-16 h-16 object-contain bg-white rounded-lg border border-gray-200 dark:border-gray-600"
                      />
                      <button
                        onClick={() => handleFileUpload('logo')}
                        className="btn-secondary flex items-center space-x-2"
                      >
                        <ArrowUpTrayIcon className="w-4 h-4" />
                        <span>Upload Logo</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Favicon
                    </label>
                    <div className="flex items-center space-x-4">
                      <img
                        src={brandingSettings.favicon}
                        alt="Favicon"
                        className="w-8 h-8 object-contain bg-white rounded border border-gray-200 dark:border-gray-600"
                      />
                      <button
                        onClick={() => handleFileUpload('favicon')}
                        className="btn-secondary flex items-center space-x-2"
                      >
                        <ArrowUpTrayIcon className="w-4 h-4" />
                        <span>Upload Favicon</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={brandingSettings.companyName}
                      onChange={(e) => setBrandingSettings(prev => ({ ...prev, companyName: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Color Scheme */}
            <div className="space-y-6">
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Color Scheme</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Primary Color
                    </label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="color"
                        value={brandingSettings.primaryColor}
                        onChange={(e) => handleColorChange('primary', e.target.value)}
                        className="w-12 h-12 rounded border border-gray-300 dark:border-gray-600"
                      />
                      <input
                        type="text"
                        value={brandingSettings.primaryColor}
                        onChange={(e) => handleColorChange('primary', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Secondary Color
                    </label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="color"
                        value={brandingSettings.secondaryColor}
                        onChange={(e) => handleColorChange('secondary', e.target.value)}
                        className="w-12 h-12 rounded border border-gray-300 dark:border-gray-600"
                      />
                      <input
                        type="text"
                        value={brandingSettings.secondaryColor}
                        onChange={(e) => handleColorChange('secondary', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Accent Color
                    </label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="color"
                        value={brandingSettings.accentColor}
                        onChange={(e) => handleColorChange('accent', e.target.value)}
                        className="w-12 h-12 rounded border border-gray-300 dark:border-gray-600"
                      />
                      <input
                        type="text"
                        value={brandingSettings.accentColor}
                        onChange={(e) => handleColorChange('accent', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'themes' && (
          <div className="space-y-6">
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Color Presets</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {colorPresets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => {
                      handleColorChange('primary', preset.primary);
                      handleColorChange('secondary', preset.secondary);
                      handleColorChange('accent', preset.accent);
                    }}
                    className="p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 transition-colors"
                  >
                    <div className="flex space-x-1 mb-2">
                      <div
                        className="w-6 h-6 rounded"
                        style={{ backgroundColor: preset.primary }}
                      />
                      <div
                        className="w-6 h-6 rounded"
                        style={{ backgroundColor: preset.secondary }}
                      />
                      <div
                        className="w-6 h-6 rounded"
                        style={{ backgroundColor: preset.accent }}
                      />
                    </div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{preset.name}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Typography</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Font Family
                  </label>
                  <select
                    value={brandingSettings.fontFamily}
                    onChange={(e) => setBrandingSettings(prev => ({ ...prev, fontFamily: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    {fontOptions.map((font) => (
                      <option key={font.value} value={font.value}>
                        {font.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Custom CSS
                  </label>
                  <textarea
                    value={brandingSettings.customCSS}
                    onChange={(e) => setBrandingSettings(prev => ({ ...prev, customCSS: e.target.value }))}
                    rows={6}
                    placeholder="Add custom CSS styles..."
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'white-label' && (
          <div className="space-y-6">
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">White Label Settings</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="white-label"
                    checked={brandingSettings.whiteLabel}
                    onChange={(e) => setBrandingSettings(prev => ({ ...prev, whiteLabel: e.target.checked }))}
                    className="rounded"
                  />
                  <label htmlFor="white-label" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Enable White Label Mode
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Custom Domain
                  </label>
                  <input
                    type="text"
                    value={brandingSettings.customDomain}
                    onChange={(e) => setBrandingSettings(prev => ({ ...prev, customDomain: e.target.value }))}
                    placeholder="learning.yourcompany.com"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <InformationCircleIcon className="w-5 h-5 text-blue-500 mt-0.5" />
                    <div>
                      <h5 className="font-medium text-blue-900 dark:text-blue-100">White Label Benefits</h5>
                      <ul className="mt-2 text-sm text-blue-800 dark:text-blue-200 space-y-1">
                        <li>• Remove all "The Box" branding</li>
                        <li>• Custom domain support</li>
                        <li>• Branded email notifications</li>
                        <li>• Custom login page</li>
                        <li>• API access for integrations</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Branding Preview</h4>
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={brandingSettings.logo}
                      alt="Logo"
                      className="w-8 h-8 object-contain"
                    />
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {brandingSettings.companyName}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: brandingSettings.primaryColor }}
                    />
                    <div
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: brandingSettings.secondaryColor }}
                    />
                    <div
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: brandingSettings.accentColor }}
                    />
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  This is how your branded learning platform will appear to users.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomBranding; 