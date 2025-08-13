import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface CodeReview {
  id: string;
  code: string;
  language: string;
  analysis: CodeAnalysis;
  suggestions: CodeSuggestion[];
  performance: PerformanceMetrics;
  security: SecurityAnalysis;
  timestamp: Date;
}

interface CodeAnalysis {
  complexity: 'low' | 'medium' | 'high';
  maintainability: number; // 0-100
  readability: number; // 0-100
  bestPractices: string[];
  issues: CodeIssue[];
}

interface CodeIssue {
  type: 'error' | 'warning' | 'info';
  line: number;
  message: string;
  suggestion: string;
  severity: 'low' | 'medium' | 'high';
}

interface CodeSuggestion {
  type: 'optimization' | 'refactoring' | 'security' | 'style';
  title: string;
  description: string;
  beforeCode: string;
  afterCode: string;
  impact: 'low' | 'medium' | 'high';
}

interface PerformanceMetrics {
  timeComplexity: string;
  spaceComplexity: string;
  executionTime: string;
  memoryUsage: string;
  bottlenecks: string[];
}

interface SecurityAnalysis {
  vulnerabilities: SecurityVulnerability[];
  riskLevel: 'low' | 'medium' | 'high';
  recommendations: string[];
}

interface SecurityVulnerability {
  type: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  line: number;
  fix: string;
}

