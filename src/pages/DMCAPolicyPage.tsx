import React from 'react';

const DMCAPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            DMCA Policy
          </h1>
          
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              The Box respects the intellectual property rights of others and expects its users to do the same.
            </p>
            
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Copyright Infringement Claims
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              If you believe that your copyrighted work has been copied in a way that constitutes copyright infringement, please provide our designated copyright agent with the information specified below.
            </p>
            
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Required Information
            </h2>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-6 space-y-2">
              <li>A physical or electronic signature of the copyright owner</li>
              <li>Identification of the copyrighted work claimed to have been infringed</li>
              <li>Identification of the material that is claimed to be infringing</li>
              <li>Your contact information</li>
              <li>A statement of good faith belief that use of the material is not authorized</li>
              <li>A statement that the information is accurate and that you are authorized to act on behalf of the copyright owner</li>
            </ul>
            
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Contact Information
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Please send DMCA notices to: legal@thebox.com
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

export default DMCAPolicyPage; 