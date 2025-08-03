import {
  ArrowLeftIcon,
  CogIcon,
  EnvelopeIcon,
  ExclamationTriangleIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  RefreshIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import React from 'react';
import { Link, useRouteError } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  const error = useRouteError() as any;

  const errorTypes = {
    404: {
      title: 'Page Not Found',
      description: "The page you're looking for doesn't exist.",
      icon: ExclamationTriangleIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    500: {
      title: 'Server Error',
      description: 'Something went wrong on our end. Please try again later.',
      icon: CogIcon,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    403: {
      title: 'Access Denied',
      description: "You don't have permission to access this resource.",
      icon: ExclamationTriangleIcon,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    default: {
      title: 'Something Went Wrong',
      description: 'An unexpected error occurred. Please try again.',
      icon: ExclamationTriangleIcon,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
    },
  };

  const errorCode = error?.status || 404;
  const errorInfo =
    errorTypes[errorCode as keyof typeof errorTypes] || errorTypes.default;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className={`inline-flex p-4 rounded-full ${errorInfo.bgColor} mb-6`}
          >
            <errorInfo.icon className={`w-12 h-12 ${errorInfo.color}`} />
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">{errorCode}</h1>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            {errorInfo.title}
          </h2>

          <p className="text-gray-600 mb-8">{errorInfo.description}</p>

          <div className="space-y-4">
            <Link
              to="/"
              className="inline-flex items-center justify-center w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <HomeIcon className="w-5 h-5 mr-2" />
              Go Home
            </Link>

            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center w-full border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Go Back
            </button>

            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center w-full border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <RefreshIcon className="w-5 h-5 mr-2" />
              Refresh Page
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">
              Need help? Contact our support team
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                to="/help"
                className="inline-flex items-center text-blue-600 hover:text-blue-800"
              >
                <QuestionMarkCircleIcon className="w-5 h-5 mr-1" />
                Help Center
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center text-blue-600 hover:text-blue-800"
              >
                <EnvelopeIcon className="w-5 h-5 mr-1" />
                Contact Us
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ErrorPage;