const CodeReviewPage: React.FC = () => {
  const { user } = useAuth();
  const [code, setCode] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [review, setReview] = useState<CodeReview | null>(null);
  const [recentReviews, setRecentReviews] = useState<CodeReview[]>([]);

  useEffect(() => {
    // Load mock recent reviews
    const mockReviews: CodeReview[] = [
      {
        id: '1',
        code: `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n-1) + fibonacci(n-2);
}`,
        language: 'javascript',
        analysis: {
          complexity: 'high',
          maintainability: 65,
          readability: 80,
          bestPractices: ['Use meaningful variable names', 'Consider memoization'],
          issues: [
            {
              type: 'warning',
              line: 3,
              message: 'Recursive function may cause stack overflow for large numbers',
              suggestion: 'Consider using memoization or iterative approach',
              severity: 'high'
            }
          ]
        },
        suggestions: [
          {
            type: 'optimization',
            title: 'Implement Memoization',
            description: 'Add memoization to improve performance for repeated calculations',
            beforeCode: `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n-1) + fibonacci(n-2);
}`,
            afterCode: `const memo = new Map();

function fibonacci(n) {
  if (memo.has(n)) return memo.get(n);
  if (n <= 1) return n;
  
  const result = fibonacci(n-1) + fibonacci(n-2);
  memo.set(n, result);
  return result;
}`,
            impact: 'high'
          }
        ],
        performance: {
          timeComplexity: 'O(2^n)',
          spaceComplexity: 'O(n)',
          executionTime: 'Exponential',
          memoryUsage: 'High (recursive stack)',
          bottlenecks: ['Recursive calls without memoization']
        },
        security: {
          vulnerabilities: [],
          riskLevel: 'low',
          recommendations: ['Add input validation for negative numbers']
        },
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
      }
    ];
    setRecentReviews(mockReviews);
  }, []);

  const analyzeCode = async () => {
    if (!code.trim()) return;

    setIsAnalyzing(true);

    // Simulate AI analysis
    setTimeout(() => {
      const mockReview: CodeReview = {
        id: Date.now().toString(),
        code,
        language: selectedLanguage,
        analysis: {
          complexity: Math.random() > 0.5 ? 'medium' : 'high',
          maintainability: Math.floor(Math.random() * 40) + 60,
          readability: Math.floor(Math.random() * 30) + 70,
          bestPractices: [
            'Use meaningful variable names',
            'Add proper error handling',
            'Consider code modularity'
          ],
          issues: [
            {
              type: 'warning',
              line: 1,
              message: 'Consider adding input validation',
              suggestion: 'Add type checking and validation',
              severity: 'medium'
            }
          ]
        },
        suggestions: [
          {
            type: 'optimization',
            title: 'Improve Performance',
            description: 'Optimize the algorithm for better performance',
            beforeCode: code,
            afterCode: code + '\n// Optimized version',
            impact: 'medium'
          }
        ],
        performance: {
          timeComplexity: 'O(n)',
          spaceComplexity: 'O(1)',
          executionTime: 'Fast',
          memoryUsage: 'Low',
          bottlenecks: []
        },
        security: {
          vulnerabilities: [],
          riskLevel: 'low',
          recommendations: ['Add input validation']
        },
        timestamp: new Date()
      };

      setReview(mockReview);
      setRecentReviews(prev => [mockReview, ...prev.slice(0, 4)]);
      setIsAnalyzing(false);
    }, 2000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'border-red-500 bg-red-50';
      case 'medium': return 'border-yellow-500 bg-yellow-50';
      case 'low': return 'border-green-500 bg-green-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Code Review</h1>
          <p className="text-gray-600">Intelligent code analysis, optimization suggestions, and security review</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Code Input */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Code Analysis</h2>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="java">Java</option>
                  <option value="cpp">C++</option>
                  <option value="typescript">TypeScript</option>
                  <option value="php">PHP</option>
                </select>
              </div>

              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder={`Enter your ${selectedLanguage} code here...`}
                className="w-full h-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm resize-none"
              />

              <div className="flex justify-end mt-4">
                <button
                  onClick={analyzeCode}
                  disabled={isAnalyzing || !code.trim()}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAnalyzing ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Analyzing...
                    </div>
                  ) : (
                    'Analyze Code'
                  )}
                </button>
              </div>
            </div>

            {/* Analysis Results */}
            {review && (
              <div className="mt-8 space-y-6">
                {/* Overview */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Analysis Overview</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{review.analysis.maintainability}</div>
                      <div className="text-sm text-gray-600">Maintainability</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{review.analysis.readability}</div>
                      <div className="text-sm text-gray-600">Readability</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-2xl font-bold px-3 py-1 rounded-full text-sm ${
                        review.analysis.complexity === 'high' ? 'text-red-600 bg-red-100' :
                        review.analysis.complexity === 'medium' ? 'text-yellow-600 bg-yellow-100' :
                        'text-green-600 bg-green-100'
                      }`}>
                        {review.analysis.complexity.toUpperCase()}
                      </div>
                      <div className="text-sm text-gray-600">Complexity</div>
                    </div>
                  </div>
                </div>

                {/* Issues */}
                {review.analysis.issues.length > 0 && (
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Issues Found</h3>
                    <div className="space-y-3">
                      {review.analysis.issues.map((issue, index) => (
                        <div key={index} className="border-l-4 border-yellow-500 pl-4 py-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium text-gray-900">Line {issue.line}: {issue.message}</div>
                              <div className="text-sm text-gray-600 mt-1">{issue.suggestion}</div>
                            </div>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(issue.severity)}`}>
                              {issue.severity.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Suggestions */}
                {review.suggestions.length > 0 && (
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Optimization Suggestions</h3>
                    <div className="space-y-4">
                      {review.suggestions.map((suggestion, index) => (
                        <div key={index} className={`border rounded-lg p-4 ${getImpactColor(suggestion.impact)}`}>
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-900">{suggestion.title}</h4>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(suggestion.impact)}`}>
                              {suggestion.impact.toUpperCase()} IMPACT
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{suggestion.description}</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <div className="text-sm font-medium text-gray-900 mb-2">Before</div>
                              <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs overflow-x-auto">
                                <code>{suggestion.beforeCode}</code>
                              </pre>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900 mb-2">After</div>
                              <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs overflow-x-auto">
                                <code>{suggestion.afterCode}</code>
                              </pre>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Performance */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Analysis</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="text-sm font-medium text-gray-600">Time Complexity</div>
                      <div className="text-lg font-semibold text-gray-900">{review.performance.timeComplexity}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-600">Space Complexity</div>
                      <div className="text-lg font-semibold text-gray-900">{review.performance.spaceComplexity}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-600">Execution Time</div>
                      <div className="text-lg font-semibold text-gray-900">{review.performance.executionTime}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-600">Memory Usage</div>
                      <div className="text-lg font-semibold text-gray-900">{review.performance.memoryUsage}</div>
                    </div>
                  </div>
                  
                  {review.performance.bottlenecks.length > 0 && (
                    <div className="mt-4">
                      <div className="text-sm font-medium text-gray-600 mb-2">Bottlenecks</div>
                      <ul className="space-y-1">
                        {review.performance.bottlenecks.map((bottleneck, index) => (
                          <li key={index} className="text-sm text-red-600 flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                            {bottleneck}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Security */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Analysis</h3>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-sm font-medium text-gray-600">Risk Level</div>
                      <div className={`text-lg font-semibold px-3 py-1 rounded-full inline-block ${getSeverityColor(review.security.riskLevel)}`}>
                        {review.security.riskLevel.toUpperCase()}
                      </div>
                    </div>
                  </div>
                  
                  {review.security.vulnerabilities.length > 0 ? (
                    <div className="space-y-3">
                      {review.security.vulnerabilities.map((vuln, index) => (
                        <div key={index} className="border-l-4 border-red-500 pl-4 py-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium text-gray-900">{vuln.type}</div>
                              <div className="text-sm text-gray-600 mt-1">{vuln.description}</div>
                              <div className="text-sm text-green-600 mt-1">Fix: {vuln.fix}</div>
                            </div>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(vuln.severity)}`}>
                              {vuln.severity.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-green-600 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      No security vulnerabilities found
                    </div>
                  )}
                  
                  {review.security.recommendations.length > 0 && (
                    <div className="mt-4">
                      <div className="text-sm font-medium text-gray-600 mb-2">Recommendations</div>
                      <ul className="space-y-1">
                        {review.security.recommendations.map((rec, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-center">
                            <svg className="w-3 h-3 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Reviews */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Reviews</h3>
              <div className="space-y-3">
                {recentReviews.map((recentReview) => (
                  <div
                    key={recentReview.id}
                    className="p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => setReview(recentReview)}
                  >
                    <div className="font-medium text-gray-900 text-sm">
                      {recentReview.language.toUpperCase()} Review
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {recentReview.timestamp.toLocaleDateString()}
                    </div>
                    <div className="flex items-center mt-2 space-x-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(recentReview.analysis.complexity)}`}>
                        {recentReview.analysis.complexity}
                      </span>
                      <span className="text-xs text-gray-500">
                        {recentReview.analysis.maintainability}% maintainable
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Best Practices */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Best Practices</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-gray-700">Use meaningful variable names</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-gray-700">Add proper error handling</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                  <span className="text-gray-700">Follow DRY principle</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                  <span className="text-gray-700">Write unit tests</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-gray-700">Validate inputs</span>
                </div>
              </div>
            </div>

            {/* AI Capabilities */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Analysis Features</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-gray-700">Code Complexity Analysis</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-gray-700">Performance Optimization</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                  <span className="text-gray-700">Security Vulnerability Detection</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                  <span className="text-gray-700">Best Practices Suggestions</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-gray-700">Refactoring Recommendations</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeReviewPage;
