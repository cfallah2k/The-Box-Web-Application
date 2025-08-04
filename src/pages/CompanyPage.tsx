import React from 'react';
import { 
  BuildingOfficeIcon,
  UserGroupIcon,
  GlobeAltIcon,
  LightBulbIcon,
  HeartIcon,
  ShieldCheckIcon,
  AcademicCapIcon,
  RocketLaunchIcon,
  ChartBarIcon,
  StarIcon
} from '@heroicons/react/24/outline';

const CompanyPage: React.FC = () => {
  const values = [
    {
      title: 'Innovation First',
      description: 'We push the boundaries of what\'s possible in education technology.',
      icon: LightBulbIcon,
      color: 'bg-gradient-to-r from-yellow-500 to-orange-500'
    },
    {
      title: 'Learner Centered',
      description: 'Every decision we make is focused on improving the learning experience.',
      icon: HeartIcon,
      color: 'bg-gradient-to-r from-red-500 to-pink-500'
    },
    {
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, from code to customer service.',
      icon: StarIcon,
      color: 'bg-gradient-to-r from-yellow-400 to-yellow-600'
    },
    {
      title: 'Integrity',
      description: 'We operate with transparency, honesty, and ethical business practices.',
      icon: ShieldCheckIcon,
      color: 'bg-gradient-to-r from-green-500 to-emerald-500'
    }
  ];

  const team = [
    {
      name: 'Dr. Sarah Chen',
      role: 'CEO & Founder',
      bio: 'Former Stanford professor with 15+ years in EdTech innovation.',
      image: '/api/placeholder/150/150'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'CTO',
      bio: 'Ex-Google engineer leading our AI and platform development.',
      image: '/api/placeholder/150/150'
    },
    {
      name: 'Dr. Emily Watson',
      role: 'Head of Learning',
      bio: 'Educational psychologist specializing in adaptive learning systems.',
      image: '/api/placeholder/150/150'
    },
    {
      name: 'Alex Thompson',
      role: 'Head of Product',
      bio: 'Product leader with experience at Coursera and Udemy.',
      image: '/api/placeholder/150/150'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Building the Future of
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {' '}Education
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-3xl mx-auto">
              We're a mission-driven company dedicated to making world-class education accessible 
              to everyone through innovative technology and AI-powered learning experiences.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
                Join Our Team
              </button>
              <button className="rounded-lg border border-gray-300 px-6 py-3 text-gray-700 font-semibold hover:bg-gray-50 transition-all duration-200">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              We believe that education should be personalized, accessible, and engaging. 
              Our mission is to democratize learning by leveraging cutting-edge AI technology 
              to create adaptive, interactive learning experiences that work for everyone.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Since our founding in 2020, we've helped over 2 million learners worldwide 
              achieve their educational goals and advance their careers.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">2M+</div>
                <div className="text-gray-600">Learners Worldwide</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">500+</div>
                <div className="text-gray-600">Expert Instructors</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
              <GlobeAltIcon className="h-16 w-16 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Global Impact</h3>
              <p className="text-blue-100">
                Our platform reaches learners in 150+ countries, breaking down barriers 
                to education and creating opportunities for people everywhere.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Our Values
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center group"
              >
                <div className={`inline-flex p-4 rounded-xl ${value.color} text-white mb-6`}>
                  <value.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Meet Our Leadership
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            The passionate team driving our mission forward
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className="text-center group"
            >
              <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                {member.name.split(' ').map(n => n[0]).join('')}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {member.name}
              </h3>
              <p className="text-blue-600 font-medium mb-4">
                {member.role}
              </p>
              <p className="text-gray-600 text-sm">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl mb-6">
            Join Us in Shaping the Future
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            We're always looking for talented individuals who share our passion for education and innovation
          </p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-all duration-200 hover:scale-105 shadow-lg">
            View Open Positions
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyPage; 