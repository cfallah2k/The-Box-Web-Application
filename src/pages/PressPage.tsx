import {
  ArrowTopRightOnSquareIcon,
  CalendarIcon,
  DocumentTextIcon,
  PhotoIcon,
  UserIcon,
  VideoCameraIcon,
} from '@heroicons/react/24/outline';
import React from 'react';

const PressPage: React.FC = () => {
  const pressReleases = [
    {
      title:
        'Company Raises $50M Series B to Accelerate AI-Powered Learning Platform',
      date: 'March 15, 2024',
      excerpt:
        'Funding will support expansion of AI capabilities and global market reach.',
      category: 'Funding',
    },
    {
      title: 'Platform Reaches 2 Million Learners Worldwide',
      date: 'February 28, 2024',
      excerpt:
        'Milestone achieved as company continues rapid growth in online education market.',
      category: 'Milestone',
    },
    {
      title: 'New AI Tutor Feature Launches with Advanced Personalization',
      date: 'January 20, 2024',
      excerpt:
        'Revolutionary AI technology provides personalized learning experiences for every student.',
      category: 'Product Launch',
    },
    {
      title: 'Partnership Announced with Leading Universities',
      date: 'December 10, 2023',
      excerpt:
        'Strategic partnerships with top-tier institutions to expand course offerings.',
      category: 'Partnership',
    },
    {
      title: "Company Named to Fast Company's Most Innovative Companies List",
      date: 'November 5, 2023',
      excerpt:
        'Recognition for breakthrough innovations in education technology.',
      category: 'Award',
    },
    {
      title: 'Expansion into European Markets Announced',
      date: 'October 15, 2023',
      excerpt:
        'Platform now available in 15 European countries with localized content.',
      category: 'Expansion',
    },
  ];

  const mediaResources = [
    {
      title: 'Company Logo',
      description: 'High-resolution logo files in various formats',
      icon: PhotoIcon,
      downloads: ['PNG', 'SVG', 'EPS'],
    },
    {
      title: 'Product Screenshots',
      description: 'Latest platform screenshots and interface images',
      icon: PhotoIcon,
      downloads: ['JPG', 'PNG'],
    },
    {
      title: 'Executive Headshots',
      description: 'Professional photos of company leadership',
      icon: UserIcon,
      downloads: ['JPG', 'PNG'],
    },
    {
      title: 'Brand Guidelines',
      description: 'Complete brand style guide and usage guidelines',
      icon: DocumentTextIcon,
      downloads: ['PDF'],
    },
    {
      title: 'Product Videos',
      description: 'Demo videos and platform walkthroughs',
      icon: VideoCameraIcon,
      downloads: ['MP4', 'MOV'],
    },
    {
      title: 'Company Fact Sheet',
      description: 'Key facts, statistics, and company information',
      icon: DocumentTextIcon,
      downloads: ['PDF'],
    },
  ];

  const recentCoverage = [
    {
      publication: 'TechCrunch',
      title: 'AI-Powered Learning Platform Raises $50M',
      date: 'March 15, 2024',
      url: '#',
      logo: 'TC',
    },
    {
      publication: 'EdSurge',
      title: 'How AI is Personalizing Online Education',
      date: 'February 20, 2024',
      url: '#',
      logo: 'ES',
    },
    {
      publication: 'Forbes',
      title: 'The Future of EdTech: AI-Driven Learning',
      date: 'January 30, 2024',
      url: '#',
      logo: 'F',
    },
    {
      publication: 'Wired',
      title: 'Revolutionizing Education with Machine Learning',
      date: 'December 15, 2023',
      url: '#',
      logo: 'W',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Press & Media
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-3xl mx-auto">
              Stay up to date with our latest news, press releases, and media
              resources. For press inquiries, please contact our media relations
              team.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
                Contact Media Relations
              </button>
              <button className="rounded-lg border border-gray-300 px-6 py-3 text-gray-700 font-semibold hover:bg-gray-50 transition-all duration-200">
                Download Press Kit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Press Releases Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Latest Press Releases
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Official announcements and company news
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {pressReleases.map((release, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-all duration-200 hover:scale-105"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium">
                  {release.category}
                </span>
                <div className="flex items-center text-sm text-gray-500">
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  {release.date}
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {release.title}
              </h3>

              <p className="text-gray-600 mb-6">{release.excerpt}</p>

              <button className="flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                Read Full Release
                <ArrowTopRightOnSquareIcon className="h-4 w-4 ml-1" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Media Resources Section */}
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Media Resources
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Download logos, images, and brand materials
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mediaResources.map((resource, index) => (
              <div
                key={index}
                className="bg-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200 hover:scale-105"
              >
                <div className="flex items-center mb-4">
                  <resource.icon className="h-8 w-8 text-blue-600 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    {resource.title}
                  </h3>
                </div>

                <p className="text-gray-600 mb-4">{resource.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {resource.downloads.map((format, formatIndex) => (
                    <span
                      key={formatIndex}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                    >
                      {format}
                    </span>
                  ))}
                </div>

                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 hover:scale-105">
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Coverage Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Recent Media Coverage
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            What the press is saying about us
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {recentCoverage.map((coverage, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200 hover:scale-105"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                  {coverage.logo}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  {coverage.date}
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {coverage.title}
              </h3>

              <p className="text-blue-600 font-medium mb-4">
                {coverage.publication}
              </p>

              <button className="flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                Read Article
                <ArrowTopRightOnSquareIcon className="h-4 w-4 ml-1" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl mb-6">
            Get in Touch
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            For press inquiries, media interviews, or additional information,
            our media relations team is here to help.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">
                Media Relations
              </h3>
              <p className="text-blue-100 mb-4">
                For press releases, interviews, and media inquiries
              </p>
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200">
                Contact Press Team
              </button>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">
                Analyst Relations
              </h3>
              <p className="text-blue-100 mb-4">
                For industry analysts and research firms
              </p>
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200">
                Contact Analyst Team
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PressPage;
