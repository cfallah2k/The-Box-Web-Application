import {
  AcademicCapIcon,
  ArrowRightIcon,
  ArrowTrendingUpIcon,
  ChartBarIcon,
  ClockIcon,
  CogIcon,
  CpuChipIcon,
  PlayIcon,
  StarIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import React, { useState } from 'react';

interface Question {
  id: string;
  text: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer' | 'coding';
  options?: string[];
  correctAnswer: string | string[];
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  points: number;
  explanation: string;
}

interface Assessment {
  id: string;
  title: string;
  description: string;
  subject: string;
  adaptive: boolean;
  estimatedTime: number;
  questions: Question[];
  currentQuestion: number;
  userAnswers: Record<string, string>;
  score: number;
  difficulty: 'easy' | 'medium' | 'hard';
  isCompleted: boolean;
}

const AdaptiveAssessments: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'assessments' | 'results' | 'analytics'
  >('assessments');
  const [currentAssessment, setCurrentAssessment] = useState<Assessment | null>(
    null
  );
  const [isTakingAssessment, setIsTakingAssessment] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');

  const assessments: Assessment[] = [
    {
      id: '1',
      title: 'JavaScript Fundamentals',
      description: 'Test your knowledge of JavaScript basics and core concepts',
      subject: 'Programming',
      adaptive: true,
      estimatedTime: 30,
      questions: [
        {
          id: '1',
          text: 'What is the output of console.log(typeof null)?',
          type: 'multiple-choice',
          options: ['"object"', '"null"', '"undefined"', '"boolean"'],
          correctAnswer: '"object"',
          difficulty: 'medium',
          category: 'JavaScript',
          points: 10,
          explanation:
            'In JavaScript, typeof null returns "object". This is a known quirk in the language.',
        },
        {
          id: '2',
          text: 'Which method is used to add an element to the end of an array?',
          type: 'multiple-choice',
          options: ['push()', 'pop()', 'shift()', 'unshift()'],
          correctAnswer: 'push()',
          difficulty: 'easy',
          category: 'JavaScript',
          points: 5,
          explanation:
            'The push() method adds one or more elements to the end of an array.',
        },
      ],
      currentQuestion: 0,
      userAnswers: {},
      score: 0,
      difficulty: 'medium',
      isCompleted: false,
    },
    {
      id: '2',
      title: 'React Hooks Assessment',
      description:
        'Advanced assessment on React Hooks and modern React patterns',
      subject: 'Programming',
      adaptive: true,
      estimatedTime: 45,
      questions: [],
      currentQuestion: 0,
      userAnswers: {},
      score: 0,
      difficulty: 'hard',
      isCompleted: false,
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'hard':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-700';
    }
  };

  const startAssessment = (assessment: Assessment) => {
    setCurrentAssessment(assessment);
    setIsTakingAssessment(true);
  };

  const submitAnswer = () => {
    if (!currentAssessment || !selectedAnswer) return;

    const updatedAssessment = {
      ...currentAssessment,
      userAnswers: {
        ...currentAssessment.userAnswers,
        [currentAssessment.questions[currentAssessment.currentQuestion].id]:
          selectedAnswer,
      },
      currentQuestion: currentAssessment.currentQuestion + 1,
    };

    setCurrentAssessment(updatedAssessment);
    setSelectedAnswer('');

    if (
      updatedAssessment.currentQuestion >= updatedAssessment.questions.length
    ) {
      // Assessment completed
      const finalAssessment = {
        ...updatedAssessment,
        isCompleted: true,
        score: calculateScore(updatedAssessment),
      };
      setCurrentAssessment(finalAssessment);
      setIsTakingAssessment(false);
    }
  };

  const calculateScore = (assessment: Assessment) => {
    let totalPoints = 0;
    let earnedPoints = 0;

    assessment.questions.forEach(question => {
      totalPoints += question.points;
      const userAnswer = assessment.userAnswers[question.id];
      if (userAnswer === question.correctAnswer) {
        earnedPoints += question.points;
      }
    });

    return Math.round((earnedPoints / totalPoints) * 100);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
            <CpuChipIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Adaptive Assessments
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              AI-powered dynamic testing
            </p>
          </div>
        </div>
        <button className="btn-secondary">
          <CogIcon className="w-4 h-4" />
          Settings
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
        {[
          { id: 'assessments', label: 'Assessments', icon: AcademicCapIcon },
          { id: 'results', label: 'Results', icon: ChartBarIcon },
          { id: 'analytics', label: 'Analytics', icon: ArrowTrendingUpIcon },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="space-y-6">
        {activeTab === 'assessments' && !isTakingAssessment && (
          <div className="space-y-4">
            {assessments.map((assessment, index) => (
              <motion.div
                key={assessment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {assessment.title}
                      </h4>
                      {assessment.adaptive && (
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs rounded-full">
                          Adaptive
                        </span>
                      )}
                      <div
                        className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(
                          assessment.difficulty
                        )}`}
                      >
                        {assessment.difficulty}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {assessment.description}
                    </p>

                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <div className="flex items-center space-x-1">
                        <ClockIcon className="w-4 h-4" />
                        <span>{assessment.estimatedTime} min</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <AcademicCapIcon className="w-4 h-4" />
                        <span>{assessment.questions.length} questions</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <StarIcon className="w-4 h-4" />
                        <span>{assessment.score}% score</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => startAssessment(assessment)}
                    className="btn-primary text-sm"
                  >
                    <PlayIcon className="w-4 h-4" />
                    Start Assessment
                  </button>
                  <button className="btn-secondary text-sm">
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {isTakingAssessment && currentAssessment && (
          <div className="space-y-6">
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  Question {currentAssessment.currentQuestion + 1} of{' '}
                  {currentAssessment.questions.length}
                </h4>
                <div className="flex items-center space-x-2">
                  <ClockIcon className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-500">Time remaining</span>
                </div>
              </div>

              <div className="mb-6">
                <h5 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  {
                    currentAssessment.questions[
                      currentAssessment.currentQuestion
                    ].text
                  }
                </h5>

                {currentAssessment.questions[currentAssessment.currentQuestion]
                  .type === 'multiple-choice' && (
                  <div className="space-y-3">
                    {currentAssessment.questions[
                      currentAssessment.currentQuestion
                    ].options?.map(option => (
                      <button
                        key={option}
                        onClick={() => setSelectedAnswer(option)}
                        className={`w-full p-3 text-left rounded-lg border transition-colors ${
                          selectedAnswer === option
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                        }`}
                      >
                        <span className="text-gray-900 dark:text-white">
                          {option}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={submitAnswer}
                  disabled={!selectedAnswer}
                  className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ArrowRightIcon className="w-4 h-4" />
                  <span>Submit Answer</span>
                </button>
                <button
                  onClick={() => setIsTakingAssessment(false)}
                  className="btn-secondary"
                >
                  Exit Assessment
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'results' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl text-white">
                <div className="flex items-center space-x-3">
                  <StarIcon className="w-6 h-6" />
                  <div>
                    <p className="text-sm opacity-90">Average Score</p>
                    <p className="text-2xl font-bold">78%</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-white">
                <div className="flex items-center space-x-3">
                  <AcademicCapIcon className="w-6 h-6" />
                  <div>
                    <p className="text-sm opacity-90">Assessments Taken</p>
                    <p className="text-2xl font-bold">12</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl text-white">
                <div className="flex items-center space-x-3">
                  <ArrowTrendingUpIcon className="w-6 h-6" />
                  <div>
                    <p className="text-sm opacity-90">Improvement</p>
                    <p className="text-2xl font-bold">+15%</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                Recent Results
              </h4>
              <div className="space-y-3">
                {assessments.map(assessment => (
                  <div
                    key={assessment.id}
                    className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg"
                  >
                    <div>
                      <h5 className="font-medium text-gray-900 dark:text-white">
                        {assessment.title}
                      </h5>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {assessment.subject}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(
                          assessment.difficulty
                        )}`}
                      >
                        {assessment.difficulty}
                      </span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {assessment.score}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                Performance Analytics
              </h4>
              <div className="space-y-4">
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white mb-2">
                    Strength Areas
                  </h5>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        JavaScript Basics
                      </span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: '85%' }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          85%
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        React Fundamentals
                      </span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: '78%' }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          78%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white mb-2">
                    Areas for Improvement
                  </h5>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Advanced JavaScript
                      </span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div
                            className="bg-yellow-500 h-2 rounded-full"
                            style={{ width: '45%' }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          45%
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        React Hooks
                      </span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div
                            className="bg-red-500 h-2 rounded-full"
                            style={{ width: '32%' }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          32%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdaptiveAssessments;
