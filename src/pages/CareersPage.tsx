import React from 'react';
import { 
  BriefcaseIcon,
  AcademicCapIcon,
  CpuChipIcon,
  UserGroupIcon,
  GlobeAltIcon,
  HeartIcon,
  StarIcon,
  RocketLaunchIcon,
  LightBulbIcon,
  ShieldCheckIcon,
  MapPinIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const CareersPage: React.FC = () => {
  const benefits = [
    {
      title: 'Flexible Work',
      description: 'Remote-first culture with flexible hours and unlimited PTO',
      icon: GlobeAltIcon,
      color: 'bg-gradient-to-r from-blue-500 to-cyan-500'
    },
    {
      title: 'Health & Wellness',
      description: 'Comprehensive health coverage and wellness programs',
      icon: HeartIcon,
      color: 'bg-gradient-to-r from-red-500 to-pink-500'
    },
    {
      title: 'Learning Budget',
      description: 'Annual budget for courses, conferences, and professional development',
      icon: AcademicCapIcon,
      color: 'bg-gradient-to-r from-purple-500 to-pink-500'
    },
    {
      title: 'Equity',
      description: 'Stock options and competitive compensation packages',
      icon: StarIcon,
      color: 'bg-gradient-to-r from-yellow-500 to-orange-500'
    },
    {
      title: 'Innovation',
      description: 'Work on cutting-edge AI and education technology',
      icon: LightBulbIcon,
      color: 'bg-gradient-to-r from-green-500 to-emerald-500'
    },
    {
      title: 'Impact',
      description: 'Make a real difference in millions of learners\' lives',
      icon: RocketLaunchIcon,
      color: 'bg-gradient-to-r from-indigo-500 to-purple-500'
    }
  ];

  const openPositions = [
    {
      title: 'Senior Frontend Engineer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      description: 'Build beautiful, responsive user interfaces that millions of learners use every day.',
      requirements: ['React/TypeScript', '5+ years experience', 'UI/UX focus']
    },
    {
      title: 'AI/ML Engineer',
      department: 'Engineering',
      location: 'San Francisco',
      type: 'Full-time',
      description: 'Develop cutting-edge AI algorithms for personalized learning experiences.',
      requirements: ['Python/TensorFlow', '3+ years ML experience', 'Education domain knowledge']
    },
    {
      title: 'Product Manager',
      department: 'Product',
      location: 'Remote',
      type: 'Full-time',
      description: 'Lead product strategy and development for our learning platform.',
      requirements: ['5+ years PM experience', 'EdTech background', 'Data-driven approach']
    },
    {
      title: 'UX Designer',
      department: 'Design',
      location: 'New York',
      type: 'Full-time',
      description: 'Create intuitive, accessible learning experiences for diverse users.',
      requirements: ['Figma/Prototyping', '3+ years UX experience', 'Education focus']
    },
    {
      title: 'Content Strategist',
      department: 'Content',
      location: 'Remote',
      type: 'Full-time',
      description: 'Develop engaging educational content and learning pathways.',
      requirements: ['Education background', 'Content creation', 'Curriculum design']
    },
    {
      title: 'Customer Success Manager',
      department: 'Customer Success',
      location: 'Remote',
      type: 'Full-time',
      description: 'Help enterprise clients maximize the value of our platform.',
      requirements: ['3+ years CS experience', 'Enterprise SaaS', 'Education domain']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Join Our Mission to
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {' '}Transform Education
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-3xl mx-auto">
              We're building the future of learning. Join our passionate team of innovators, 
              educators, and technologists who are making world-class education accessible to everyone.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
                View Open Positions
              </button>
              <button className="rounded-lg border border-gray-300 px-6 py-3 text-gray-700 font-semibold hover:bg-gray-50 transition-all duration-200">
                Learn About Culture
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Why Work With Us
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            We believe in taking care of our team so they can do their best work
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="relative group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-100"
            >
              <div className={`inline-flex p-3 rounded-xl ${benefit.color} text-white mb-6`}>
                <benefit.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {benefit.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Open Positions Section */}
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Open Positions
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Join our team and help shape the future of education
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {openPositions.map((position, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-all duration-200 hover:scale-105"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {position.title}
                    </h3>
                    <p className="text-blue-600 font-medium">
                      {position.department}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-sm text-gray-500 mb-1">
                      <MapPinIcon className="h-4 w-4 mr-1" />
                      {position.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <ClockIcon className="h-4 w-4 mr-1" />
                      {position.type}
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6">
                  {position.description}
                </p>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Requirements:</h4>
                  <div className="flex flex-wrap gap-2">
                    {position.requirements.map((req, reqIndex) => (
                      <span
                        key={reqIndex}
                        className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                      >
                        {req}
                      </span>
                    ))}
                  </div>
                </div>
                
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 hover:scale-105">
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Culture Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-6">
              Our Culture
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              We foster a culture of innovation, collaboration, and continuous learning. 
              Our team is diverse, inclusive, and passionate about making education better for everyone.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                <span className="text-gray-700">Remote-first with flexible work arrangements</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                <span className="text-gray-700">Diverse and inclusive team environment</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                <span className="text-gray-700">Continuous learning and growth opportunities</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-orange-600 rounded-full mr-3"></div>
                <span className="text-gray-700">Impact-driven work that makes a difference</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
              <UserGroupIcon className="h-16 w-16 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Join Our Team</h3>
              <p className="text-blue-100 mb-6">
                We're growing fast and looking for talented individuals who share our passion 
                for education and innovation.
              </p>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">150+</div>
                  <div className="text-blue-100 text-sm">Team Members</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">25+</div>
                  <div className="text-blue-100 text-sm">Countries</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl mb-6">
            Ready to Make an Impact?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join our mission to democratize education and help millions of learners worldwide
          </p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-all duration-200 hover:scale-105 shadow-lg">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CareersPage; 