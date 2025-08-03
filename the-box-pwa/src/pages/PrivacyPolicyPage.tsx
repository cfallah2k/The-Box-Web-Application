import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheckIcon,
  EyeIcon,
  LockClosedIcon,
  UserIcon,
  GlobeAltIcon,
  CogIcon,
  InformationCircleIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  DocumentTextIcon,
  CalendarIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';
import { Badge } from '@/components/ui/Badge';

const PrivacyPolicyPage: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      id: 'introduction',
      title: 'Introduction',
      icon: InformationCircleIcon,
      color: 'text-blue-500',
      content: `This Privacy Policy describes how The Box ("we", "us", "our") collects, uses, and protects your personal information when you use our educational platform and services. By using our services, you agree to the collection and use of information in accordance with this policy.`
    },
    {
      id: 'information-collection',
      title: 'Information We Collect',
      icon: UserIcon,
      color: 'text-green-500',
      content: `We collect information you provide directly to us, such as when you create an account, enroll in courses, or contact us for support. This may include:
• Personal identification information (name, email address, phone number)
• Educational background and preferences
• Course progress and learning analytics
• Communication preferences and settings
• Payment information (processed securely through third-party providers)`
    },
    {
      id: 'automated-collection',
      title: 'Automated Information Collection',
      icon: CogIcon,
      color: 'text-purple-500',
      content: `We automatically collect certain information when you use our platform:
• Device information (IP address, browser type, operating system)
• Usage data (pages visited, time spent, features used)
• Performance data (loading times, error logs)
• Location data (country/region for content localization)
• Cookies and similar technologies for enhanced user experience`
    },
    {
      id: 'information-use',
      title: 'How We Use Your Information',
      icon: EyeIcon,
      color: 'text-orange-500',
      content: `We use the collected information for various purposes:
• Provide and maintain our educational services
• Personalize your learning experience
• Process payments and manage subscriptions
• Send important updates and notifications
• Improve our platform and develop new features
• Ensure platform security and prevent fraud
• Comply with legal obligations`
    },
    {
      id: 'information-sharing',
      title: 'Information Sharing and Disclosure',
      icon: GlobeAltIcon,
      color: 'text-red-500',
      content: `We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
• With your explicit consent
• To comply with legal obligations
• To protect our rights and safety
• With trusted service providers who assist in platform operations
• In connection with business transfers or mergers`
    },
    {
      id: 'data-security',
      title: 'Data Security',
      icon: LockClosedIcon,
      color: 'text-indigo-500',
      content: `We implement comprehensive security measures to protect your personal information:
• Encryption of data in transit and at rest
• Regular security audits and assessments
• Access controls and authentication systems
• Secure data centers with physical security
• Employee training on data protection
• Incident response and breach notification procedures`
    },
    {
      id: 'data-retention',
      title: 'Data Retention',
      icon: CalendarIcon,
      color: 'text-teal-500',
      content: `We retain your personal information only as long as necessary to:
• Provide our services to you
• Comply with legal obligations
• Resolve disputes and enforce agreements
• Improve our services and develop new features

You may request deletion of your data at any time, subject to legal requirements.`
    },
    {
      id: 'your-rights',
      title: 'Your Rights and Choices',
      icon: ShieldCheckIcon,
      color: 'text-emerald-500',
      content: `You have the following rights regarding your personal information:
• Access and review your personal data
• Correct inaccurate or incomplete information
• Request deletion of your personal data
• Object to processing of your data
• Data portability (receive your data in a structured format)
• Withdraw consent for data processing
• Lodge complaints with supervisory authorities`
    },
    {
      id: 'cookies',
      title: 'Cookies and Tracking Technologies',
      icon: CogIcon,
      color: 'text-pink-500',
      content: `We use cookies and similar technologies to enhance your experience:
• Essential cookies for platform functionality
• Analytics cookies to understand usage patterns
• Marketing cookies for personalized content
• Social media cookies for sharing features

You can control cookie preferences through your browser settings or our cookie management tools.`
    },
    {
      id: 'third-party',
      title: 'Third-Party Services',
      icon: GlobeAltIcon,
      color: 'text-yellow-500',
      content: `Our platform may integrate with third-party services:
• Payment processors for secure transactions
• Analytics providers for usage insights
• Cloud storage providers for data hosting
• Communication tools for customer support

These services have their own privacy policies, and we encourage you to review them.`
    },
    {
      id: 'children-privacy',
      title: 'Children\'s Privacy',
      icon: UserIcon,
      color: 'text-cyan-500',
      content: `Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.`
    },
    {
      id: 'international-transfers',
      title: 'International Data Transfers',
      icon: GlobeAltIcon,
      color: 'text-violet-500',
      content: `Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data during international transfers, including:
• Standard contractual clauses
• Adequacy decisions
• Other appropriate safeguards as required by law`
    },
    {
      id: 'changes',
      title: 'Changes to This Policy',
      icon: DocumentTextIcon,
      color: 'text-amber-500',
      content: `We may update this Privacy Policy from time to time. We will notify you of any material changes by:
• Posting the updated policy on our platform
• Sending email notifications to registered users
• Displaying prominent notices on our website

Your continued use of our services after changes constitutes acceptance of the updated policy.`
    },
    {
      id: 'contact',
      title: 'Contact Information',
      icon: MailIcon,
      color: 'text-rose-500',
      content: `If you have questions about this Privacy Policy or our data practices, please contact us:

Email: privacy@thebox.com
Phone: +1 (555) 123-4567
Address: 123 Innovation Drive, Tech City, TC 12345

Data Protection Officer: dpo@thebox.com`
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <ShieldCheckIcon className="w-8 h-8 text-primary-600" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Privacy Policy
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
            </p>
            <div className="mt-4 flex items-center justify-center space-x-4">
              <Badge variant="success">GDPR Compliant</Badge>
              <Badge variant="warning">CCPA Compliant</Badge>
              <Badge variant="error">SOC 2 Certified</Badge>
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
                Last Updated: January 15, 2024
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              This policy is effective as of the date above and applies to all users of The Box platform.
            </p>
          </div>
        </motion.div>

        {/* Table of Contents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Table of Contents
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {sections.map((section, index) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {index + 1}.
                  </span>
                  <span className="text-sm text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
                    {section.title}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Policy Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              id={section.id}
              className="card p-6"
            >
              <div className="flex items-start space-x-4 mb-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${section.color.replace('text-', 'bg-')} bg-opacity-10`}>
                  <section.icon className={`w-6 h-6 ${section.color}`} />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {section.title}
                  </h2>
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <div className="card p-6 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Questions About Your Privacy?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                We're here to help. Contact our privacy team for any questions or concerns about your data.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn btn-primary">
                  <MailIcon className="w-4 h-4 mr-2" />
                  Contact Privacy Team
                </button>
                <button className="btn btn-outline">
                  <DocumentTextIcon className="w-4 h-4 mr-2" />
                  Download Policy
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage; 