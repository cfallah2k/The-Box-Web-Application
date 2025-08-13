import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface Course {
  id: string;
  title: string;
  instructor: string;
  progress: number;
  lastAccessed: Date;
  nextLesson: string;
  estimatedCompletion: Date;
  grade?: number;
  thumbnail: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earnedAt: Date;
  points: number;
  category: 'learning' | 'streak' | 'social' | 'mastery';
}

interface StudySession {
  id: string;
  date: Date;
  duration: number; // in minutes
  course: string;
  topics: string[];
  efficiency: number; // 0-100
}

interface LearningGoal {
  id: string;
  title: string;
  targetDate: Date;
  progress: number;
  type: 'course' | 'skill' | 'certification';
  status: 'on-track' | 'behind' | 'completed';
}

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [studySessions, setStudySessions] = useState<StudySession[]>([]);
  const [learningGoals, setLearningGoals] = useState<LearningGoal[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    'overview' | 'courses' | 'progress' | 'achievements'
  >('overview');

  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockCourses: Course[] = [
        {
          id: '1',
          title: 'React Development Fundamentals',
          instructor: 'Sarah Johnson',
          progress: 75,
          lastAccessed: new Date(Date.now() - 2 * 60 * 60 * 1000),
          nextLesson: 'Advanced Hooks',
          estimatedCompletion: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          grade: 92,
          thumbnail: '/api/placeholder/300/200',
        },
        {
          id: '2',
          title: 'Advanced JavaScript Concepts',
          instructor: 'Mike Chen',
          progress: 45,
          lastAccessed: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          nextLesson: 'Async Programming',
          estimatedCompletion: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
          grade: 88,
          thumbnail: '/api/placeholder/300/200',
        },
        {
          id: '3',
          title: 'UI/UX Design Masterclass',
          instructor: 'Emily Rodriguez',
          progress: 20,
          lastAccessed: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          nextLesson: 'Design Systems',
          estimatedCompletion: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
          thumbnail: '/api/placeholder/300/200',
        },
      ];

      const mockAchievements: Achievement[] = [
        {
          id: '1',
          title: 'First Steps',
          description: 'Complete your first lesson',
          icon: '🎯',
          earnedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          points: 50,
          category: 'learning',
        },
        {
          id: '2',
          title: 'Week Warrior',
          description: 'Study for 7 consecutive days',
          icon: '🔥',
          earnedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          points: 100,
          category: 'streak',
        },
        {
          id: '3',
          title: 'Perfect Score',
          description: 'Get 100% on a quiz',
          icon: '⭐',
          earnedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          points: 75,
          category: 'mastery',
        },
      ];

      const mockStudySessions: StudySession[] = [
        {
          id: '1',
          date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          duration: 45,
          course: 'React Development Fundamentals',
          topics: ['Hooks', 'State Management'],
          efficiency: 85,
        },
        {
          id: '2',
          date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          duration: 30,
          course: 'Advanced JavaScript Concepts',
          topics: ['Promises', 'Async/Await'],
          efficiency: 92,
        },
      ];

      const mockLearningGoals: LearningGoal[] = [
        {
          id: '1',
          title: 'Complete React Fundamentals',
          targetDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          progress: 75,
          type: 'course',
          status: 'on-track',
        },
        {
          id: '2',
          title: 'Master JavaScript Async',
          targetDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
          progress: 45,
          type: 'skill',
          status: 'on-track',
        },
        {
          id: '3',
          title: 'Get Web Development Certificate',
          targetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          progress: 60,
          type: 'certification',
          status: 'behind',
        },
      ];

      setCourses(mockCourses);
      setAchievements(mockAchievements);
      setStudySessions(mockStudySessions);
      setLearningGoals(mockLearningGoals);
      setLoading(false);
    };

    loadDashboardData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track':
        return 'text-green-600 bg-green-100';
      case 'behind':
        return 'text-red-600 bg-red-100';
      case 'completed':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'learning':
        return 'bg-blue-100 text-blue-800';
      case 'streak':
        return 'bg-orange-100 text-orange-800';
      case 'social':
        return 'bg-purple-100 text-purple-800';
      case 'mastery':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600">
            Track your progress and continue your learning journey
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Active Courses
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {courses.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Avg Progress
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(
                    courses.reduce((sum, course) => sum + course.progress, 0) /
                      courses.length
                  )}
                  %
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Achievements
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {achievements.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <svg
                  className="w-6 h-6 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Study Time</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatDuration(
                    studySessions.reduce(
                      (sum, session) => sum + session.duration,
                      0
                    )
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {(
                ['overview', 'courses', 'progress', 'achievements'] as const
              ).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Continue Learning */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Continue Learning
                  </h3>
                  <div className="space-y-4">
                    {courses.slice(0, 3).map(course => (
                      <div
                        key={course.id}
                        className="bg-gray-50 rounded-lg p-4"
                      >
                        <div className="flex items-center space-x-4">
                          <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="w-16 h-12 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">
                              {course.title}
                            </h4>
                            <p className="text-sm text-gray-600">
                              Next: {course.nextLesson}
                            </p>
                            <div className="mt-2">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">
                                  {course.progress}% complete
                                </span>
                                <span className="text-gray-500">
                                  {formatDate(course.lastAccessed)}
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                                <div
                                  className="bg-blue-600 h-2 rounded-full"
                                  style={{ width: `${course.progress}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Learning Goals */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Learning Goals
                  </h3>
                  <div className="space-y-4">
                    {learningGoals.map(goal => (
                      <div key={goal.id} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">
                            {goal.title}
                          </h4>
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                              goal.status
                            )}`}
                          >
                            {goal.status.replace('-', ' ')}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          Due: {formatDate(goal.targetDate)}
                        </p>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: `${goal.progress}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>{goal.progress}% complete</span>
                          <span>{goal.type}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Achievements */}
                <div className="lg:col-span-2">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Recent Achievements
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {achievements.slice(0, 3).map(achievement => (
                      <div
                        key={achievement.id}
                        className="bg-gray-50 rounded-lg p-4 text-center"
                      >
                        <div className="text-3xl mb-2">{achievement.icon}</div>
                        <h4 className="font-medium text-gray-900">
                          {achievement.title}
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">
                          {achievement.description}
                        </p>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(
                            achievement.category
                          )}`}
                        >
                          +{achievement.points} pts
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'courses' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  My Courses
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map(course => (
                    <div
                      key={course.id}
                      className="bg-white border border-gray-200 rounded-lg overflow-hidden"
                    >
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-32 object-cover"
                      />
                      <div className="p-4">
                        <h4 className="font-medium text-gray-900 mb-1">
                          {course.title}
                        </h4>
                        <p className="text-sm text-gray-600 mb-3">
                          by {course.instructor}
                        </p>

                        <div className="mb-3">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-gray-600">Progress</span>
                            <span className="text-gray-900">
                              {course.progress}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                        </div>

                        {course.grade && (
                          <div className="mb-3">
                            <div className="text-sm text-gray-600">
                              Current Grade
                            </div>
                            <div className="text-lg font-semibold text-gray-900">
                              {course.grade}%
                            </div>
                          </div>
                        )}

                        <div className="text-sm text-gray-500 mb-4">
                          <div>Next: {course.nextLesson}</div>
                          <div>
                            Est. completion:{' '}
                            {formatDate(course.estimatedCompletion)}
                          </div>
                        </div>

                        <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          Continue Learning
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'progress' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Learning Progress
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Study Sessions */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">
                      Recent Study Sessions
                    </h4>
                    <div className="space-y-4">
                      {studySessions.map(session => (
                        <div
                          key={session.id}
                          className="bg-gray-50 rounded-lg p-4"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-medium text-gray-900">
                              {session.course}
                            </h5>
                            <span className="text-sm text-gray-500">
                              {formatDate(session.date)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                            <span>
                              Duration: {formatDuration(session.duration)}
                            </span>
                            <span>Efficiency: {session.efficiency}%</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {session.topics.map((topic, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                              >
                                {topic}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Progress Chart */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">
                      Weekly Progress
                    </h4>
                    <div className="bg-gray-50 rounded-lg p-4 h-64 flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <svg
                          className="w-12 h-12 mx-auto mb-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                          />
                        </svg>
                        <p>Progress chart will be displayed here</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'achievements' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Achievements
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {achievements.map(achievement => (
                    <div
                      key={achievement.id}
                      className="bg-white border border-gray-200 rounded-lg p-6 text-center"
                    >
                      <div className="text-4xl mb-4">{achievement.icon}</div>
                      <h4 className="font-medium text-gray-900 mb-2">
                        {achievement.title}
                      </h4>
                      <p className="text-sm text-gray-600 mb-3">
                        {achievement.description}
                      </p>
                      <div className="flex items-center justify-center space-x-2">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(
                            achievement.category
                          )}`}
                        >
                          {achievement.category}
                        </span>
                        <span className="text-sm text-gray-500">
                          +{achievement.points} pts
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mt-2">
                        Earned {formatDate(achievement.earnedAt)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
