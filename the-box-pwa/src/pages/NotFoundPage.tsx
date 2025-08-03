import React from 'react';
import { Link } from 'react-router-dom';
import { ExclamationTriangleIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="text-center">
        <div className="mx-auto w-16 h-16 bg-error-100 dark:bg-error-900/20 rounded-full flex items-center justify-center mb-6">
          <ExclamationTriangleIcon className="w-10 h-10 text-error-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">404 – Page Not Found</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/"
          className="btn btn-primary inline-flex items-center space-x-2"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;