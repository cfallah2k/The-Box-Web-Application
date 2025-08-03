import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  CheckIcon,
  XMarkIcon,
  StarIcon,
  AcademicCapIcon,
  UserGroupIcon,
  CogIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  ChatBubbleLeftRightIcon,
  BookOpenIcon,
  BeakerIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';

const PricingPage: React.FC = () => {
  const { user } = useAuth();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: 'Free',
      price: { monthly: 0, yearly: 0 },
      description: 'Perfect for getting started with learning',
      features: [
        'Access to 5 courses',
        'Basic AI tutor support',
        'Community forum access',
        'Mobile app access',
        'Basic progress tracking',
        'Email support'
      ],
      limitations: [
        'Limited course selection',
        'No advanced AI features',
        'No certificates',
        'No priority support'
      ],
      popular: false,
      color: 'bg-gray-500'
    },
    {
      name: 'Pro',
      price: { monthly: 29, yearly: 290 },
      description: 'Best for individual learners and professionals',
      features: [
        'Unlimited course access',
        'Advanced AI tutor with voice & vision',
        'Priority community support',
        'Downloadable certificates',
        'Advanced analytics & insights',
        'Priority email & chat support',
        'Custom learning paths',
        'Offline course access',
        'Advanced progress tracking',
        'Personal learning coach'
      ],
      limitations: [],
      popular: true,
      color: 'bg-blue-500'
    },
    {
      name: 'Enterprise',
      price: { monthly: 99, yearly: 990 },
      description: 'Complete solution for teams and organizations',
      features: [
        'Everything in Pro',
        'Team management dashboard',
        'Custom course creation',
        'Advanced analytics & reporting',
        'SSO integration',
        'API access',
        'Dedicated account manager',
        'Custom branding',
        'Advanced security features',
        'White-label solution',
        'Training program design',
        'Compliance & certification'
      ],
      limitations: [],
      popular: false,
      color: 'bg-purple-500'
    }
  ];

  const features = [
    {
      name: 'AI-Powered Learning',
      description: 'Personalized learning experience with advanced AI',
      icon: AcademicCapIcon,
      free: true,
      pro: true,
      enterprise: true
    },
    {
      name: 'Unlimited Courses',
      description: 'Access to our entire course library',
      icon: BookOpenIcon,
      free: false,
      pro: true,
      enterprise: true
    },
    {
      name: 'Advanced Analytics',
      description: 'Detailed insights into your learning progress',
      icon: ChartBarIcon,
      free: false,
      pro: true,
      enterprise: true
    },
    {
      name: 'Team Management',
      description: 'Manage team learning and track progress',
      icon: UserGroupIcon,
      free: false,
      pro: false,
      enterprise: true
    },
    {
      name: 'Custom Content',
      description: 'Create and upload your own courses',
      icon: CogIcon,
      free: false,
      pro: false,
      enterprise: true
    },
    {
      name: 'Priority Support',
      description: 'Get help when you need it most',
      icon: ChatBubbleLeftRightIcon,
      free: false,
      pro: true,
      enterprise: true
    },
    {
      name: 'Security & Compliance',
      description: 'Enterprise-grade security and compliance',
      icon: ShieldCheckIcon,
      free: false,
      pro: false,
      enterprise: true
    },
    {
      name: 'API Access',
      description: 'Integrate with your existing systems',
      icon: GlobeAltIcon,
      free: false,
      pro: false,
      enterprise: true
    }
  ];

  const savings = billingCycle === 'yearly' ? 17 : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start your learning journey with the perfect plan for your needs. 
            All plans include our advanced AI-powered learning platform.
          </p>
        </motion.div>

        {/* Billing Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-white rounded-lg p-1 border border-gray-200">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                billingCycle === 'monthly'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                billingCycle === 'yearly'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Yearly
              {billingCycle === 'yearly' && (
                <span className="ml-1 bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs">
                  Save {savings}%
                </span>
              )}
            </button>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative bg-white rounded-xl shadow-sm border-2 ${
                plan.popular ? 'border-blue-500' : 'border-gray-200'
              } overflow-hidden`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-blue-500 text-white text-center py-2 text-sm font-medium">
                  Most Popular
                </div>
              )}

              <div className="p-6">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  
                  <div className="mb-4">
                    {plan.price[billingCycle] === 0 ? (
                      <span className="text-4xl font-bold text-gray-900">Free</span>
                    ) : (
                      <div>
                        <span className="text-4xl font-bold text-gray-900">
                          ${plan.price[billingCycle]}
                        </span>
                        <span className="text-gray-600 ml-2">
                          /{billingCycle === 'monthly' ? 'month' : 'year'}
                        </span>
                      </div>
                    )}
                  </div>

                  <Link
                    to={plan.name === 'Free' ? '/signup' : '/checkout'}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    {plan.name === 'Free' ? 'Get Started' : 'Choose Plan'}
                  </Link>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">What's included:</h4>
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <CheckIcon className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                  {plan.limitations.map((limitation, limitationIndex) => (
                    <div key={limitationIndex} className="flex items-center">
                      <XMarkIcon className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
                      <span className="text-gray-500">{limitation}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Feature Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Feature Comparison</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Features
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Free
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pro
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {features.map((feature) => (
                  <tr key={feature.name}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <feature.icon className="w-5 h-5 text-gray-400 mr-3" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{feature.name}</div>
                          <div className="text-sm text-gray-500">{feature.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {feature.free ? (
                        <CheckIcon className="w-5 h-5 text-green-500 mx-auto" />
                      ) : (
                        <XMarkIcon className="w-5 h-5 text-gray-400 mx-auto" />
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {feature.pro ? (
                        <CheckIcon className="w-5 h-5 text-green-500 mx-auto" />
                      ) : (
                        <XMarkIcon className="w-5 h-5 text-gray-400 mx-auto" />
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {feature.enterprise ? (
                        <CheckIcon className="w-5 h-5 text-green-500 mx-auto" />
                      ) : (
                        <XMarkIcon className="w-5 h-5 text-gray-400 mx-auto" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Can I change my plan anytime?
                </h3>
                <p className="text-gray-600">
                  Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Is there a free trial?
                </h3>
                <p className="text-gray-600">
                  Yes, all paid plans come with a 14-day free trial. No credit card required to start.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  What payment methods do you accept?
                </h3>
                <p className="text-gray-600">
                  We accept all major credit cards, PayPal, and bank transfers for enterprise plans.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Can I cancel my subscription?
                </h3>
                <p className="text-gray-600">
                  Yes, you can cancel anytime. You'll continue to have access until the end of your billing period.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Do you offer refunds?
                </h3>
                <p className="text-gray-600">
                  We offer a 30-day money-back guarantee for all paid plans. See our refund policy for details.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Is my data secure?
                </h3>
                <p className="text-gray-600">
                  Absolutely. We use enterprise-grade security and encryption to protect your data and privacy.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of learners who are already advancing their careers with The Box.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
            >
              Start Free Trial
            </Link>
            <Link
              to="/contact"
              className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold text-lg hover:border-blue-600 hover:text-blue-600 transition-all duration-200"
            >
              Contact Sales
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PricingPage; 