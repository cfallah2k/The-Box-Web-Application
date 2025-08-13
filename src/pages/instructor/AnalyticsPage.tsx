import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface CourseAnalytics {
  id: string;
  title: string;
  totalStudents: number;
  activeStudents: number;
  completionRate: number;
  averageScore: number;
  averageTimeSpent: number; // in hours
  revenue: number;
  rating: number;
  totalReviews: number;
  lessonsCompleted: number;
  totalLessons: number;
  studentProgress: StudentProgress[];
  weeklyEngagement: WeeklyData[];
  topPerformingStudents: TopStudent[];
  commonIssues: Issue[];
}

interface StudentProgress {
  studentId: string;
  studentName: string;
  progress: number;
  lastActive: string;
  timeSpent: number;
  assignmentsCompleted: number;
  quizzesTaken: number;
  averageScore: number;
}

interface WeeklyData {
  week: string;
  activeStudents: number;
  lessonsCompleted: number;
  assignmentsSubmitted: number;
  averageTimeSpent: number;
}

interface TopStudent {
  studentId: string;
  studentName: string;
  progress: number;
  averageScore: number;
  timeSpent: number;
  assignmentsCompleted: number;
}

interface Issue {
  type: 'technical' | 'content' | 'engagement' | 'assessment';
  description: string;
  frequency: number;
  affectedStudents: number;
  severity: 'low' | 'medium' | 'high';
}

