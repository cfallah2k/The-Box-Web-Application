import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface ProgressData {
  totalCourses: number;
  completedCourses: number;
  totalHours: number;
  currentStreak: number;
  longestStreak: number;
  totalPoints: number;
  level: number;
  achievements: Achievement[];
  recentActivity: Activity[];
  weeklyProgress: WeeklyProgress[];
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedDate: string;
  points: number;
}

interface Activity {
  id: string;
  type: 'course_completed' | 'lesson_finished' | 'achievement_earned' | 'streak_milestone';
  title: string;
  description: string;
  timestamp: string;
  points?: number;
}

interface WeeklyProgress {
  week: string;
  hours: number;
  lessons: number;
  points: number;
}

const ProgressPage: React.FC = () => {
  const { user } = useAuth();
  const [progressData, setProgressData] = useState<ProgressData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProgress = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockProgressData: ProgressData = {
        totalCourses: 12,
        completedCourses: 8,
        totalHours: 156,
        currentStreak: 7,
        longestStreak: 21,
        totalPoints: 2840,
        level: 15,
        achievements: [
          {
            id: '1',
            name: 'First Course Complete',
            description: 'Completed your first course',
            icon: '🎓',
            earnedDate: '2024-01-15',
            points: 100
          },
          {
            id: '2',
            name: 'Week Warrior',
            description: 'Maintained a 7-day learning streak',
            icon: '🔥',
            earnedDate: '2024-01-20',
            points: 200
          }
        ],
        recentActivity: [
          {
            id: '1',
            type: 'course_completed',
            title: 'Completed React Fundamentals',
            description: 'You finished the React Fundamentals course',
            timestamp: '2024-01-20T10:30:00Z',
            points: 150
          },
          {
            id: '2',
            type: 'achievement_earned',
            title: 'Week Warrior Achievement',
            description: 'You earned the Week Warrior badge',
            timestamp: '2024-01-19T14:20:00Z',
            points: 200
          }
        ],
        weeklyProgress: [
          { week: 'Week 1', hours: 12, lessons: 8, points: 450 },
          { week: 'Week 2', hours: 15, lessons: 10, points: 520 },
          { week: 'Week 3', hours: 18, lessons: 12, points: 680 },
          { week: 'Week 4', hours: 20, lessons: 15, points: 750 }
        ]
      };
      
      setProgressData(mockProgressData);
      setLoading(false);
    };

    loadProgress();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your progress...</p>
        </div>
      </div>
    );
  }

  if (!progressData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No progress data found</h2>
        </div>
      </div>
    );
  }

  const completionRate = Math.round((progressData.completedCourses / progressData.totalCourses) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Progress</h1>
          <p className="text-gray-600">Track your learning journey and achievements</p>
        </div>

        {/* Level and Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Level</p>
                <p className="text-3xl font-bold">{progressData.level}</p>
              </div>
              <div className="text-4xl">⭐</div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-sm opacity-90 mb-1">
                <span>Progress to next level</span>
                <span>75%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div className="bg-white h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Courses Completed</p>
                <p className="text-2xl font-bold text-gray-900">{progressData.completedCourses}/{progressData.totalCourses}</p>
                <p className="text-sm text-gray-500">{completionRate}% completion rate</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Hours</p>
                <p className="text-2xl font-bold text-gray-900">{progressData.totalHours}</p>
                <p className="text-sm text-gray-500">Hours of learning</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Current Streak</p>
                <p className="text-2xl font-bold text-gray-900">{progressData.currentStreak} days</p>
                <p className="text-sm text-gray-500">Best: {progressData.longestStreak} days</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Achievements */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Achievements</h2>
            <div className="space-y-4">
              {progressData.achievements.map((achievement) => (
                <div key={achievement.id} className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl mr-4">{achievement.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{achievement.name}</h3>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                    <p className="text-xs text-gray-500 mt-1">Earned {achievement.earnedDate}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      +{achievement.points} pts
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {progressData.recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activity.type === 'course_completed' ? 'bg-green-100' :
                      activity.type === 'achievement_earned' ? 'bg-yellow-100' :
                      activity.type === 'lesson_finished' ? 'bg-blue-100' :
                      'bg-purple-100'
                    }`}>
                      {activity.type === 'course_completed' && (
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                      {activity.type === 'achievement_earned' && (
                        <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-600">{activity.description}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(activity.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                  {activity.points && (
                    <div className="flex-shrink-0">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        +{activity.points}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Weekly Progress Chart */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Weekly Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {progressData.weeklyProgress.map((week, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">{week.week}</h3>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-gray-600">Hours</p>
                    <p className="text-lg font-bold text-blue-600">{week.hours}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Lessons</p>
                    <p className="text-lg font-bold text-green-600">{week.lessons}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Points</p>
                    <p className="text-lg font-bold text-purple-600">{week.points}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;
