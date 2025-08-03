import React from 'react';
import { motion } from 'framer-motion';
import { 
  CurrencyDollarIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
  CalendarIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  DocumentTextIcon,
  ArrowPathIcon,
  CreditCardIcon,
  BanknotesIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import { Badge } from '@/components/ui/Badge';

const RefundPolicyPage: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      id: 'introduction',
      title: 'Introduction',
      icon: InformationCircleIcon,
      color: 'text-blue-500',
      content: `This Refund Policy outlines the terms and conditions for refunds on The Box platform. We strive to provide excellent service and ensure customer satisfaction. This policy applies to all purchases made through our platform.`
    },
    {
      id: 'refund-eligibility',
      title: 'Refund Eligibility',
      icon: CheckCircleIcon,
      color: 'text-green-500',
      content: `You may be eligible for a refund if:
• You request a refund within 30 days of purchase
• You have not completed more than 25% of the course content
• The course or service is not as described
• Technical issues prevent you from accessing the content
• You experience billing errors or unauthorized charges
• The course is cancelled by us before completion

Note: Free trials and promotional offers may have different terms.`
    },
    {
      id: 'refund-process',
      title: 'Refund Process',
      icon: ArrowPathIcon,
      color: 'text-purple-500',
      content: `To request a refund:
1. Contact our support team within 30 days of purchase
2. Provide your order number and reason for refund
3. Our team will review your request within 3-5 business days
4. If approved, refund will be processed within 5-10 business days
5. You will receive confirmation via email

Refunds are processed to the original payment method used for purchase.`
    },
    {
      id: 'refund-timeline',
      title: 'Refund Timeline',
      icon: ClockIcon,
      color: 'text-orange-500',
      content: `• Request Review: 3-5 business days
• Refund Processing: 5-10 business days
• Bank Processing: 3-7 business days (varies by bank)
• Total Timeline: 11-22 business days

Note: International transactions may take longer due to bank processing times.`
    },
    {
      id: 'non-refundable',
      title: 'Non-Refundable Items',
      icon: XCircleIcon,
      color: 'text-red-500',
      content: `The following are generally not eligible for refunds:
• Completed courses (more than 25% progress)
• Downloadable content or materials
• Custom or personalized services
• Enterprise or bulk purchases
• Purchases older than 30 days
• Promotional or discounted items (unless specified)
• Third-party services or integrations`
    },
    {
      id: 'partial-refunds',
      title: 'Partial Refunds',
      icon: CurrencyDollarIcon,
      color: 'text-indigo-500',
      content: `In certain circumstances, we may offer partial refunds:
• If you've completed between 25-50% of course content
• For technical issues that were resolved
• For billing errors or overcharges
• For subscription cancellations mid-cycle

Partial refund amounts are calculated based on usage and circumstances.`
    },
    {
      id: 'subscription-cancellation',
      title: 'Subscription Cancellation',
      icon: CreditCardIcon,
      color: 'text-teal-500',
      content: `For subscription services:
• You may cancel your subscription at any time
• Cancellation takes effect at the end of the current billing period
• No refunds for unused portions of the current period
• Access continues until the end of the paid period
• You can reactivate your subscription at any time

Annual subscriptions may have different cancellation terms.`
    },
    {
      id: 'technical-issues',
      title: 'Technical Issues',
      icon: ExclamationTriangleIcon,
      color: 'text-yellow-500',
      content: `If you experience technical issues:
• Contact our support team immediately
• We will attempt to resolve the issue within 24 hours
• If we cannot resolve the issue, a full refund will be provided
• Screenshots or error messages help expedite the process
• We may offer alternative solutions before processing refunds`
    },
    {
      id: 'billing-disputes',
      title: 'Billing Disputes',
      icon: BanknotesIcon,
      color: 'text-emerald-500',
      content: `For billing disputes or unauthorized charges:
• Contact us immediately upon discovery
• Provide detailed information about the charge
• We will investigate within 2 business days
• If confirmed as unauthorized, immediate refund will be processed
• We may require additional verification for large amounts
• Report to your bank if you suspect fraud`
    },
    {
      id: 'enterprise-refunds',
      title: 'Enterprise Refunds',
      icon: ShieldCheckIcon,
      color: 'text-violet-500',
      content: `Enterprise customers have different refund terms:
• 30-day money-back guarantee for new customers
• Pro-rated refunds for unused portions of annual contracts
• Custom terms may apply based on contract agreements
• Contact your account manager for enterprise refunds
• Bulk license purchases may have different terms
• Training and implementation fees are generally non-refundable`
    },
    {
      id: 'refund-methods',
      title: 'Refund Methods',
      icon: CreditCardIcon,
      color: 'text-pink-500',
      content: `Refunds are processed to the original payment method:
• Credit/Debit Cards: 5-10 business days
• PayPal: 3-5 business days
• Bank Transfers: 5-15 business days
• Digital Wallets: 2-5 business days
• Cryptocurrency: 1-3 business days (if applicable)

Note: Processing times may vary by financial institution.`
    },
    {
      id: 'appeals-process',
      title: 'Appeals Process',
      icon: DocumentTextIcon,
      color: 'text-cyan-500',
      content: `If your refund request is denied:
• You may appeal the decision within 14 days
• Provide additional documentation or evidence
• Appeals are reviewed by senior management
• Response time: 5-7 business days
• Final decision is binding
• Alternative solutions may be offered instead of refunds`
    },
    {
      id: 'contact',
      title: 'Contact Information',
      icon: MailIcon,
      color: 'text-rose-500',
      content: `For refund requests or questions about this policy:

Email: refunds@thebox.com
Phone: +1 (555) 123-4567
Support Hours: Monday-Friday, 9 AM - 6 PM EST

Refund Team: refunds@thebox.com
Billing Support: billing@thebox.com`
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
              <CurrencyDollarIcon className="w-8 h-8 text-primary-600" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Refund Policy
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We want you to be completely satisfied with your purchase. Learn about our refund process and policies.
            </p>
            <div className="mt-4 flex items-center justify-center space-x-4">
              <Badge variant="success">30-Day Guarantee</Badge>
              <Badge variant="warning">Fast Processing</Badge>
              <Badge variant="error">Customer First</Badge>
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
              This policy is effective as of the date above and applies to all purchases made through The Box platform.
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
                Need to Request a Refund?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Our refund team is here to help. Contact us for any questions about refunds or to start the refund process.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn btn-primary">
                  <MailIcon className="w-4 h-4 mr-2" />
                  Request Refund
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

export default RefundPolicyPage; 