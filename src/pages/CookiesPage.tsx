import React from 'react';

const CookiesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Cookie Policy
          </h1>
          
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              This Cookie Policy explains how The Box uses cookies and similar technologies to recognize you when you visit our website.
            </p>
            
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              What are cookies?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners to make their websites work, or to work more efficiently, as well as to provide reporting information.
            </p>
            
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              How we use cookies
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              We use cookies for several reasons. Some cookies are required for technical reasons in order for our website to operate, and we refer to these as "essential" or "strictly necessary" cookies.
            </p>
            
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Types of cookies we use
            </h2>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-6 space-y-2">
              <li><strong>Essential cookies:</strong> These cookies are necessary for the website to function and cannot be switched off in our systems.</li>
              <li><strong>Performance cookies:</strong> These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site.</li>
              <li><strong>Functional cookies:</strong> These cookies enable the website to provide enhanced functionality and personalization.</li>
              <li><strong>Targeting cookies:</strong> These cookies may be set through our site by our advertising partners.</li>
            </ul>
            
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Managing cookies
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted.
            </p>
            
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Updates to this policy
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal or regulatory reasons.
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

export default CookiesPage; 