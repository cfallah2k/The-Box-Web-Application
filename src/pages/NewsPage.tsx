import React from 'react';

const NewsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          News & Updates
        </h1>
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Latest Updates
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Stay tuned for the latest news and updates from The Box.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsPage; 