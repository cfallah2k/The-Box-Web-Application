import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface AnalyticsData {
  totalMembers: number;
  activeMembers: number;
  totalCourses: number;
  totalHours: number;
  averageCompletionRate: number;
  topPerformingDepartments: DepartmentPerformance[];
  recentActivity: Activity[];
  monthlyProgress: MonthlyData[];
  skillGaps: SkillGap[];
}

interface DepartmentPerformance {
  department: string;
  members: number;
  averageScore: number;
  completionRate: number;
  totalHours: number;
}

interface Activity {
  id: string;
  type: 'course_completed' | 'certificate_earned' | 'milestone_reached';
  memberName: string;
  department: string;
  description: string;
  timestamp: string;
  points: number;
}

interface MonthlyData {
  month: string;
  activeMembers: number;
  coursesCompleted: number;
  totalHours: number;
  averageScore: number;
}

interface SkillGap {
  skill: string;
  currentLevel: number;
  targetLevel: number;
  gap: number;
  membersAffected: number;
}

const LearningAnalyticsPage: React.FC = () => {
  const { user } = useAuth();
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter'>(
    'month'
  );

  useEffect(() => {
    const loadAnalytics = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockAnalyticsData: AnalyticsData = {
        totalMembers: 45,
        activeMembers: 38,
        totalCourses: 156,
        totalHours: 1247,
        averageCompletionRate: 78,
        topPerformingDepartments: [
          {
            department: 'Engineering',
            members: 15,
            averageScore: 87,
            completionRate: 85,
            totalHours: 456,
          },
          {
            department: 'Marketing',
            members: 8,
            averageScore: 82,
            completionRate: 78,
            totalHours: 234,
          },
          {
            department: 'Sales',
            members: 12,
            averageScore: 79,
            completionRate: 72,
            totalHours: 312,
          },
        ],
        recentActivity: [
          {
            id: '1',
            type: 'course_completed',
            memberName: 'John Smith',
            department: 'Engineering',
            description: 'Completed React Development Fundamentals',
            timestamp: '2024-01-20T10:30:00Z',
            points: 150,
          },
          {
            id: '2',
            type: 'certificate_earned',
            memberName: 'Sarah Johnson',
            department: 'Marketing',
            description: 'Earned Digital Marketing Certificate',
            timestamp: '2024-01-19T14:20:00Z',
            points: 200,
          },
          {
            id: '3',
            type: 'milestone_reached',
            memberName: 'Mike Chen',
            department: 'Sales',
            description: 'Reached 50 hours of learning',
            timestamp: '2024-01-18T09:15:00Z',
            points: 100,
          },
        ],
        monthlyProgress: [
          {
            month: 'Oct',
            activeMembers: 32,
            coursesCompleted: 45,
            totalHours: 280,
            averageScore: 75,
          },
          {
            month: 'Nov',
            activeMembers: 35,
            coursesCompleted: 52,
            totalHours: 320,
            averageScore: 78,
          },
          {
            month: 'Dec',
            activeMembers: 38,
            coursesCompleted: 61,
            totalHours: 380,
            averageScore: 81,
          },
          {
            month: 'Jan',
            activeMembers: 38,
            coursesCompleted: 58,
            totalHours: 367,
            averageScore: 82,
          },
        ],
        skillGaps: [
          {
            skill: 'React Development',
            currentLevel: 3.2,
            targetLevel: 4.5,
            gap: 1.3,
            membersAffected: 12,
          },
          {
            skill: 'Data Analysis',
            currentLevel: 2.8,
            targetLevel: 4.0,
            gap: 1.2,
            membersAffected: 8,
          },
          {
            skill: 'Project Management',
            currentLevel: 3.5,
            targetLevel: 4.2,
            gap: 0.7,
            membersAffected: 15,
          },
        ],
      };

      setAnalyticsData(mockAnalyticsData);
      setLoading(false);
    };

    loadAnalytics();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            No analytics data found
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Learning Analytics
              </h1>
              <p className="text-gray-600">
                Track your team's learning progress and insights
              </p>
            </div>
            <div className="flex gap-2">
              {(['week', 'month', 'quarter'] as const).map(range => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    timeRange === range
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {range.charAt(0).toUpperCase() + range.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Active Members
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {analyticsData.activeMembers}/{analyticsData.totalMembers}
                </p>
                <p className="text-sm text-gray-500">
                  {Math.round(
                    (analyticsData.activeMembers / analyticsData.totalMembers) *
                      100
                  )}
                  % engagement
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
                  Completion Rate
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {analyticsData.averageCompletionRate}%
                </p>
                <p className="text-sm text-gray-500">
                  Average across all courses
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
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Hours</p>
                <p className="text-2xl font-bold text-gray-900">
                  {analyticsData.totalHours}
                </p>
                <p className="text-sm text-gray-500">
                  {Math.round(
                    analyticsData.totalHours / analyticsData.totalMembers
                  )}
                  h per member
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
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Courses Completed
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {analyticsData.totalCourses}
                </p>
                <p className="text-sm text-gray-500">This {timeRange}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Department Performance */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Department Performance
            </h2>
            <div className="space-y-4">
              {analyticsData.topPerformingDepartments.map((dept, index) => (
                <div
                  key={dept.department}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">
                      {dept.department}
                    </h3>
                    <span className="text-sm text-gray-500">
                      {dept.members} members
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Avg Score</p>
                      <p className="font-medium text-gray-900">
                        {dept.averageScore}%
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Completion</p>
                      <p className="font-medium text-gray-900">
                        {dept.completionRate}%
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Hours</p>
                      <p className="font-medium text-gray-900">
                        {dept.totalHours}h
                      </p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{dept.completionRate}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${dept.completionRate}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Recent Activity
            </h2>
            <div className="space-y-4">
              {analyticsData.recentActivity.map(activity => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        activity.type === 'course_completed'
                          ? 'bg-green-100'
                          : activity.type === 'certificate_earned'
                          ? 'bg-yellow-100'
                          : 'bg-blue-100'
                      }`}
                    >
                      {activity.type === 'course_completed' && (
                        <svg
                          className="w-4 h-4 text-green-600"
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
                      )}
                      {activity.type === 'certificate_earned' && (
                        <svg
                          className="w-4 h-4 text-yellow-600"
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
                      )}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.memberName}
                    </p>
                    <p className="text-sm text-gray-600">
                      {activity.description}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDate(activity.timestamp)} • {activity.department}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      +{activity.points}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Skill Gaps */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Skill Gaps Analysis
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {analyticsData.skillGaps.map(skill => (
              <div
                key={skill.skill}
                className="border border-gray-200 rounded-lg p-4"
              >
                <h3 className="font-medium text-gray-900 mb-2">
                  {skill.skill}
                </h3>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Current Level:</span>
                    <span className="font-medium text-gray-900">
                      {skill.currentLevel}/5
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Target Level:</span>
                    <span className="font-medium text-gray-900">
                      {skill.targetLevel}/5
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Gap:</span>
                    <span className="font-medium text-red-600">
                      {skill.gap}/5
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Members Affected:</span>
                    <span className="font-medium text-gray-900">
                      {skill.membersAffected}
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{
                      width: `${
                        (skill.currentLevel / skill.targetLevel) * 100
                      }%`,
                    }}
                  ></div>
                </div>
                <div className="mt-2 text-xs text-gray-500 text-center">
                  {Math.round((skill.currentLevel / skill.targetLevel) * 100)}%
                  of target
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Progress Chart */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Monthly Progress
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {analyticsData.monthlyProgress.map((month, index) => (
              <div
                key={index}
                className="text-center p-4 bg-gray-50 rounded-lg"
              >
                <h3 className="font-medium text-gray-900 mb-2">
                  {month.month}
                </h3>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-gray-600">Active Members</p>
                    <p className="text-lg font-bold text-blue-600">
                      {month.activeMembers}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Courses Completed</p>
                    <p className="text-lg font-bold text-green-600">
                      {month.coursesCompleted}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Hours</p>
                    <p className="text-lg font-bold text-purple-600">
                      {month.totalHours}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Avg Score</p>
                    <p className="text-lg font-bold text-yellow-600">
                      {month.averageScore}%
                    </p>
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

export default LearningAnalyticsPage;
