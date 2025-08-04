import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UserIcon, 
  AcademicCapIcon, 
  TrophyIcon, 
  HeartIcon, 
  StarIcon, 
  FireIcon,
  ClockIcon,
  SparklesIcon,
  CheckCircleIcon,
  PlusIcon,
  BookOpenIcon,
  ChatBubbleLeftRightIcon,
  UserGroupIcon,
  BoltIcon
} from '@heroicons/react/24/outline';

interface UserActivity {
  id: string;
  type: 'course_completed' | 'enrolled' | 'achievement' | 'streak' | 'review' | 'joined_cohort' | 'ai_chat' | 'certificate';
  user: {
    name: string;
    avatar: string;
    country: string;
  };
  action: string;
  target: string;
  timestamp: Date;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

const activityTypes = [
  {
    type: 'course_completed' as const,
    action: 'completed',
    icon: <CheckCircleIcon className="w-4 h-4" />,
    color: 'text-green-600',
    bgColor: 'bg-green-100 dark:bg-green-900/20',
  },
  {
    type: 'enrolled' as const,
    action: 'enrolled in',
    icon: <PlusIcon className="w-4 h-4" />,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100 dark:bg-blue-900/20',
  },
  {
    type: 'achievement' as const,
    action: 'earned achievement',
    icon: <TrophyIcon className="w-4 h-4" />,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100 dark:bg-yellow-900/20',
  },
  {
    type: 'streak' as const,
    action: 'maintained',
    icon: <FireIcon className="w-4 h-4" />,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100 dark:bg-orange-900/20',
  },
  {
    type: 'review' as const,
    action: 'reviewed',
    icon: <StarIcon className="w-4 h-4" />,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100 dark:bg-purple-900/20',
  },
  {
    type: 'joined_cohort' as const,
    action: 'joined cohort',
    icon: <UserGroupIcon className="w-4 h-4" />,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100 dark:bg-indigo-900/20',
  },
  {
    type: 'ai_chat' as const,
    action: 'had AI tutor session',
    icon: <ChatBubbleLeftRightIcon className="w-4 h-4" />,
    color: 'text-pink-600',
    bgColor: 'bg-pink-100 dark:bg-pink-900/20',
  },
  {
    type: 'certificate' as const,
    action: 'earned certificate',
    icon: <AcademicCapIcon className="w-4 h-4" />,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-100 dark:bg-emerald-900/20',
  },
];

const userNames = [
  'Sarah Chen', 'Mike Johnson', 'Emily Rodriguez', 'David Kim', 'Lisa Wang',
  'Alex Thompson', 'Maria Garcia', 'James Wilson', 'Anna Lee', 'Carlos Mendez',
  'Sophie Brown', 'Ryan Davis', 'Nina Patel', 'Tom Anderson', 'Zoe Williams',
  'Kevin Zhang', 'Rachel Green', 'Daniel Martinez', 'Amanda Taylor', 'Chris Lee'
];

const courseNames = [
  'Machine Learning Fundamentals', 'Web Development Bootcamp', 'Data Science Essentials',
  'Python for Beginners', 'React Advanced Patterns', 'AWS Cloud Practitioner',
  'UI/UX Design Mastery', 'DevOps Engineering', 'Mobile App Development',
  'Cybersecurity Basics', 'Blockchain Fundamentals', 'AI Ethics & Governance'
];

const achievementNames = [
  'First Course Completed', '7-Day Streak', 'Perfect Score', 'Helpful Reviewer',
  'Early Bird', 'Night Owl', 'Social Butterfly', 'Problem Solver', 'Quick Learner',
  'Dedicated Student', 'Course Creator', 'Community Leader'
];

const cohortNames = [
  'Spring 2024 Data Science', 'Summer Web Dev', 'Fall AI Cohort', 'Winter UX Design',
  'Advanced ML Group', 'Frontend Masters', 'Backend Developers', 'Full Stack Warriors'
];

const LiveUserActivity: React.FC = () => {
  const [activities, setActivities] = useState<UserActivity[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  // Generate random activity
  const generateActivity = (): UserActivity => {
    const activityType = activityTypes[Math.floor(Math.random() * activityTypes.length)];
    const userName = userNames[Math.floor(Math.random() * userNames.length)];
    const userCountry = ['USA', 'UK', 'Canada', 'Australia', 'Germany', 'India', 'Brazil', 'Japan'][Math.floor(Math.random() * 8)];
    
    let target = '';
    switch (activityType.type) {
      case 'course_completed':
      case 'enrolled':
        target = courseNames[Math.floor(Math.random() * courseNames.length)];
        break;
      case 'achievement':
        target = achievementNames[Math.floor(Math.random() * achievementNames.length)];
        break;
      case 'streak':
        target = `${Math.floor(Math.random() * 30) + 1} day learning streak`;
        break;
      case 'review':
        target = courseNames[Math.floor(Math.random() * courseNames.length)];
        break;
      case 'joined_cohort':
        target = cohortNames[Math.floor(Math.random() * cohortNames.length)];
        break;
      case 'ai_chat':
        target = 'AI Tutor Session';
        break;
      case 'certificate':
        target = courseNames[Math.floor(Math.random() * courseNames.length)];
        break;
    }

    return {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      type: activityType.type,
      user: {
        name: userName,
        avatar: `https://i.pravatar.cc/150?u=${userName}`,
        country: userCountry,
      },
      action: activityType.action,
      target,
      timestamp: new Date(),
      icon: activityType.icon,
      color: activityType.color,
      bgColor: activityType.bgColor,
    };
  };

  // Add new activity
  const addActivity = () => {
    const newActivity = generateActivity();
    setActivities(prev => [newActivity, ...prev.slice(0, 9)]); // Keep only 10 activities
  };

  // Start activity feed
  useEffect(() => {
    setIsVisible(true);
    
    // Add initial activities
    const initialActivities = Array.from({ length: 5 }, () => generateActivity());
    setActivities(initialActivities);

    // Add new activity every 3-8 seconds
    const interval = setInterval(() => {
      addActivity();
    }, 3000 + Math.random() * 5000);

    return () => clearInterval(interval);
  }, []);

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - timestamp.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
            <BoltIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Live Activity Feed</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Real-time user activities</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-500 dark:text-gray-400">Live</span>
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
        <AnimatePresence>
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.95 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`flex items-start space-x-3 p-3 rounded-xl border border-gray-100 dark:border-gray-700 ${activity.bgColor}`}
            >
              {/* User Avatar */}
              <div className="flex-shrink-0">
                <img
                  src={activity.user.avatar}
                  alt={activity.user.name}
                  className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-700 shadow-sm"
                />
              </div>

              {/* Activity Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 dark:text-white font-medium">
                      {activity.user.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {activity.action} <span className="font-medium">{activity.target}</span>
                    </p>
                  </div>
                  
                  {/* Activity Icon */}
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${activity.bgColor} ${activity.color}`}>
                    {activity.icon}
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {activity.user.country}
                    </span>
                    <span className="text-xs text-gray-400 dark:text-gray-500">•</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                      <ClockIcon className="w-3 h-3 mr-1" />
                      {formatTimeAgo(activity.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Stats Footer */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-2">
            <SparklesIcon className="w-3 h-3" />
            <span>Updates every 3-8 seconds</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>{activities.length} recent activities</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveUserActivity; 