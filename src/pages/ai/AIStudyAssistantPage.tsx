import {
  AcademicCapIcon,
  ArrowLeftIcon,
  BookOpenIcon,
  ChartBarIcon,
  CheckCircleIcon,
  ClockIcon,
  CpuChipIcon,
  LightBulbIcon,
  PauseIcon,
  PlayIcon,
  PlusIcon,
  TagIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface StudySession {
  id: string;
  subject: string;
  topic: string;
  duration: number;
  completed: number;
  isActive: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
  priority: 'low' | 'medium' | 'high';
}

interface StudyGoal {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  progress: number;
  isCompleted: boolean;
}

const AIStudyAssistantPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeSession, setActiveSession] = useState<StudySession | null>(null);
  const [isStudying, setIsStudying] = useState(false);

  const studySessions: StudySession[] = [
    {
      id: '1',
      subject: 'React Development',
      topic: 'Hooks and State Management',
      duration: 45,
      completed: 30,
      isActive: true,
      difficulty: 'medium',
      priority: 'high',
    },
    {
      id: '2',
      subject: 'JavaScript',
      topic: 'ES6+ Features',
      duration: 30,
      completed: 0,
      isActive: false,
      difficulty: 'easy',
      priority: 'medium',
    },
    {
      id: '3',
      subject: 'TypeScript',
      topic: 'Advanced Types',
      duration: 60,
      completed: 0,
      isActive: false,
      difficulty: 'hard',
      priority: 'low',
    },
  ];

  const studyGoals: StudyGoal[] = [
    {
      id: '1',
      title: 'Master React Hooks',
      description: 'Complete all React hooks tutorials and build 3 projects',
      targetDate: '2024-02-15',
      progress: 75,
      isCompleted: false,
    },
    {
      id: '2',
      title: 'Learn TypeScript',
      description:
        'Complete TypeScript course and convert 2 JavaScript projects',
      targetDate: '2024-03-01',
      progress: 30,
      isCompleted: false,
    },
  ];

  const handleStartSession = (session: StudySession) => {
    setActiveSession(session);
    setIsStudying(true);
  };

  const handlePauseSession = () => {
    setIsStudying(false);
  };

  const handleCompleteSession = () => {
    setIsStudying(false);
    setActiveSession(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container-responsive py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <ArrowLeftIcon className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                AI Study Assistant
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Your personalized study companion
              </p>
            </div>
          </div>
          <button className="btn-primary">
            <PlusIcon className="w-4 h-4" />
            New Session
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Study Sessions */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Study Sessions
              </h2>

              <div className="space-y-4">
                {studySessions.map(session => (
                  <motion.div
                    key={session.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 border rounded-lg transition-colors ${
                      session.isActive
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {session.subject}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {session.topic}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            session.difficulty === 'easy'
                              ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300'
                              : session.difficulty === 'medium'
                              ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300'
                              : 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300'
                          }`}
                        >
                          {session.difficulty}
                        </span>
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            session.priority === 'high'
                              ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300'
                              : session.priority === 'medium'
                              ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300'
                              : 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300'
                          }`}
                        >
                          {session.priority}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <ClockIcon className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {session.completed}/{session.duration} min
                        </span>
                      </div>
                      <div className="w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all"
                          style={{
                            width: `${
                              (session.completed / session.duration) * 100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      {session.isActive ? (
                        <>
                          <button
                            onClick={() => handlePauseSession()}
                            className="btn-secondary"
                          >
                            <PauseIcon className="w-4 h-4" />
                            Pause
                          </button>
                          <button
                            onClick={() => handleCompleteSession()}
                            className="btn-primary"
                          >
                            <CheckCircleIcon className="w-4 h-4" />
                            Complete
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleStartSession(session)}
                          className="btn-primary"
                        >
                          <PlayIcon className="w-4 h-4" />
                          Start Session
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Study Goals & Stats */}
          <div className="space-y-6">
            {/* Study Goals */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Study Goals
              </h3>

              <div className="space-y-4">
                {studyGoals.map(goal => (
                  <div
                    key={goal.id}
                    className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {goal.title}
                      </h4>
                      <span className="text-sm text-gray-500">
                        {new Date(goal.targetDate).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {goal.description}
                    </p>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mb-2">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all"
                        style={{ width: `${goal.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500">
                      {goal.progress}% complete
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Study Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Study Statistics
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <ClockIcon className="w-5 h-5 text-blue-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Total Study Time
                    </span>
                  </div>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    12.5 hours
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <AcademicCapIcon className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Sessions Completed
                    </span>
                  </div>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    24
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <TagIcon className="w-5 h-5 text-purple-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Goals Achieved
                    </span>
                  </div>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    8
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <ChartBarIcon className="w-5 h-5 text-yellow-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Average Score
                    </span>
                  </div>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    87%
                  </span>
                </div>
              </div>
            </div>

            {/* AI Recommendations */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">AI Recommendations</h3>

              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <LightBulbIcon className="w-5 h-5 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Focus on React Hooks</p>
                    <p className="text-xs opacity-80">
                      You're making great progress! Keep practicing useState and
                      useEffect.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <BookOpenIcon className="w-5 h-5 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Start TypeScript</p>
                    <p className="text-xs opacity-80">
                      Ready to level up? Begin with basic types and interfaces.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <TagIcon className="w-5 h-5 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Set Daily Goals</p>
                    <p className="text-xs opacity-80">
                      Aim for 30 minutes of focused study each day.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Active Study Session Modal */}
        {activeSession && isStudying && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full mx-4">
              <div className="text-center">
                <CpuChipIcon className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Studying: {activeSession.subject}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {activeSession.topic}
                </p>

                <div className="mb-6">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {activeSession.completed}:
                    {activeSession.duration.toString().padStart(2, '0')}
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3">
                    <div
                      className="bg-blue-500 h-3 rounded-full transition-all"
                      style={{
                        width: `${
                          (activeSession.completed / activeSession.duration) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={handlePauseSession}
                    className="btn-secondary"
                  >
                    <PauseIcon className="w-4 h-4" />
                    Pause
                  </button>
                  <button
                    onClick={handleCompleteSession}
                    className="btn-primary"
                  >
                    <CheckCircleIcon className="w-4 h-4" />
                    Complete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIStudyAssistantPage;
