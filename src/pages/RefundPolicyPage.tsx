import React from 'react';

const RefundPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Refund Policy
          </h1>
          
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              We want you to be satisfied with your purchase. This policy outlines our refund terms and conditions.
            </p>
            
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Refund Eligibility
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Refunds are available within 30 days of purchase for most courses and services.
            </p>
            
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              How to Request a Refund
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              To request a refund, please contact our support team with your order details and reason for the refund request.
            </p>
            
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Processing Time
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Refunds are typically processed within 5-10 business days after approval.
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

export default RefundPolicyPage; 