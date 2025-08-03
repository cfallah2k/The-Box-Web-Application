import React from 'react';

const LegalPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Legal Information
          </h1>
          
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              This page contains important legal information about The Box platform.
            </p>
            
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Legal Documents
            </h2>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-6 space-y-2">
              <li><a href="/privacy-policy" className="text-blue-600 hover:text-blue-800">Privacy Policy</a></li>
              <li><a href="/terms-of-service" className="text-blue-600 hover:text-blue-800">Terms of Service</a></li>
              <li><a href="/refund-policy" className="text-blue-600 hover:text-blue-800">Refund Policy</a></li>
              <li><a href="/dmca-policy" className="text-blue-600 hover:text-blue-800">DMCA Policy</a></li>
              <li><a href="/cookies" className="text-blue-600 hover:text-blue-800">Cookie Policy</a></li>
            </ul>
            
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalPage; 