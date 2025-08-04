import React from 'react';
import { 
  LightBulbIcon, 
  AcademicCapIcon, 
  CpuChipIcon, 
  ChartBarIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  RocketLaunchIcon,
  SparklesIcon,
  GlobeAltIcon,
  DevicePhoneMobileIcon,
  CloudIcon,
  LockClosedIcon
} from '@heroicons/react/24/outline';

const FeaturesPage: React.FC = () => {
  const features = [
    {
      title: 'AI-Powered Learning',
      description: 'Advanced artificial intelligence that adapts to your learning style and provides personalized guidance.',
      icon: CpuChipIcon,
      color: 'bg-gradient-to-r from-purple-500 to-pink-500'
    },
    {
      title: 'Interactive Courses',
      description: 'Engaging, hands-on courses with real-world projects and practical applications.',
      icon: AcademicCapIcon,
      color: 'bg-gradient-to-r from-blue-500 to-cyan-500'
    },
    {
      title: 'Real-time Analytics',
      description: 'Track your progress with detailed analytics and performance insights.',
      icon: ChartBarIcon,
      color: 'bg-gradient-to-r from-green-500 to-emerald-500'
    },
    {
      title: 'Community Collaboration',
      description: 'Connect with learners worldwide and collaborate on projects together.',
      icon: UserGroupIcon,
      color: 'bg-gradient-to-r from-orange-500 to-red-500'
    },
    {
      title: 'Enterprise Security',
      description: 'Bank-grade security with enterprise-level protection for your data.',
      icon: ShieldCheckIcon,
      color: 'bg-gradient-to-r from-indigo-500 to-purple-500'
    },
    {
      title: 'Mobile-First Design',
      description: 'Seamless experience across all devices with responsive design.',
      icon: DevicePhoneMobileIcon,
      color: 'bg-gradient-to-r from-teal-500 to-blue-500'
    },
    {
      title: 'Cloud Integration',
      description: 'Access your learning materials anywhere with cloud synchronization.',
      icon: CloudIcon,
      color: 'bg-gradient-to-r from-yellow-500 to-orange-500'
    },
    {
      title: 'Advanced Privacy',
      description: 'Complete control over your data with advanced privacy settings.',
      icon: LockClosedIcon,
      color: 'bg-gradient-to-r from-gray-500 to-slate-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Powerful Features for
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {' '}Modern Learning
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-3xl mx-auto">
              Discover the cutting-edge features that make our platform the ultimate destination for 
              personalized, AI-driven education and skill development.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
                Start Learning
              </button>
              <button className="rounded-lg border border-gray-300 px-6 py-3 text-gray-700 font-semibold hover:bg-gray-50 transition-all duration-200">
                View Demo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Everything You Need to Succeed
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Our comprehensive feature set is designed to accelerate your learning journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-100"
            >
              <div className={`inline-flex p-3 rounded-xl ${feature.color} text-white mb-6`}>
                <feature.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl mb-6">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of learners who are already experiencing the future of education
          </p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-all duration-200 hover:scale-105 shadow-lg">
            Get Started Today
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage; 