import React from 'react';
import { motion } from 'framer-motion';
import { 
  DocumentTextIcon,
  ScaleIcon,
  UserIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
  CalendarIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  GlobeAltIcon,
  CogIcon,
  LockClosedIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import { Badge } from '@/components/ui/Badge';

const TermsOfServicePage: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      id: 'introduction',
      title: 'Introduction',
      icon: InformationCircleIcon,
      color: 'text-blue-500',
      content: `These Terms of Service ("Terms") govern your use of The Box educational platform and services. By accessing or using our platform, you agree to be bound by these Terms. If you disagree with any part of these terms, you may not access our services.`
    },
    {
      id: 'definitions',
      title: 'Definitions',
      icon: DocumentTextIcon,
      color: 'text-green-500',
      content: `• "Platform" refers to The Box website, mobile applications, and related services
• "User," "you," and "your" refers to individuals using our platform
• "Content" includes courses, materials, videos, text, and other educational resources
• "Services" refers to all features and functionality provided by The Box
• "Subscription" refers to paid access to premium features and content`
    },
    {
      id: 'account-registration',
      title: 'Account Registration and Security',
      icon: UserIcon,
      color: 'text-purple-500',
      content: `To access certain features, you must create an account. You agree to:
• Provide accurate and complete information
• Maintain the security of your account credentials
• Notify us immediately of any unauthorized access
• Accept responsibility for all activities under your account
• Be at least 13 years old to create an account

We reserve the right to terminate accounts that violate these terms.`
    },
    {
      id: 'acceptable-use',
      title: 'Acceptable Use Policy',
      icon: ShieldCheckIcon,
      color: 'text-orange-500',
      content: `You agree to use our platform only for lawful purposes and in accordance with these Terms. You agree not to:
• Violate any applicable laws or regulations
• Infringe on intellectual property rights
• Harass, abuse, or harm other users
• Attempt to gain unauthorized access to our systems
• Use automated tools to access our services
• Share account credentials with others
• Create multiple accounts for abuse purposes`
    },
    {
      id: 'intellectual-property',
      title: 'Intellectual Property Rights',
      icon: ScaleIcon,
      color: 'text-red-500',
      content: `• Our platform and content are protected by copyright, trademark, and other intellectual property laws
• You retain ownership of content you create and submit
• You grant us a license to use your content for platform improvement
• You may not reproduce, distribute, or create derivative works without permission
• Course materials are for personal use only unless otherwise specified
• Respect the intellectual property rights of other users and third parties`
    },
    {
      id: 'subscription-services',
      title: 'Subscription Services',
      icon: CogIcon,
      color: 'text-indigo-500',
      content: `• Subscriptions are billed on a recurring basis
• You may cancel your subscription at any time
• Refunds are provided according to our refund policy
• Price changes will be communicated in advance
• Subscription features may be modified with notice
• Free trials are subject to automatic conversion unless cancelled`
    },
    {
      id: 'content-standards',
      title: 'Content Standards',
      icon: EyeIcon,
      color: 'text-teal-500',
      content: `All content you submit must:
• Be accurate and truthful
• Not violate any laws or regulations
• Not infringe on third-party rights
• Not contain harmful or malicious code
• Be appropriate for an educational environment
• Not include personal information of others without consent

We reserve the right to remove content that violates these standards.`
    },
    {
      id: 'privacy-data',
      title: 'Privacy and Data Protection',
      icon: LockClosedIcon,
      color: 'text-emerald-500',
      content: `• Your privacy is important to us
• We collect and process data as described in our Privacy Policy
• We implement appropriate security measures
• You have rights regarding your personal data
• We may share data with trusted service providers
• Data may be transferred internationally with appropriate safeguards
• You can request data deletion subject to legal requirements`
    },
    {
      id: 'disclaimers',
      title: 'Disclaimers and Limitations',
      icon: ExclamationTriangleIcon,
      color: 'text-yellow-500',
      content: `• Our services are provided "as is" without warranties
• We do not guarantee uninterrupted access to our platform
• Course completion does not guarantee employment or certification
• We are not responsible for third-party content or services
• Your use of our platform is at your own risk
• We disclaim liability for indirect or consequential damages
• Our total liability is limited to amounts paid for services`
    },
    {
      id: 'termination',
      title: 'Termination and Suspension',
      icon: XCircleIcon,
      color: 'text-pink-500',
      content: `We may terminate or suspend your account if:
• You violate these Terms of Service
• You engage in fraudulent or illegal activities
• You fail to pay subscription fees
• You create multiple accounts for abuse
• You attempt to circumvent our security measures

Upon termination, your access to services will cease immediately.`
    },
    {
      id: 'governing-law',
      title: 'Governing Law and Disputes',
      icon: ScaleIcon,
      color: 'text-violet-500',
      content: `• These Terms are governed by the laws of [Jurisdiction]
• Disputes will be resolved through binding arbitration
• Class action lawsuits are waived
• Small claims court actions are permitted
• You agree to resolve disputes individually
• Arbitration will be conducted by a neutral arbitrator
• Awards may be enforced in any court of competent jurisdiction`
    },
    {
      id: 'changes',
      title: 'Changes to Terms',
      icon: DocumentTextIcon,
      color: 'text-cyan-500',
      content: `We may update these Terms from time to time. Changes will be effective:
• Immediately for new users
• 30 days after posting for existing users
• Upon continued use of our services
• With email notification for material changes

Your continued use constitutes acceptance of updated terms.`
    },
    {
      id: 'contact',
      title: 'Contact Information',
      icon: MailIcon,
      color: 'text-rose-500',
      content: `For questions about these Terms of Service, please contact us:

Email: legal@thebox.com
Phone: +1 (555) 123-4567
Address: 123 Innovation Drive, Tech City, TC 12345

Legal Department: legal@thebox.com`
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
              <ScaleIcon className="w-8 h-8 text-primary-600" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Terms of Service
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              These terms govern your use of The Box platform and services. Please read them carefully.
            </p>
            <div className="mt-4 flex items-center justify-center space-x-4">
              <Badge variant="success">Legally Binding</Badge>
              <Badge variant="warning">Updated Regularly</Badge>
              <Badge variant="error">Enforceable</Badge>
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
              These terms are effective as of the date above and apply to all users of The Box platform.
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
                Questions About These Terms?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Our legal team is here to help. Contact us for any questions about these terms of service.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn btn-primary">
                  <MailIcon className="w-4 h-4 mr-2" />
                  Contact Legal Team
                </button>
                <button className="btn btn-outline">
                  <DocumentTextIcon className="w-4 h-4 mr-2" />
                  Download Terms
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsOfServicePage; 