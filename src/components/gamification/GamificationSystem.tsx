import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrophyIcon,
  StarIcon,
  FireIcon,
  BoltIcon,
  AcademicCapIcon,
  SparklesIcon,
  ClockIcon,
  UserGroupIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import notificationService from '../../services/notificationService';

interface Achievement {
  id: string;
  title: string;
  description: string;
  points: number;
  isUnlocked: boolean;
  unlockedAt?: Date;
  progress?: number;
  maxProgress?: number;
}

interface UserStats {
  level: number;
  experience: number;
  experienceToNext: number;
  totalPoints: number;
  achievementsUnlocked: number;
  currentStreak: number;
  longestStreak: number;
}

const GamificationSystem: React.FC = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [userStats, setUserStats] = useState<UserStats>({
    level: 15,
    experience: 1250,
    experienceToNext: 2000,
    totalPoints: 8750,
    achievementsUnlocked: 12,
    currentStreak: 7,
    longestStreak: 21,
  });
  const [showUnlockAnimation, setShowUnlockAnimation] = useState(false);
  const [unlockedAchievement, setUnlockedAchievement] = useState<Achievement | null>(null);

  useEffect(() => {
    initializeAchievements();
    simulateAchievementUnlock();
  }, []);

  const initializeAchievements = () => {
    const allAchievements: Achievement[] = [
      {
        id: 'first-course',
        title: 'First Steps',
        description: 'Complete your first course',
        points: 100,
        isUnlocked: true,
        unlockedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      },
      {
        id: 'streak-7',
        title: 'Week Warrior',
        description: 'Maintain a 7-day learning streak',
        points: 150,
        isUnlocked: true,
        unlockedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      },
      {
        id: 'perfect-score',
        title: 'Perfect Score',
        description: 'Get 100% on any quiz',
        points: 200,
        isUnlocked: false,
        progress: 85,
        maxProgress: 100,
      },
      {
        id: 'streak-30',
        title: 'Month Master',
        description: 'Maintain a 30-day learning streak',
        points: 500,
        isUnlocked: false,
        progress: 21,
        maxProgress: 30,
      },
    ];

    setAchievements(allAchievements);
  };

  const simulateAchievementUnlock = () => {
    setTimeout(() => {
      const achievementToUnlock = achievements.find(a => a.id === 'perfect-score');
      if (achievementToUnlock && !achievementToUnlock.isUnlocked) {
        unlockAchievement(achievementToUnlock.id);
      }
    }, 3000);
  };

  const unlockAchievement = async (achievementId: string) => {
    const achievement = achievements.find(a => a.id === achievementId);
    if (!achievement || achievement.isUnlocked) return;

    const updatedAchievement = {
      ...achievement,
      isUnlocked: true,
      unlockedAt: new Date(),
    };

    setAchievements(prev => 
      prev.map(a => a.id === achievementId ? updatedAchievement : a)
    );

    setUnlockedAchievement(updatedAchievement);
    setShowUnlockAnimation(true);

    setUserStats(prev => ({
      ...prev,
      totalPoints: prev.totalPoints + achievement.points,
      achievementsUnlocked: prev.achievementsUnlocked + 1,
    }));

    await notificationService.showAchievementUnlocked(achievement.title, achievement.points);

    setTimeout(() => {
      setShowUnlockAnimation(false);
      setUnlockedAchievement(null);
    }, 4000);
  };

  const getExperiencePercentage = () => {
    return (userStats.experience / userStats.experienceToNext) * 100;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
            <TrophyIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Gamification System</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Track your progress and achievements</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <StarIcon className="w-4 h-4 text-yellow-500" />
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {userStats.totalPoints}
          </span>
        </div>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-white">
          <div className="flex items-center space-x-3">
            <AcademicCapIcon className="w-6 h-6" />
            <div>
              <p className="text-sm opacity-90">Level</p>
              <p className="text-2xl font-bold">{userStats.level}</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl text-white">
          <div className="flex items-center space-x-3">
            <FireIcon className="w-6 h-6" />
            <div>
              <p className="text-sm opacity-90">Current Streak</p>
              <p className="text-2xl font-bold">{userStats.currentStreak} days</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl text-white">
          <div className="flex items-center space-x-3">
            <TrophyIcon className="w-6 h-6" />
            <div>
              <p className="text-sm opacity-90">Achievements</p>
              <p className="text-2xl font-bold">{userStats.achievementsUnlocked}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Level Progress */}
      <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl mb-6">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-semibold text-gray-900 dark:text-white">Level Progress</h4>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {userStats.experience}/{userStats.experienceToNext} XP
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3">
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${getExperiencePercentage()}%` }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>
      </div>

      {/* Achievements */}
      <div className="space-y-4">
        <h4 className="font-semibold text-gray-900 dark:text-white">Recent Achievements</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-xl border ${
                achievement.isUnlocked 
                  ? 'bg-white dark:bg-gray-700 border-green-200 dark:border-green-800' 
                  : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-600'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  achievement.isUnlocked 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-300 dark:bg-gray-600 text-gray-500'
                }`}>
                  {achievement.isUnlocked ? (
                    <CheckCircleIcon className="w-5 h-5" />
                  ) : (
                    <TrophyIcon className="w-5 h-5" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h5 className="font-medium text-gray-900 dark:text-white">
                      {achievement.title}
                    </h5>
                    <div className="flex items-center space-x-1">
                      <StarIcon className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {achievement.points}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {achievement.description}
                  </p>
                  {achievement.isUnlocked ? (
                    <div className="flex items-center space-x-2 mt-2">
                      <CheckCircleIcon className="w-4 h-4 text-green-500" />
                      <span className="text-xs text-green-600 dark:text-green-400">
                        Unlocked {achievement.unlockedAt?.toLocaleDateString()}
                      </span>
                    </div>
                  ) : achievement.progress !== undefined ? (
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                        <span>Progress</span>
                        <span>{achievement.progress}/{achievement.maxProgress}</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <motion.div
                          className="bg-blue-500 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${(achievement.progress / achievement.maxProgress!) * 100}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="mt-2">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Not started
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Achievement Unlock Animation */}
      <AnimatePresence>
        {showUnlockAnimation && unlockedAchievement && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <SparklesIcon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Achievement Unlocked!
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                {unlockedAchievement.title}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                {unlockedAchievement.description}
              </p>
              <div className="flex items-center justify-center space-x-2">
                <StarIcon className="w-5 h-5 text-yellow-500" />
                <span className="font-semibold text-gray-900 dark:text-white">
                  +{unlockedAchievement.points} points
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GamificationSystem; 