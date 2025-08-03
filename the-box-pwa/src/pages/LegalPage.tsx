import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ScaleIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CalendarIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  ClockIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';
import { Badge } from '@/components/ui/Badge';

const LegalPage: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const legalPolicies = [
    {
      title: 'Privacy Policy',
      description: 'Learn how we collect, use, and protect your personal information.',
      href: '/privacy-policy',
      icon: ShieldCheckIcon,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      features: ['GDPR Compliant', 'CCPA Compliant', 'SOC 2 Certified'],
      lastUpdated: 'January 15, 2024'
    },
    {
      title: 'Terms of Service',
      description: 'Understand the terms and conditions that govern your use of our platform.',
      href: '/terms-of-service',
      icon: ScaleIcon,
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      features: ['Legally Binding', 'Updated Regularly', 'Enforceable'],
      lastUpdated: 'January 15, 2024'
    },
    {
      title: 'Refund Policy',
      description: 'Our policies for refunds, cancellations, and billing disputes.',
      href: '/refund-policy',
      icon: CurrencyDollarIcon,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      features: ['30-Day Guarantee', 'Fast Processing', 'Customer First'],
      lastUpdated: 'January 15, 2024'
    },
    {
      title: 'DMCA Policy',
      description: 'How we handle copyright infringement claims and intellectual property.',
      href: '/dmca-policy',
      icon: ExclamationTriangleIcon,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      features: ['DMCA Compliant', 'Legal Protection', 'Fair Process'],
      lastUpdated: 'January 15, 2024'
    },
    {
      title: 'Cookie Policy',
      description: 'Information about how we use cookies and tracking technologies.',
      href: '/cookies',
      icon: InformationCircleIcon,
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
      features: ['Transparent', 'User Control', 'GDPR Compliant'],
      lastUpdated: 'January 15, 2024'
    }
  ];

  const contactInfo = {
    legal: {
      email: 'legal@thebox.com',
      phone: '+1 (555) 123-4567',
      address: '123 Innovation Drive, Tech City, TC 12345'
    },
    departments: [
      {
        name: 'Privacy Team',
        email: 'privacy@thebox.com',
        description: 'For privacy-related questions and data requests'
      },
      {
        name: 'Legal Department',
        email: 'legal@thebox.com',
        description: 'For legal inquiries and policy questions'
      },
      {
        name: 'DMCA Agent',
        email: 'dmca@thebox.com',
        description: 'For copyright infringement notices'
      },
      {
        name: 'Refund Team',
        email: 'refunds@thebox.com',
        description: 'For refund requests and billing issues'
      }
    ]
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
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <ScaleIcon className="w-8 h-8 text-primary-600" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Legal Center
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our comprehensive legal policies and procedures. We're committed to transparency and protecting your rights.
            </p>
            <div className="mt-4 flex items-center justify-center space-x-4">
              <Badge variant="success">Transparent</Badge>
              <Badge variant="warning">Compliant</Badge>
              <Badge variant="error">Protected</Badge>
            </div>
          </div>
        </motion.div>

        {/* Last Updated */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="card p-6 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <CalendarIcon className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                All policies last updated: January 15, 2024
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              We regularly review and update our legal policies to ensure compliance and transparency.
            </p>
          </div>
        </motion.div>

        {/* Legal Policies Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Our Legal Policies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {legalPolicies.map((policy, index) => (
              <motion.div
                key={policy.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="card p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start space-x-4 mb-4">
                  <div className={`w-12 h-12 ${policy.bgColor} rounded-lg flex items-center justify-center`}>
                    <policy.icon className={`w-6 h-6 ${policy.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {policy.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {policy.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {policy.features.map((feature) => (
                        <Badge key={feature} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Updated: {policy.lastUpdated}
                      </span>
                      <Link
                        to={policy.href}
                        className="flex items-center space-x-1 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                      >
                        <span className="text-sm font-medium">Read Policy</span>
                        <ArrowRightIcon className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <div className="card p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Contact Our Legal Team
            </h2>
            
            {/* General Contact */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                General Legal Inquiries
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3">
                  <MailIcon className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {contactInfo.legal.email}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <PhoneIcon className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {contactInfo.legal.phone}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPinIcon className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {contactInfo.legal.address}
                  </span>
                </div>
              </div>
            </div>

            {/* Department Contacts */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Specialized Departments
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {contactInfo.departments.map((dept) => (
                  <div key={dept.name} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                      {dept.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {dept.description}
                    </p>
                    <a
                      href={`mailto:${dept.email}`}
                      className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
                    >
                      {dept.email}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <div className="card p-6 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Need Legal Assistance?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Our legal team is here to help with any questions about our policies or legal matters.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn btn-primary">
                  <MailIcon className="w-4 h-4 mr-2" />
                  Contact Legal Team
                </button>
                <button className="btn btn-outline">
                  <DocumentTextIcon className="w-4 h-4 mr-2" />
                  Download All Policies
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {currentYear} The Box. All legal policies are subject to change. Please check back regularly for updates.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default LegalPage; 