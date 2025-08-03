import React from 'react';
import { motion } from 'framer-motion';
import { 
  AcademicCapIcon,
  BookOpenIcon,
  ClockIcon,
  ChartBarIcon,
  TrophyIcon,
  PlayIcon,
  ArrowRightIcon,
  FireIcon,
  BoltIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '@/contexts/AuthContext';
import ProgressRing from '@/components/ui/ProgressRing';
import { Badge } from '@/components/ui/Badge';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    { name: 'Courses Enrolled', value: '12', icon: BookOpenIcon, color: 'text-primary-600', bgColor: 'bg-primary-50' },
    { name: 'Hours Learned', value: '48', icon: ClockIcon, color: 'text-secondary-600', bgColor: 'bg-secondary-50' },
    { name: 'Certificates', value: '5', icon: TrophyIcon, color: 'text-accent-600', bgColor: 'bg-accent-50' },
    { name: 'Progress', value: '78%', icon: ChartBarIcon, color: 'text-success-600', bgColor: 'bg-success-50' },
  ];

  const recentCourses = [
    {
      id: 1,
      title: 'Advanced React Development',
      instructor: 'Dr. Sarah Johnson',
      progress: 85,
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop',
      category: 'Programming',
      duration: '8 weeks',
    },
    {
      id: 2,
      title: 'Machine Learning Fundamentals',
      instructor: 'Prof. Michael Chen',
      progress: 62,
      thumbnail: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=200&fit=crop',
      category: 'Data Science',
      duration: '12 weeks',
    },
    {
      id: 3,
      title: 'Digital Marketing Strategy',
      instructor: 'Emma Rodriguez',
      progress: 45,
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop',
      category: 'Marketing',
      duration: '6 weeks',
    },
  ];

  const recommendedCourses = [
    {
      id: 4,
      title: 'AI and Deep Learning',
      instructor: 'Dr. Alex Thompson',
      rating: 4.8,
      students: 1247,
      price: '$89',
      thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop',
      category: 'Artificial Intelligence',
    },
    {
      id: 5,
      title: 'Web Development Bootcamp',
      instructor: 'Jennifer Lee',
      rating: 4.9,
      students: 2156,
      price: '$129',
      thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop',
      category: 'Web Development',
    },
  ];

  const achievements = [
    { id: 1, name: 'First Course', description: 'Completed your first course', icon: TrophyIcon, variant: 'achievement' as const },
    { id: 2, name: '7-Day Streak', description: 'Learned for 7 consecutive days', icon: FireIcon, variant: 'premium' as const },
    { id: 3, name: 'Speed Learner', description: 'Completed 5 courses in a month', icon: BoltIcon, variant: 'level' as const },
  ];

  const currentStreak = 12;
  const totalPoints = 2840;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Continue your learning journey and discover new opportunities
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card p-6"
            >
              <div className="flex items-center">
                <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center mr-4`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.name}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Courses */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Continue Learning
                </h2>
                <button className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 text-sm font-medium">
                  View all courses
                </button>
              </div>
              
              <div className="space-y-4">
                {recentCourses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                  >
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-16 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-white">{course.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{course.instructor}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-xs text-gray-500">{course.category}</span>
                        <span className="text-xs text-gray-500">{course.duration}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {course.progress}%
                      </div>
                      <div className="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mt-1">
                        <div
                          className="h-2 bg-primary-600 rounded-full"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                    <button className="p-2 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg">
                      <PlayIcon className="w-5 h-5" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Achievements */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card p-6 mb-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Recent Achievements
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <Badge variant={achievement.variant} icon={<achievement.icon className="w-4 h-4" />}>
                      {achievement.name}
                    </Badge>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {achievement.name}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Stats Cards */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card p-6 mb-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Learning Stats
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Learning Streak */}
                <div className="text-center p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg">
                  <FireIcon className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {currentStreak} days
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Learning Streak
                  </p>
                </div>

                {/* Total Points */}
                <div className="text-center p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg">
                  <TrophyIcon className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {totalPoints}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Total Points
                  </p>
                </div>

                {/* Overall Progress */}
                <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg">
                  <div className="flex justify-center mb-2">
                    <ProgressRing progress={78} size={60} />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Overall Progress
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Recommended Courses */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Recommended for You
              </h2>
              
              <div className="space-y-4">
                {recommendedCourses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group cursor-pointer"
                  >
                    <div className="relative overflow-hidden rounded-lg mb-3">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 right-2 bg-white dark:bg-gray-800 px-2 py-1 rounded text-sm font-medium">
                        {course.price}
                      </div>
                    </div>
                    <h3 className="font-medium text-gray-900 dark:text-white mb-1 group-hover:text-primary-600 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {course.instructor}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          <span className="text-yellow-400">★</span>
                          <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                            {course.rating}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">
                          ({course.students} students)
                        </span>
                      </div>
                      <button className="text-primary-600 hover:text-primary-700">
                        <ArrowRightIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage; 