const AnalyticsPage: React.FC = () => {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState<CourseAnalytics[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter'>('month');

  useEffect(() => {
    const loadAnalytics = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockAnalytics: CourseAnalytics[] = [
        {
          id: '1',
          title: 'React Development Fundamentals',
          totalStudents: 1247,
          activeStudents: 892,
          completionRate: 78,
          averageScore: 85,
          averageTimeSpent: 12.5,
          revenue: 124700,
          rating: 4.8,
          totalReviews: 156,
          lessonsCompleted: 1847,
          totalLessons: 24,
          studentProgress: [
            {
              studentId: '1',
              studentName: 'John Doe',
              progress: 95,
              lastActive: '2024-01-20T10:30:00Z',
              timeSpent: 15.2,
              assignmentsCompleted: 8,
              quizzesTaken: 5,
              averageScore: 92
            },
            {
              studentId: '2',
              studentName: 'Jane Smith',
              progress: 78,
              lastActive: '2024-01-19T14:20:00Z',
              timeSpent: 11.8,
              assignmentsCompleted: 6,
              quizzesTaken: 4,
              averageScore: 87
            }
          ],
          weeklyEngagement: [
            { week: 'Week 1', activeStudents: 1200, lessonsCompleted: 2400, assignmentsSubmitted: 800, averageTimeSpent: 8.5 },
            { week: 'Week 2', activeStudents: 1100, lessonsCompleted: 2200, assignmentsSubmitted: 750, averageTimeSpent: 9.2 },
            { week: 'Week 3', activeStudents: 950, lessonsCompleted: 1900, assignmentsSubmitted: 680, averageTimeSpent: 10.1 },
            { week: 'Week 4', activeStudents: 892, lessonsCompleted: 1847, assignmentsSubmitted: 620, averageTimeSpent: 12.5 }
          ],
          topPerformingStudents: [
            { studentId: '1', studentName: 'John Doe', progress: 95, averageScore: 92, timeSpent: 15.2, assignmentsCompleted: 8 },
            { studentId: '3', studentName: 'Mike Johnson', progress: 88, averageScore: 89, timeSpent: 13.8, assignmentsCompleted: 7 },
            { studentId: '4', studentName: 'Sarah Wilson', progress: 82, averageScore: 91, timeSpent: 14.5, assignmentsCompleted: 7 }
          ],
          commonIssues: [
            { type: 'technical', description: 'Video playback issues', frequency: 15, affectedStudents: 45, severity: 'medium' },
            { type: 'content', description: 'Unclear explanations in Module 3', frequency: 8, affectedStudents: 32, severity: 'high' },
            { type: 'engagement', description: 'Low participation in discussions', frequency: 12, affectedStudents: 120, severity: 'low' }
          ]
        },
        {
          id: '2',
          title: 'Advanced JavaScript Concepts',
          totalStudents: 892,
          activeStudents: 654,
          completionRate: 73,
          averageScore: 82,
          averageTimeSpent: 18.3,
          revenue: 89200,
          rating: 4.6,
          totalReviews: 98,
          lessonsCompleted: 1456,
          totalLessons: 32,
          studentProgress: [],
          weeklyEngagement: [],
          topPerformingStudents: [],
          commonIssues: []
        }
      ];

      setAnalytics(mockAnalytics);
      setSelectedCourse(mockAnalytics[0].id);
      setLoading(false);
    };

    loadAnalytics();
  }, []);

  const selectedCourseData = analytics.find(course => course.id === selectedCourse);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Course Analytics</h1>
              <p className="text-gray-600">Track your course performance and student engagement</p>
            </div>
            <div className="flex gap-2">
              {(['week', 'month', 'quarter'] as const).map((range) => (
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

        {/* Course Selector */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Course</label>
          <select
            value={selectedCourse || ''}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {analytics.map(course => (
              <option key={course.id} value={course.id}>{course.title}</option>
            ))}
          </select>
        </div>

        {selectedCourseData && (
          <>
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Students</p>
                    <p className="text-2xl font-bold text-gray-900">{selectedCourseData.totalStudents.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">{selectedCourseData.activeStudents} active</p>
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
                    <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                    <p className="text-2xl font-bold text-gray-900">{selectedCourseData.completionRate}%</p>
                    <p className="text-sm text-gray-500">Avg score: {selectedCourseData.averageScore}%</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(selectedCourseData.revenue)}</p>
                    <p className="text-sm text-gray-500">This {timeRange}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Rating</p>
                    <p className="text-2xl font-bold text-gray-900">{selectedCourseData.rating}/5</p>
                    <p className="text-sm text-gray-500">{selectedCourseData.totalReviews} reviews</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Weekly Engagement Chart */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Weekly Engagement</h2>
                <div className="space-y-4">
                  {selectedCourseData.weeklyEngagement.map((week, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-gray-900">{week.week}</h3>
                        <span className="text-sm text-gray-500">{week.activeStudents} active students</span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Lessons Completed</p>
                          <p className="font-medium text-gray-900">{week.lessonsCompleted}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Assignments</p>
                          <p className="font-medium text-gray-900">{week.assignmentsSubmitted}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Avg Time</p>
                          <p className="font-medium text-gray-900">{week.averageTimeSpent}h</p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>Engagement</span>
                          <span>{Math.round((week.activeStudents / selectedCourseData.totalStudents) * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${(week.activeStudents / selectedCourseData.totalStudents) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Performing Students */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Top Performing Students</h2>
                <div className="space-y-4">
                  {selectedCourseData.topPerformingStudents.map((student, index) => (
                    <div key={student.studentId} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-600">#{index + 1}</span>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{student.studentName}</h3>
                          <p className="text-sm text-gray-500">{student.progress}% complete</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{student.averageScore}%</p>
                        <p className="text-xs text-gray-500">{student.timeSpent}h spent</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Student Progress Table */}
            <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Student Progress</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Student
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Progress
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Active
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Time Spent
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Assignments
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Avg Score
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {selectedCourseData.studentProgress.map((student) => (
                      <tr key={student.studentId} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{student.studentName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${student.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-900">{student.progress}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatDate(student.lastActive)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {student.timeSpent}h
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {student.assignmentsCompleted}/{selectedCourseData.totalLessons}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {student.averageScore}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Common Issues */}
            <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Common Issues</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {selectedCourseData.commonIssues.map((issue, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(issue.severity)}`}>
                        {issue.severity.charAt(0).toUpperCase() + issue.severity.slice(1)}
                      </span>
                      <span className="text-sm text-gray-500">{issue.type}</span>
                    </div>
                    <h3 className="font-medium text-gray-900 mb-2">{issue.description}</h3>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>Frequency: {issue.frequency} reports</p>
                      <p>Affected: {issue.affectedStudents} students</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AnalyticsPage;
