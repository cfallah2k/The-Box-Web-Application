import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckIcon,
  StarIcon,
  UserGroupIcon,
  AcademicCapIcon,
  BookOpenIcon,
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';

const PricingPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const { addToast } = useToast();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      id: 'free',
      name: 'Free',
      description: 'Perfect for getting started',
      price: { monthly: 0, yearly: 0 },
      features: [
        'Access to 5 courses',
        'Basic AI tutor support',
        'Community access',
        'Mobile app access',
        'Email support',
      ],
      limitations: [
        'Limited course selection',
        'No certificates',
        'No priority support',
      ],
      popular: false,
      cta: 'Get Started',
      color: 'border-gray-200',
      bgColor: 'bg-white',
    },
    {
      id: 'pro',
      name: 'Pro',
      description: 'Best for individual learners',
      price: { monthly: 29, yearly: 290 },
      features: [
        'Unlimited course access',
        'Advanced AI tutor',
        'Course certificates',
        'Priority support',
        'Download for offline',
        'Progress tracking',
        'Personalized recommendations',
      ],
      limitations: [],
      popular: true,
      cta: 'Start Pro Trial',
      color: 'border-primary-500',
      bgColor: 'bg-white',
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'For teams and organizations',
      price: { monthly: 99, yearly: 990 },
      features: [
        'Everything in Pro',
        'Team management',
        'Custom branding',
        'Advanced analytics',
        'API access',
        'Dedicated support',
        'Custom integrations',
        'SSO authentication',
      ],
      limitations: [],
      popular: false,
      cta: 'Contact Sales',
      color: 'border-gray-200',
      bgColor: 'bg-white',
    },
  ];

  const features = [
    {
      name: 'Unlimited Learning',
      description: 'Access to thousands of courses across all categories',
      icon: BookOpenIcon,
    },
    {
      name: 'AI-Powered Tutor',
      description: '24/7 intelligent assistance for personalized learning',
      icon: ChatBubbleLeftRightIcon,
    },
    {
      name: 'Expert Instructors',
      description: 'Learn from industry leaders and certified professionals',
      icon: AcademicCapIcon,
    },
    {
      name: 'Community Support',
      description: 'Connect with fellow learners and share knowledge',
      icon: UserGroupIcon,
    },
    {
      name: 'Mobile Learning',
      description: 'Learn anywhere with our mobile-optimized platform',
      icon: GlobeAltIcon,
    },
    {
      name: 'Progress Tracking',
      description: 'Monitor your learning journey with detailed analytics',
      icon: Cog6ToothIcon,
    },
  ];

  const handlePlanSelect = (planId: string) => {
    if (!isAuthenticated) {
      addToast({
        type: 'info',
        title: 'Sign in required',
        message: 'Please sign in to select a plan.'
      });
      return;
    }

    if (planId === 'enterprise') {
      addToast({
        type: 'info',
        title: 'Enterprise Plan',
        message: 'Please contact our sales team for enterprise pricing.'
      });
      return;
    }

    addToast({
      type: 'success',
      title: 'Plan selected',
      message: `You've selected the ${planId} plan. Redirecting to checkout...`
    });
  };

  const getPrice = (plan: any) => {
    const price = billingCycle === 'yearly' ? plan.price.yearly : plan.price.monthly;
    if (price === 0) return 'Free';
    return billingCycle === 'yearly' ? `$${price}/year` : `$${price}/month`;
  };

  const getSavings = (plan: any) => {
    if (plan.price.monthly === 0 || plan.price.yearly === 0) return null;
    const monthlyTotal = plan.price.monthly * 12;
    const yearlyPrice = plan.price.yearly;
    const savings = monthlyTotal - yearlyPrice;
    return savings > 0 ? `Save $${savings}/year` : null;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Choose Your Learning Plan
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Start your learning journey with flexible plans designed for every learner. 
            Unlock unlimited access to world-class courses and expert instructors.
          </p>
        </motion.div>

        {/* Billing Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg p-1 shadow-sm">
            <div className="flex">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  billingCycle === 'monthly'
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  billingCycle === 'yearly'
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Yearly
                {billingCycle === 'yearly' && (
                  <span className="ml-2 bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full text-xs">
                    Save 20%
                  </span>
                )}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative card p-8 ${plan.bgColor} ${plan.color} border-2 ${
                plan.popular ? 'ring-2 ring-primary-500' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {plan.description}
                </p>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    {getPrice(plan)}
                  </span>
                  {billingCycle === 'yearly' && plan.price.monthly > 0 && (
                    <span className="text-gray-500 text-sm ml-2">
                      (${Math.round(plan.price.yearly / 12)}/mo)
                    </span>
                  )}
                </div>
                {getSavings(plan) && (
                  <p className="text-success-600 text-sm font-medium">
                    {getSavings(plan)}
                  </p>
                )}
              </div>

              <div className="space-y-4 mb-8">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                  What's included:
                </h4>
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start space-x-3">
                    <CheckIcon className="w-5 h-5 text-success-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
                {plan.limitations.map((limitation, limitationIndex) => (
                  <div key={limitationIndex} className="flex items-start space-x-3">
                    <div className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0">×</div>
                    <span className="text-gray-500 dark:text-gray-400">{limitation}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handlePlanSelect(plan.id)}
                className={`w-full btn ${
                  plan.popular ? 'btn-primary' : 'btn-outline'
                }`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose The Box?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Experience the future of learning with our cutting-edge platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="card p-6 text-center"
              >
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Can I cancel my subscription anytime?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Do you offer refunds?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, contact our support team.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Can I switch between plans?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Yes, you can upgrade or downgrade your plan at any time. Changes will be prorated based on your current billing cycle.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Is there a free trial?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Yes, we offer a 7-day free trial for all paid plans. No credit card required to start your trial.
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Join thousands of learners who are already advancing their careers with The Box
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn btn-primary">
              Start Free Trial
            </button>
            <button className="btn btn-outline">
              View All Courses
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PricingPage; 