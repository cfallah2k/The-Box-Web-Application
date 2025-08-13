import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface Quiz {
  id: string;
  courseId: string;
  courseName: string;
  title: string;
  description: string;
  totalQuestions: number;
  timeLimit: number; // in minutes
  passingScore: number;
  status: 'not-started' | 'in-progress' | 'completed' | 'failed';
  score?: number;
  attempts: number;
  maxAttempts: number;
  lastAttemptDate?: string;
  dueDate?: string;
  instructor: string;
}

const QuizzesPage: React.FC = () => {
  const { user } = useAuth();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'not-started' | 'in-progress' | 'completed'>('all');

  useEffect(() => {
    const loadQuizzes = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockQuizzes: Quiz[] = [
        {
          id: '1',
          courseId: 'course-1',
          courseName: 'React Development Fundamentals',
          title: 'React Hooks Quiz',
          description: 'Test your knowledge of React hooks including useState, useEffect, and custom hooks.',
          totalQuestions: 20,
          timeLimit: 30,
          passingScore: 70,
          status: 'not-started',
          attempts: 0,
          maxAttempts: 3,
          instructor: 'Sarah Johnson'
        },
        {
          id: '2',
          courseId: 'course-2',
          courseName: 'Advanced JavaScript',
          title: 'Async Programming Quiz',
          description: 'Assess your understanding of promises, async/await, and asynchronous programming patterns.',
          totalQuestions: 15,
          timeLimit: 25,
          passingScore: 80,
          status: 'completed',
          score: 85,
          attempts: 1,
          maxAttempts: 2,
          lastAttemptDate: '2024-01-18T14:30:00Z',
          instructor: 'Mike Chen'
        },
        {
          id: '3',
          courseId: 'course-1',
          courseName: 'React Development Fundamentals',
          title: 'Component Lifecycle Quiz',
          description: 'Test your knowledge of React component lifecycle methods and their use cases.',
          totalQuestions: 12,
          timeLimit: 20,
          passingScore: 75,
          status: 'in-progress',
          attempts: 1,
          maxAttempts: 3,
          instructor: 'Sarah Johnson'
        }
      ];

      setQuizzes(mockQuizzes);
      setLoading(false);
    };

    loadQuizzes();
  }, []);

  const filteredQuizzes = quizzes.filter(quiz => {
    if (filter === 'all') return true;
    return quiz.status === filter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'not-started': return 'bg-gray-100 text-gray-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'not-started': return 'Not Started';
      case 'in-progress': return 'In Progress';
      case 'completed': return 'Completed';
      case 'failed': return 'Failed';
      default: return 'Unknown';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const startQuiz = (quizId: string) => {
    setQuizzes(prev => prev.map(quiz => 
      quiz.id === quizId ? { ...quiz, status: 'in-progress' as const } : quiz
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading quizzes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Quizzes</h1>
          <p className="text-gray-600">Take and review your course quizzes</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Quizzes</p>
                <p className="text-2xl font-bold text-gray-900">{quizzes.length}</p>
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
                <p className="text-2xl font-bold text-gray-900">
                  {quizzes.filter(q => q.status === 'completed').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-gray-900">
                  {quizzes.filter(q => q.status === 'in-progress').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Average Score</p>
                <p className="text-2xl font-bold text-gray-900">
                  {quizzes.filter(q => q.score).length > 0 
                    ? Math.round(quizzes.filter(q => q.score).reduce((sum, q) => sum + (q.score || 0), 0) / quizzes.filter(q => q.score).length)
                    : 0}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex gap-2">
            {(['all', 'not-started', 'in-progress', 'completed'] as const).map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === filterType
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filterType === 'not-started' ? 'Not Started' : 
                 filterType === 'in-progress' ? 'In Progress' :
                 filterType.charAt(0).toUpperCase() + filterType.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Quizzes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuizzes.map((quiz) => (
            <div key={quiz.id} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{quiz.title}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(quiz.status)}`}>
                  {getStatusText(quiz.status)}
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-2">Course: {quiz.courseName}</p>
              <p className="text-sm text-gray-600 mb-4">Instructor: {quiz.instructor}</p>
              <p className="text-gray-700 mb-4">{quiz.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Questions:</span>
                  <span className="font-medium text-gray-900">{quiz.totalQuestions}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Time Limit:</span>
                  <span className="font-medium text-gray-900">{quiz.timeLimit} minutes</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Passing Score:</span>
                  <span className="font-medium text-gray-900">{quiz.passingScore}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Attempts:</span>
                  <span className="font-medium text-gray-900">{quiz.attempts}/{quiz.maxAttempts}</span>
                </div>
                {quiz.score && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Your Score:</span>
                    <span className={`font-medium ${quiz.score >= quiz.passingScore ? 'text-green-600' : 'text-red-600'}`}>
                      {quiz.score}%
                    </span>
                  </div>
                )}
                {quiz.lastAttemptDate && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Last Attempt:</span>
                    <span className="font-medium text-gray-900">{formatDate(quiz.lastAttemptDate)}</span>
                  </div>
                )}
              </div>

              <div className="flex space-x-2">
                {quiz.status === 'not-started' && (
                  <button
                    onClick={() => startQuiz(quiz.id)}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Start Quiz
                  </button>
                )}
                {quiz.status === 'in-progress' && (
                  <button className="flex-1 bg-yellow-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-yellow-700 transition-colors">
                    Continue Quiz
                  </button>
                )}
                {quiz.status === 'completed' && (
                  <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors">
                    Review Results
                  </button>
                )}
                {quiz.attempts < quiz.maxAttempts && quiz.status !== 'not-started' && (
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    Retake
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredQuizzes.length === 0 && (
          <div className="text-center py-12">
            <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No quizzes found</h3>
            <p className="text-gray-600 mb-6">
              {filter === 'all' ? 'You don\'t have any quizzes yet.' : `No ${filter} quizzes.`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizzesPage;
