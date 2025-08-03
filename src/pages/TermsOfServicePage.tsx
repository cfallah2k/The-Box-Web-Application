import React from 'react';

const TermsOfServicePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Terms of Service
          </h1>
          
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              These Terms of Service govern your use of The Box platform and services.
            </p>
            
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Acceptance of Terms
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              By accessing or using The Box, you agree to be bound by these Terms of Service.
            </p>
            
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              User Accounts
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
            </p>
            
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Prohibited Uses
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              You may not use our services for any illegal or unauthorized purpose, or in any way that violates these Terms of Service.
            </p>
            
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

export default TermsOfServicePage; 