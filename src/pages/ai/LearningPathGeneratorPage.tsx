import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface LearningPath {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedDuration: number; // in weeks
  skills: Skill[];
  courses: PathCourse[];
  prerequisites: string[];
  targetRoles: string[];
  createdAt: Date;
  status: 'draft' | 'active' | 'completed';
}

interface Skill {
  id: string;
  name: string;
  level: 'basic' | 'intermediate' | 'advanced' | 'expert';
  category: string;
  importance: 'core' | 'important' | 'nice-to-have';
  estimatedTime: number; // in hours
}

interface PathCourse {
  id: string;
  title: string;
  instructor: string;
  duration: number; // in hours
  difficulty: string;
  rating: number;
  enrolledStudents: number;
  thumbnail: string;
  order: number;
  isRequired: boolean;
}

interface UserProfile {
  currentSkills: string[];
  learningGoals: string[];
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
  preferredLearningStyle: 'visual' | 'hands-on' | 'theoretical' | 'mixed';
  availableTime: number; // hours per week
  targetRole: string;
}

const LearningPathGeneratorPage: React.FC = () => {
  const { user } = useAuth();
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<'generate' | 'paths' | 'profile' | 'recommendations'>('generate');
  const [selectedGoal, setSelectedGoal] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [experienceLevel, setExperienceLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');

  useEffect(() => {
    // Load mock learning paths
    const mockPaths: LearningPath[] = [
      {
        id: '1',
        title: 'Full-Stack Web Development',
        description: 'Complete path to become a full-stack web developer',
        difficulty: 'intermediate',
        estimatedDuration: 16,
        skills: [
          { id: '1', name: 'HTML/CSS', level: 'basic', category: 'Frontend', importance: 'core', estimatedTime: 20 },
          { id: '2', name: 'JavaScript', level: 'intermediate', category: 'Frontend', importance: 'core', estimatedTime: 40 },
          { id: '3', name: 'React', level: 'intermediate', category: 'Frontend', importance: 'core', estimatedTime: 35 },
          { id: '4', name: 'Node.js', level: 'intermediate', category: 'Backend', importance: 'core', estimatedTime: 30 },
          { id: '5', name: 'Database Design', level: 'basic', category: 'Backend', importance: 'important', estimatedTime: 25 }
        ],
        courses: [
          {
            id: '1',
            title: 'HTML & CSS Fundamentals',
            instructor: 'Sarah Johnson',
            duration: 15,
            difficulty: 'Beginner',
            rating: 4.8,
            enrolledStudents: 12500,
            thumbnail: '/api/placeholder/300/200',
            order: 1,
            isRequired: true
          },
          {
            id: '2',
            title: 'JavaScript Mastery',
            instructor: 'Mike Chen',
            duration: 25,
            difficulty: 'Intermediate',
            rating: 4.9,
            enrolledStudents: 8900,
            thumbnail: '/api/placeholder/300/200',
            order: 2,
            isRequired: true
          }
        ],
        prerequisites: ['Basic computer skills', 'High school math'],
        targetRoles: ['Frontend Developer', 'Full-Stack Developer', 'Web Developer'],
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        status: 'active'
      }
    ];
    setLearningPaths(mockPaths);

    // Load mock user profile
    const mockProfile: UserProfile = {
      currentSkills: ['HTML', 'CSS', 'Basic JavaScript'],
      learningGoals: ['Become a full-stack developer', 'Learn React', 'Master Node.js'],
      experienceLevel: 'beginner',
      preferredLearningStyle: 'hands-on',
      availableTime: 10,
      targetRole: 'Full-Stack Developer'
    };
    setUserProfile(mockProfile);
  }, []);

  const generateLearningPath = async () => {
    if (!selectedGoal || !selectedRole) return;

    setIsGenerating(true);

    // Simulate AI path generation
    setTimeout(() => {
      const newPath: LearningPath = {
        id: Date.now().toString(),
        title: `${selectedRole} Learning Path`,
        description: `Comprehensive learning path to become a ${selectedRole.toLowerCase()}`,
        difficulty: experienceLevel,
        estimatedDuration: experienceLevel === 'beginner' ? 20 : experienceLevel === 'intermediate' ? 12 : 8,
        skills: [
          { id: '1', name: 'Core Programming', level: 'basic', category: 'Programming', importance: 'core', estimatedTime: 30 },
          { id: '2', name: 'Framework Mastery', level: 'intermediate', category: 'Development', importance: 'core', estimatedTime: 40 },
          { id: '3', name: 'Best Practices', level: 'advanced', category: 'Professional', importance: 'important', estimatedTime: 25 }
        ],
        courses: [
          {
            id: '1',
            title: `Introduction to ${selectedRole}`,
            instructor: 'AI Instructor',
            duration: 20,
            difficulty: 'Beginner',
            rating: 4.7,
            enrolledStudents: 5000,
            thumbnail: '/api/placeholder/300/200',
            order: 1,
            isRequired: true
          },
          {
            id: '2',
            title: `Advanced ${selectedRole} Concepts`,
            instructor: 'AI Instructor',
            duration: 30,
            difficulty: 'Intermediate',
            rating: 4.8,
            enrolledStudents: 3000,
            thumbnail: '/api/placeholder/300/200',
            order: 2,
            isRequired: true
          }
        ],
        prerequisites: ['Basic computer literacy', 'Willingness to learn'],
        targetRoles: [selectedRole],
        createdAt: new Date(),
        status: 'draft'
      };

      setLearningPaths(prev => [newPath, ...prev]);
      setIsGenerating(false);
    }, 3000);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-100';
      case 'intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSkillLevelColor = (level: string) => {
    switch (level) {
      case 'basic': return 'text-blue-600 bg-blue-100';
      case 'intermediate': return 'text-purple-600 bg-purple-100';
      case 'advanced': return 'text-orange-600 bg-orange-100';
      case 'expert': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'core': return 'text-red-600 bg-red-100';
      case 'important': return 'text-yellow-600 bg-yellow-100';
      case 'nice-to-have': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const learningGoals = [
    'Become a Full-Stack Developer',
    'Master Frontend Development',
    'Learn Backend Development',
    'Become a Data Scientist',
    'Master Mobile Development',
    'Learn DevOps',
    'Become a UI/UX Designer',
    'Master Machine Learning'
  ];

  const targetRoles = [
    'Full-Stack Developer',
    'Frontend Developer',
    'Backend Developer',
    'Data Scientist',
    'Mobile Developer',
    'DevOps Engineer',
    'UI/UX Designer',
    'Machine Learning Engineer'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Learning Path Generator</h1>
          <p className="text-gray-600">Create personalized learning journeys with AI-powered recommendations</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {/* Tab Navigation */}
            <div className="bg-white rounded-lg shadow-lg mb-6">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {(['generate', 'paths', 'profile', 'recommendations'] as const).map((tab) => (
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
                {activeTab === 'generate' && (
                  <div>
                    <div className="mb-6">
                      <h2 className="text-xl font-semibold text-gray-900 mb-4">Generate Learning Path</h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Learning Goal
                          </label>
                          <select
                            value={selectedGoal}
                            onChange={(e) => setSelectedGoal(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="">Select your learning goal</option>
                            {learningGoals.map((goal) => (
                              <option key={goal} value={goal}>{goal}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Target Role
                          </label>
                          <select
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="">Select target role</option>
                            {targetRoles.map((role) => (
                              <option key={role} value={role}>{role}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Current Experience Level
                        </label>
                        <div className="grid grid-cols-3 gap-4">
                          {(['beginner', 'intermediate', 'advanced'] as const).map((level) => (
                            <button
                              key={level}
                              onClick={() => setExperienceLevel(level)}
                              className={`p-4 border rounded-lg text-center transition-colors ${
                                experienceLevel === level
                                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                                  : 'border-gray-300 hover:border-gray-400'
                              }`}
                            >
                              <div className="font-medium capitalize">{level}</div>
                              <div className="text-sm text-gray-600 mt-1">
                                {level === 'beginner' ? '0-1 years' : 
                                 level === 'intermediate' ? '1-3 years' : '3+ years'}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <button
                          onClick={generateLearningPath}
                          disabled={isGenerating || !selectedGoal || !selectedRole}
                          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isGenerating ? (
                            <div className="flex items-center">
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Generating Path...
                            </div>
                          ) : (
                            'Generate Learning Path'
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'paths' && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Learning Paths</h2>
                    <div className="space-y-6">
                      {learningPaths.map((path) => (
                        <div key={path.id} className="bg-white border border-gray-200 rounded-lg p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-lg font-medium text-gray-900">{path.title}</h3>
                              <p className="text-sm text-gray-600 mt-1">{path.description}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(path.difficulty)}`}>
                                {path.difficulty}
                              </span>
                              <span className="text-sm text-gray-500">{path.estimatedDuration} weeks</span>
                            </div>
                          </div>

                          {/* Skills */}
                          <div className="mb-4">
                            <h4 className="font-medium text-gray-900 mb-2">Skills You'll Learn</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {path.skills.map((skill) => (
                                <div key={skill.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                  <div>
                                    <span className="font-medium text-gray-900">{skill.name}</span>
                                    <span className={`ml-2 px-2 py-1 text-xs rounded-full ${getSkillLevelColor(skill.level)}`}>
                                      {skill.level}
                                    </span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <span className={`px-2 py-1 text-xs rounded-full ${getImportanceColor(skill.importance)}`}>
                                      {skill.importance}
                                    </span>
                                    <span className="text-sm text-gray-500">{skill.estimatedTime}h</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Courses */}
                          <div className="mb-4">
                            <h4 className="font-medium text-gray-900 mb-2">Recommended Courses</h4>
                            <div className="space-y-3">
                              {path.courses.map((course) => (
                                <div key={course.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded">
                                  <img
                                    src={course.thumbnail}
                                    alt={course.title}
                                    className="w-16 h-12 rounded object-cover"
                                  />
                                  <div className="flex-1">
                                    <h5 className="font-medium text-gray-900">{course.title}</h5>
                                    <p className="text-sm text-gray-600">by {course.instructor}</p>
                                    <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                                      <span>{course.duration}h</span>
                                      <span>{course.difficulty}</span>
                                      <span>⭐ {course.rating}</span>
                                      <span>{course.enrolledStudents.toLocaleString()} students</span>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-sm font-medium text-gray-900">Step {course.order}</div>
                                    {course.isRequired && (
                                      <span className="text-xs text-red-600">Required</span>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Target Roles */}
                          <div className="mb-4">
                            <h4 className="font-medium text-gray-900 mb-2">Target Roles</h4>
                            <div className="flex flex-wrap gap-2">
                              {path.targetRoles.map((role, index) => (
                                <span
                                  key={index}
                                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                                >
                                  {role}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="flex justify-end space-x-2">
                            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                              View Details
                            </button>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                              Start Learning
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'profile' && userProfile && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Learning Profile</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="font-medium text-gray-900 mb-4">Current Skills</h3>
                        <div className="space-y-2">
                          {userProfile.currentSkills.map((skill, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                              <span className="text-gray-900">{skill}</span>
                              <span className="text-sm text-green-600">✓ Acquired</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="font-medium text-gray-900 mb-4">Learning Goals</h3>
                        <div className="space-y-2">
                          {userProfile.learningGoals.map((goal, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-blue-50 rounded">
                              <span className="text-gray-900">{goal}</span>
                              <span className="text-sm text-blue-600">🎯 Target</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="font-medium text-gray-900 mb-4">Learning Preferences</h3>
                        <div className="space-y-3">
                          <div>
                            <span className="text-sm text-gray-600">Experience Level:</span>
                            <div className="font-medium text-gray-900 capitalize">{userProfile.experienceLevel}</div>
                          </div>
                          <div>
                            <span className="text-sm text-gray-600">Learning Style:</span>
                            <div className="font-medium text-gray-900 capitalize">{userProfile.preferredLearningStyle}</div>
                          </div>
                          <div>
                            <span className="text-sm text-gray-600">Available Time:</span>
                            <div className="font-medium text-gray-900">{userProfile.availableTime} hours/week</div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="font-medium text-gray-900 mb-4">Target Role</h3>
                        <div className="p-3 bg-green-50 rounded">
                          <div className="font-medium text-green-900">{userProfile.targetRole}</div>
                          <div className="text-sm text-green-700 mt-1">Primary career goal</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'recommendations' && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">AI Recommendations</h2>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <div className="text-center">
                        <div className="text-4xl mb-4">🤖</div>
                        <h3 className="text-lg font-medium text-blue-900 mb-2">Personalized Recommendations</h3>
                        <p className="text-blue-800 mb-4">Based on your profile and learning history, AI will suggest the best courses and learning paths for you.</p>
                        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          Get Recommendations
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Paths */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Paths</h3>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setActiveTab('generate');
                    setSelectedGoal('Become a Full-Stack Developer');
                    setSelectedRole('Full-Stack Developer');
                  }}
                  className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="font-medium text-gray-900">Full-Stack Development</div>
                  <div className="text-sm text-gray-600">16 weeks • Intermediate</div>
                </button>
                <button
                  onClick={() => {
                    setActiveTab('generate');
                    setSelectedGoal('Master Frontend Development');
                    setSelectedRole('Frontend Developer');
                  }}
                  className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="font-medium text-gray-900">Frontend Development</div>
                  <div className="text-sm text-gray-600">12 weeks • Beginner</div>
                </button>
                <button
                  onClick={() => {
                    setActiveTab('generate');
                    setSelectedGoal('Learn Backend Development');
                    setSelectedRole('Backend Developer');
                  }}
                  className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="font-medium text-gray-900">Backend Development</div>
                  <div className="text-sm text-gray-600">14 weeks • Intermediate</div>
                </button>
              </div>
            </div>

            {/* AI Features */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Path Features</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-gray-700">Personalized Recommendations</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-gray-700">Skill Gap Analysis</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                  <span className="text-gray-700">Adaptive Learning</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                  <span className="text-gray-700">Progress Tracking</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-gray-700">Career Alignment</span>
                </div>
              </div>
            </div>

            {/* Path Stats */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Path Statistics</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Paths</span>
                  <span className="font-semibold text-gray-900">{learningPaths.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Active Learners</span>
                  <span className="font-semibold text-green-600">2,847</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Avg Completion</span>
                  <span className="font-semibold text-blue-600">78%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Success Rate</span>
                  <span className="font-semibold text-purple-600">92%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningPathGeneratorPage;
