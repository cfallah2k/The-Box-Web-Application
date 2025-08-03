import React from 'react';
import { motion } from 'framer-motion';
import { 
  ExclamationTriangleIcon,
  DocumentTextIcon,
  ScaleIcon,
  UserIcon,
  ShieldCheckIcon,
  InformationCircleIcon,
  CalendarIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  GlobeAltIcon,
  LockClosedIcon
} from '@heroicons/react/24/outline';
import { Badge } from '@/components/ui/Badge';

const DMCAPolicyPage: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      id: 'introduction',
      title: 'Introduction',
      icon: InformationCircleIcon,
      color: 'text-blue-500',
      content: `This DMCA (Digital Millennium Copyright Act) Policy outlines how The Box handles copyright infringement claims and counter-notifications. We respect intellectual property rights and comply with the DMCA to protect both copyright holders and our users.`
    },
    {
      id: 'dmca-overview',
      title: 'DMCA Overview',
      icon: DocumentTextIcon,
      color: 'text-green-500',
      content: `The Digital Millennium Copyright Act (DMCA) provides a legal framework for addressing copyright infringement on digital platforms. This policy outlines our procedures for:
• Receiving and processing copyright infringement notices
• Handling counter-notifications from users
• Removing or restoring content based on valid claims
• Protecting users from false or invalid claims`
    },
    {
      id: 'filing-notice',
      title: 'Filing a Copyright Infringement Notice',
      icon: ExclamationTriangleIcon,
      color: 'text-red-500',
      content: `To file a copyright infringement notice, you must provide:
• Your contact information (name, address, phone, email)
• Description of the copyrighted work being infringed
• URL or location of the infringing material on our platform
• Statement of good faith belief that use is not authorized
• Statement that the information is accurate and you're authorized to act
• Physical or electronic signature

Send notices to: dmca@thebox.com`
    },
    {
      id: 'notice-requirements',
      title: 'Notice Requirements',
      icon: CheckCircleIcon,
      color: 'text-purple-500',
      content: `Your DMCA notice must include all required elements:
• Identification of the copyrighted work
• Description of where the material is located on our platform
• Your contact information
• Statement of good faith belief
• Statement of accuracy under penalty of perjury
• Physical or electronic signature

Incomplete notices may be rejected or delayed.`
    },
    {
      id: 'our-response',
      title: 'Our Response to DMCA Notices',
      icon: ClockIcon,
      color: 'text-orange-500',
      content: `Upon receiving a valid DMCA notice:
• We will review the notice within 1-2 business days
• If valid, we will remove or disable access to the content
• We will notify the user who posted the content
• We will provide the user with information about filing a counter-notice
• We will maintain records of all notices and actions taken

We aim to respond to all notices within 48 hours.`
    },
    {
      id: 'counter-notification',
      title: 'Filing a Counter-Notification',
      icon: ShieldCheckIcon,
      color: 'text-indigo-500',
      content: `If your content was removed due to a DMCA notice, you may file a counter-notification:
• Provide your contact information
• Identify the removed content and its location
• State under penalty of perjury that you have a good faith belief the material was removed by mistake
• Consent to local federal court jurisdiction
• Include your physical or electronic signature

Send counter-notifications to: dmca@thebox.com`
    },
    {
      id: 'counter-notice-process',
      title: 'Counter-Notice Process',
      icon: ScaleIcon,
      color: 'text-teal-500',
      content: `When we receive a counter-notification:
• We will review it within 10-14 business days
• If valid, we will restore the content within 10-14 business days
• We will notify the original complainant
• The complainant has 10 business days to file legal action
• If no legal action is filed, the content remains restored
• We maintain records of all counter-notifications`
    },
    {
      id: 'repeat-infringers',
      title: 'Repeat Infringers Policy',
      icon: XCircleIcon,
      color: 'text-pink-500',
      content: `We have a policy for handling repeat infringers:
• We track DMCA notices against user accounts
• Users with multiple valid infringement notices may have their accounts terminated
• We consider the nature and severity of infringements
• Users may appeal account termination decisions
• We provide clear warnings before account termination
• Appeals are reviewed by senior management`
    },
    {
      id: 'false-claims',
      title: 'False Claims and Penalties',
      icon: ExclamationTriangleIcon,
      color: 'text-yellow-500',
      content: `Filing false DMCA claims can result in:
• Legal liability for damages
• Attorney's fees and costs
• Criminal penalties for perjury
• Account termination for false claims
• Legal action by affected users
• Reputation damage

We take false claims seriously and may pursue legal action.`
    },
    {
      id: 'fair-use',
      title: 'Fair Use Considerations',
      icon: ScaleIcon,
      color: 'text-emerald-500',
      content: `We consider fair use factors when evaluating claims:
• Purpose and character of use (commercial vs. educational)
• Nature of the copyrighted work
• Amount and substantiality of the portion used
• Effect on the potential market for the original work

Fair use is a defense that may be raised in counter-notifications.`
    },
    {
      id: 'international',
      title: 'International Copyright',
      icon: GlobeAltIcon,
      color: 'text-violet-500',
      content: `We handle international copyright issues:
• We comply with international copyright treaties
• We respect copyright laws of different jurisdictions
• International notices are processed similarly to US notices
• We may require additional documentation for international claims
• Translation services may be required for non-English notices
• We work with international copyright organizations`
    },
    {
      id: 'appeals-process',
      title: 'Appeals Process',
      icon: DocumentTextIcon,
      color: 'text-cyan-500',
      content: `If you disagree with our DMCA decision:
• You may appeal within 30 days of the decision
• Appeals must include new evidence or legal arguments
• Appeals are reviewed by senior legal team
• Response time: 10-15 business days
• Final decisions are binding
• Legal action may be pursued if necessary`
    },
    {
      id: 'contact',
      title: 'Contact Information',
      icon: MailIcon,
      color: 'text-rose-500',
      content: `For DMCA-related inquiries and notices:

Email: dmca@thebox.com
Phone: +1 (555) 123-4567
Address: 123 Innovation Drive, Tech City, TC 12345

Legal Department: legal@thebox.com
DMCA Agent: dmca@thebox.com`
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
                DMCA Policy
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We respect intellectual property rights and comply with the Digital Millennium Copyright Act (DMCA).
            </p>
            <div className="mt-4 flex items-center justify-center space-x-4">
              <Badge variant="success">DMCA Compliant</Badge>
              <Badge variant="warning">Legal Protection</Badge>
              <Badge variant="error">Fair Process</Badge>
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
              This policy is effective as of the date above and applies to all copyright-related matters on The Box platform.
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
                Need to File a DMCA Notice?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Our legal team is here to help. Contact us for any questions about copyright infringement or to file a DMCA notice.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn btn-primary">
                  <MailIcon className="w-4 h-4 mr-2" />
                  File DMCA Notice
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

export default DMCAPolicyPage; 