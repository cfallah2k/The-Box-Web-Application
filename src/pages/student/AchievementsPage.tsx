import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface Achievement {
  id: string;
  title: string;
  description: string;
  type: 'badge' | 'milestone' | 'certificate' | 'streak' | 'special';
  category: 'learning' | 'social' | 'technical' | 'leadership' | 'creativity';
  icon: string;
  earnedAt: string;
  progress?: number; // 0-100 for incomplete achievements
  isCompleted: boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  points: number;
  requirements?: string[];
  nextMilestone?: string;
}

const AchievementsPage: React.FC = () => {
  const { user } = useAuth();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'completed' | 'in-progress'>('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    const loadAchievements = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockAchievements: Achievement[] = [
        {
          id: '1',
          title: 'First Steps',
          description: 'Complete your first course',
          type: 'milestone',
          category: 'learning',
          icon: '🎯',
          earnedAt: '2024-01-15T10:30:00Z',
          isCompleted: true,
          rarity: 'common',
          points: 50
        },
        {
          id: '2',
          title: 'React Master',
          description: 'Complete 5 React-related courses with 90%+ average',
          type: 'badge',
          category: 'technical',
          icon: '⚛️',
          earnedAt: '2024-01-18T14:20:00Z',
          isCompleted: true,
          rarity: 'rare',
          points: 200,
          requirements: ['Complete 5 React courses', 'Maintain 90%+ average']
        },
        {
          id: '3',
          title: 'Study Streak',
          description: 'Study for 7 consecutive days',
          type: 'streak',
          category: 'learning',
          icon: '🔥',
          progress: 85,
          isCompleted: false,
          rarity: 'common',
          points: 100,
          nextMilestone: '5 days remaining'
        },
        {
          id: '4',
          title: 'Helpful Mentor',
          description: 'Help 10 other students in study groups',
          type: 'badge',
          category: 'social',
          icon: '🤝',
          progress: 60,
          isCompleted: false,
          rarity: 'epic',
          points: 300,
          nextMilestone: '4 more students to help'
        },
        {
          id: '5',
          title: 'Perfect Score',
          description: 'Get 100% on any quiz',
          type: 'badge',
          category: 'learning',
          icon: '💯',
          earnedAt: '2024-01-20T09:15:00Z',
          isCompleted: true,
          rarity: 'rare',
          points: 150
        },
        {
          id: '6',
          title: 'Early Bird',
          description: 'Complete a course before the deadline',
          type: 'milestone',
          category: 'learning',
          icon: '🌅',
          earnedAt: '2024-01-12T16:45:00Z',
          isCompleted: true,
          rarity: 'common',
          points: 75
        },
        {
          id: '7',
          title: 'JavaScript Ninja',
          description: 'Master advanced JavaScript concepts',
          type: 'certificate',
          category: 'technical',
          icon: '⚔️',
          progress: 45,
          isCompleted: false,
          rarity: 'legendary',
          points: 500,
          nextMilestone: 'Complete 3 more advanced modules'
        },
        {
          id: '8',
          title: 'Creative Coder',
          description: 'Build 5 unique projects',
          type: 'badge',
          category: 'creativity',
          icon: '🎨',
          progress: 80,
          isCompleted: false,
          rarity: 'epic',
          points: 400,
          nextMilestone: '1 more project to complete'
        }
      ];

      setAchievements(mockAchievements);
      setLoading(false);
    };

    loadAchievements();
  }, []);

  const filteredAchievements = achievements.filter(achievement => {
    const matchesStatus = filter === 'all' || 
      (filter === 'completed' && achievement.isCompleted) ||
      (filter === 'in-progress' && !achievement.isCompleted);
    const matchesCategory = categoryFilter === 'all' || achievement.category === categoryFilter;
    return matchesStatus && matchesCategory;
  });

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-300 bg-gray-50';
      case 'rare': return 'border-blue-300 bg-blue-50';
      case 'epic': return 'border-purple-300 bg-purple-50';
      case 'legendary': return 'border-yellow-300 bg-yellow-50';
      default: return 'border-gray-300 bg-gray-50';
    }
  };

  const getRarityText = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'Common';
      case 'rare': return 'Rare';
      case 'epic': return 'Epic';
      case 'legendary': return 'Legendary';
      default: return 'Common';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'learning': return 'bg-blue-100 text-blue-800';
      case 'social': return 'bg-green-100 text-green-800';
      case 'technical': return 'bg-purple-100 text-purple-800';
      case 'leadership': return 'bg-yellow-100 text-yellow-800';
      case 'creativity': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const totalPoints = achievements.filter(a => a.isCompleted).reduce((sum, a) => sum + a.points, 0);
  const completedCount = achievements.filter(a => a.isCompleted).length;
  const totalCount = achievements.length;
  const completionRate = Math.round((completedCount / totalCount) * 100);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading achievements...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Achievements</h1>
          <p className="text-gray-600">Track your learning milestones and accomplishments</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Points</p>
                <p className="text-2xl font-bold text-gray-900">{totalPoints.toLocaleString()}</p>
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
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{completedCount}/{totalCount}</p>
                <p className="text-sm text-gray-500">{completionRate}% completion</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Rare Achievements</p>
                <p className="text-2xl font-bold text-gray-900">
                  {achievements.filter(a => a.isCompleted && a.rarity !== 'common').length}
                </p>
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
                <p className="text-2xl font-bold text-gray-900">5 days</p>
                <p className="text-sm text-gray-500">Keep it up!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex gap-2">
              {(['all', 'completed', 'in-progress'] as const).map((filterType) => (
                <button
                  key={filterType}
                  onClick={() => setFilter(filterType)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    filter === filterType
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filterType === 'in-progress' ? 'In Progress' : 
                   filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                </button>
              ))}
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="learning">Learning</option>
              <option value="social">Social</option>
              <option value="technical">Technical</option>
              <option value="leadership">Leadership</option>
              <option value="creativity">Creativity</option>
            </select>
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`bg-white rounded-lg shadow-lg p-6 border-2 transition-all hover:shadow-xl ${
                achievement.isCompleted ? getRarityColor(achievement.rarity) : 'border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{achievement.icon}</div>
                <div className="text-right">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(achievement.category)}`}>
                    {achievement.category.charAt(0).toUpperCase() + achievement.category.slice(1)}
                  </span>
                  <div className="mt-1">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      achievement.rarity === 'common' ? 'bg-gray-100 text-gray-800' :
                      achievement.rarity === 'rare' ? 'bg-blue-100 text-blue-800' :
                      achievement.rarity === 'epic' ? 'bg-purple-100 text-purple-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {getRarityText(achievement.rarity)}
                    </span>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">{achievement.title}</h3>
              <p className="text-gray-600 mb-4">{achievement.description}</p>

              {achievement.isCompleted ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Earned</span>
                    <span className="font-medium text-gray-900">{formatDate(achievement.earnedAt)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Points</span>
                    <span className="font-bold text-green-600">+{achievement.points}</span>
                  </div>
                  <div className="flex items-center text-green-600">
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium">Completed</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium text-gray-900">{achievement.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${achievement.progress}%` }}
                    ></div>
                  </div>
                  {achievement.nextMilestone && (
                    <p className="text-sm text-gray-500">{achievement.nextMilestone}</p>
                  )}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Points</span>
                    <span className="font-bold text-blue-600">{achievement.points}</span>
                  </div>
                </div>
              )}

              {achievement.requirements && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Requirements:</h4>
                  <ul className="space-y-1">
                    {achievement.requirements.map((req, index) => (
                      <li key={index} className="text-xs text-gray-600 flex items-center">
                        <svg className="w-3 h-3 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredAchievements.length === 0 && (
          <div className="text-center py-12">
            <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No achievements found</h3>
            <p className="text-gray-600 mb-6">
              {filter === 'all' ? 'Start learning to earn achievements!' : `No ${filter} achievements.`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AchievementsPage;
