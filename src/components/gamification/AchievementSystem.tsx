import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrophyIcon,
  StarIcon,
  FireIcon,
  BoltIcon,
  AcademicCapIcon,
  HeartIcon,
  SparklesIcon,
  RocketLaunchIcon,
  ClockIcon,
  UserGroupIcon,
  BookOpenIcon,
  ChatBubbleLeftRightIcon,
  GlobeAltIcon,
  BeakerIcon,
  ChartBarIcon,
  CogIcon,
  GiftIcon,
  ShieldCheckIcon,
  LightBulbIcon,
} from '@heroicons/react/24/outline';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  category: 'learning' | 'social' | 'engagement' | 'special';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  points: number;
  progress: number;
  maxProgress: number;
  unlocked: boolean;
  unlockedAt?: Date;
  color: string;
}

interface LeaderboardEntry {
  id: string;
  name: string;
  avatar: string;
  points: number;
  rank: number;
  achievements: number;
  streak: number;
}

interface UserStats {
  totalPoints: number;
  totalAchievements: number;
  currentStreak: number;
  longestStreak: number;
  level: number;
  experience: number;
  experienceToNext: number;
}

const AchievementSystem: React.FC = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: 'first-course',
      title: 'First Steps',
      description: 'Complete your first course',
      icon: AcademicCapIcon,
      category: 'learning',
      rarity: 'common',
      points: 10,
      progress: 1,
      maxProgress: 1,
      unlocked: true,
      unlockedAt: new Date('2024-01-15'),
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'streak-7',
      title: 'Week Warrior',
      description: 'Maintain a 7-day learning streak',
      icon: FireIcon,
      category: 'engagement',
      rarity: 'rare',
      points: 50,
      progress: 5,
      maxProgress: 7,
      unlocked: false,
      color: 'from-orange-500 to-red-500',
    },
    {
      id: 'social-butterfly',
      title: 'Social Butterfly',
      description: 'Join 5 study groups',
      icon: UserGroupIcon,
      category: 'social',
      rarity: 'epic',
      points: 100,
      progress: 3,
      maxProgress: 5,
      unlocked: false,
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: 'ai-master',
      title: 'AI Master',
      description: 'Have 100 conversations with AI Tutor',
      icon: ChatBubbleLeftRightIcon,
      category: 'engagement',
      rarity: 'legendary',
      points: 200,
      progress: 67,
      maxProgress: 100,
      unlocked: false,
      color: 'from-indigo-500 to-purple-500',
    },
    {
      id: 'global-learner',
      title: 'Global Learner',
      description: 'Complete courses from 5 different countries',
      icon: GlobeAltIcon,
      category: 'learning',
      rarity: 'epic',
      points: 150,
      progress: 2,
      maxProgress: 5,
      unlocked: false,
      color: 'from-green-500 to-emerald-500',
    },
    {
      id: 'research-pioneer',
      title: 'Research Pioneer',
      description: 'Use 10 different research tools',
      icon: BeakerIcon,
      category: 'learning',
      rarity: 'rare',
      points: 75,
      progress: 7,
      maxProgress: 10,
      unlocked: false,
      color: 'from-yellow-500 to-orange-500',
    },
  ]);

  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([
    { id: '1', name: 'Sarah Chen', avatar: 'SC', points: 2840, rank: 1, achievements: 23, streak: 45 },
    { id: '2', name: 'Mike Johnson', avatar: 'MJ', points: 2150, rank: 2, achievements: 19, streak: 32 },
    { id: '3', name: 'Emily Rodriguez', avatar: 'ER', points: 1890, rank: 3, achievements: 17, streak: 28 },
    { id: '4', name: 'David Kim', avatar: 'DK', points: 1650, rank: 4, achievements: 15, streak: 21 },
    { id: '5', name: 'Lisa Wang', avatar: 'LW', points: 1420, rank: 5, achievements: 13, streak: 18 },
  ]);

  const [userStats, setUserStats] = useState<UserStats>({
    totalPoints: 850,
    totalAchievements: 8,
    currentStreak: 12,
    longestStreak: 25,
    level: 7,
    experience: 1250,
    experienceToNext: 500,
  });

  const [showUnlockAnimation, setShowUnlockAnimation] = useState(false);
  const [unlockedAchievement, setUnlockedAchievement] = useState<Achievement | null>(null);

  // Simulate achievement unlock
  useEffect(() => {
    const interval = setInterval(() => {
      const randomAchievement = achievements.find(a => !a.unlocked && Math.random() > 0.95);
      if (randomAchievement) {
        unlockAchievement(randomAchievement.id);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [achievements]);

  const unlockAchievement = (achievementId: string) => {
    setAchievements(prev => prev.map(achievement => {
      if (achievement.id === achievementId && !achievement.unlocked) {
        setUnlockedAchievement(achievement);
        setShowUnlockAnimation(true);
        setTimeout(() => setShowUnlockAnimation(false), 4000);
        
        return {
          ...achievement,
          unlocked: true,
          unlockedAt: new Date(),
          progress: achievement.maxProgress,
        };
      }
      return achievement;
    }));

    // Update user stats
    const achievement = achievements.find(a => a.id === achievementId);
    setUserStats(prev => ({
      ...prev,
      totalPoints: prev.totalPoints + (achievement?.points || 0),
      totalAchievements: prev.totalAchievements + 1,
    }));
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-600 dark:text-gray-400';
      case 'rare': return 'text-blue-600 dark:text-blue-400';
      case 'epic': return 'text-purple-600 dark:text-purple-400';
      case 'legendary': return 'text-yellow-600 dark:text-yellow-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-300 dark:border-gray-600';
      case 'rare': return 'border-blue-300 dark:border-blue-600';
      case 'epic': return 'border-purple-300 dark:border-purple-600';
      case 'legendary': return 'border-yellow-300 dark:border-yellow-600';
      default: return 'border-gray-300 dark:border-gray-600';
    }
  };

  return (
    <div className="space-y-8">
      {/* Achievement Unlock Animation */}
      <AnimatePresence>
        {showUnlockAnimation && unlockedAchievement && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: -50 }}
            className="fixed top-4 right-4 z-50 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 max-w-sm"
          >
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${unlockedAchievement.color} rounded-lg flex items-center justify-center`}>
                <unlockedAchievement.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Achievement Unlocked!
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {unlockedAchievement.title}
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-400">
                  +{unlockedAchievement.points} points
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* User Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <TrophyIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Points</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {userStats.totalPoints.toLocaleString()}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
              <StarIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Achievements</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {userStats.totalAchievements}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <FireIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Current Streak</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {userStats.currentStreak} days
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <TrophyIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Level</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {userStats.level}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Level Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Level Progress
          </h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {userStats.experience} / {userStats.experience + userStats.experienceToNext} XP
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(userStats.experience / (userStats.experience + userStats.experienceToNext)) * 100}%` }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          {userStats.experienceToNext} XP to next level
        </p>
      </motion.div>

      {/* Achievements Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Achievements
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-2 transition-all duration-300 ${
                achievement.unlocked ? 'border-green-300 dark:border-green-600' : getRarityBorder(achievement.rarity)
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${achievement.color} rounded-lg flex items-center justify-center`}>
                  <achievement.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {achievement.title}
                    </h4>
                    {achievement.unlocked && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-4 h-4 bg-green-500 rounded-full"
                      />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {achievement.description}
                  </p>
                  
                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-gray-500 dark:text-gray-400">Progress</span>
                      <span className={`font-medium ${getRarityColor(achievement.rarity)}`}>
                        {achievement.progress} / {achievement.maxProgress}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <motion.div
                        className={`h-2 rounded-full ${
                          achievement.unlocked 
                            ? 'bg-green-500' 
                            : achievement.rarity === 'legendary' 
                              ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
                              : achievement.rarity === 'epic'
                                ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                                : achievement.rarity === 'rare'
                                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500'
                                  : 'bg-gradient-to-r from-gray-500 to-gray-600'
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                        transition={{ duration: 1, delay: 0.7 + index * 0.1 }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-medium ${getRarityColor(achievement.rarity)}`}>
                      {achievement.rarity.toUpperCase()}
                    </span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      +{achievement.points} pts
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Leaderboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Leaderboard
          </h3>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {leaderboard.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    index === 0 ? 'bg-yellow-500 text-white' :
                    index === 1 ? 'bg-gray-400 text-white' :
                    index === 2 ? 'bg-orange-500 text-white' :
                    'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {entry.avatar}
                  </div>
                </div>
                
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {entry.name}
                  </h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <span>{entry.achievements} achievements</span>
                    <span>•</span>
                    <span>{entry.streak} day streak</span>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {entry.points.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">points</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AchievementSystem; 