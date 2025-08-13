import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface CertificateTemplate {
  id: string;
  name: string;
  courseId: string;
  courseName: string;
  templateType: 'basic' | 'premium' | 'custom';
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  logo?: string;
  signature?: string;
  requirements: CertificateRequirement[];
  isActive: boolean;
  createdAt: string;
  issuedCount: number;
}

interface CertificateRequirement {
  type: 'completion' | 'score' | 'attendance' | 'assignment';
  value: number;
  description: string;
}

interface StudentEligibility {
  studentId: string;
  studentName: string;
  email: string;
  progress: number;
  averageScore: number;
  assignmentsCompleted: number;
  isEligible: boolean;
  requirementsMet: string[];
  missingRequirements: string[];
}

const CertificateGeneratorPage: React.FC = () => {
  const { user } = useAuth();
  const [templates, setTemplates] = useState<CertificateTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<CertificateTemplate | null>(null);
  const [eligibleStudents, setEligibleStudents] = useState<StudentEligibility[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockTemplates: CertificateTemplate[] = [
        {
          id: '1',
          name: 'React Development Certificate',
          courseId: 'course-1',
          courseName: 'React Development Fundamentals',
          templateType: 'premium',
          backgroundColor: '#1a365d',
          textColor: '#ffffff',
          accentColor: '#4299e1',
          logo: '/api/placeholder/200/100',
          signature: '/api/placeholder/150/50',
          requirements: [
            { type: 'completion', value: 100, description: 'Complete all course modules' },
            { type: 'score', value: 80, description: 'Maintain 80% or higher average score' },
            { type: 'assignment', value: 8, description: 'Complete all 8 assignments' }
          ],
          isActive: true,
          createdAt: '2024-01-15T10:00:00Z',
          issuedCount: 156
        },
        {
          id: '2',
          name: 'JavaScript Mastery Certificate',
          courseId: 'course-2',
          courseName: 'Advanced JavaScript Concepts',
          templateType: 'basic',
          backgroundColor: '#2d3748',
          textColor: '#ffffff',
          accentColor: '#f6ad55',
          requirements: [
            { type: 'completion', value: 100, description: 'Complete all course modules' },
            { type: 'score', value: 85, description: 'Maintain 85% or higher average score' }
          ],
          isActive: true,
          createdAt: '2024-01-10T14:30:00Z',
          issuedCount: 89
        }
      ];

      const mockEligibleStudents: StudentEligibility[] = [
        {
          studentId: '1',
          studentName: 'John Doe',
          email: 'john.doe@example.com',
          progress: 100,
          averageScore: 92,
          assignmentsCompleted: 8,
          isEligible: true,
          requirementsMet: ['Complete all course modules', 'Maintain 80% or higher average score', 'Complete all 8 assignments'],
          missingRequirements: []
        },
        {
          studentId: '2',
          studentName: 'Jane Smith',
          email: 'jane.smith@example.com',
          progress: 95,
          averageScore: 78,
          assignmentsCompleted: 7,
          isEligible: false,
          requirementsMet: ['Complete all course modules'],
          missingRequirements: ['Maintain 80% or higher average score', 'Complete all 8 assignments']
        }
      ];

      setTemplates(mockTemplates);
      setEligibleStudents(mockEligibleStudents);
      setLoading(false);
    };

    loadData();
  }, []);

  const createCertificate = (templateId: string, studentIds: string[]) => {
    // Simulate certificate generation
    console.log(`Generating certificates for template ${templateId} and students ${studentIds.join(', ')}`);
    setShowCreateModal(false);
  };

  const getTemplateTypeColor = (type: string) => {
    switch (type) {
      case 'basic': return 'bg-gray-100 text-gray-800';
      case 'premium': return 'bg-yellow-100 text-yellow-800';
      case 'custom': return 'bg-purple-100 text-purple-800';
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading certificate templates...</p>
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Certificate Generator</h1>
              <p className="text-gray-600">Create and manage course completion certificates</p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create New Template
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Templates</p>
                <p className="text-2xl font-bold text-gray-900">{templates.length}</p>
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
                <p className="text-sm font-medium text-gray-600">Active Templates</p>
                <p className="text-2xl font-bold text-gray-900">
                  {templates.filter(t => t.isActive).length}
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
                <p className="text-sm font-medium text-gray-600">Total Issued</p>
                <p className="text-2xl font-bold text-gray-900">
                  {templates.reduce((sum, t) => sum + t.issuedCount, 0)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Eligible Students</p>
                <p className="text-2xl font-bold text-gray-900">
                  {eligibleStudents.filter(s => s.isEligible).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Certificate Templates */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Certificate Templates</h2>
            <div className="space-y-4">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                    selectedTemplate?.id === template.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                  onClick={() => setSelectedTemplate(template)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-medium text-gray-900">{template.name}</h3>
                      <p className="text-sm text-gray-600">{template.courseName}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTemplateTypeColor(template.templateType)}`}>
                        {template.templateType.charAt(0).toUpperCase() + template.templateType.slice(1)}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        template.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {template.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Issued</p>
                      <p className="font-medium text-gray-900">{template.issuedCount}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Created</p>
                      <p className="font-medium text-gray-900">{formatDate(template.createdAt)}</p>
                    </div>
                  </div>

                  <div className="mt-3">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Requirements:</h4>
                    <ul className="space-y-1">
                      {template.requirements.map((req, index) => (
                        <li key={index} className="text-xs text-gray-600 flex items-center">
                          <svg className="w-3 h-3 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {req.description}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 flex space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTemplate(template);
                        setShowPreviewModal(true);
                      }}
                      className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      Preview
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTemplate(template);
                        setShowCreateModal(true);
                      }}
                      className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                    >
                      Generate
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Eligible Students */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Eligible Students</h2>
            <div className="space-y-4">
              {eligibleStudents.map((student) => (
                <div key={student.studentId} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-medium text-gray-900">{student.studentName}</h3>
                      <p className="text-sm text-gray-600">{student.email}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      student.isEligible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {student.isEligible ? 'Eligible' : 'Not Eligible'}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                    <div>
                      <p className="text-gray-600">Progress</p>
                      <p className="font-medium text-gray-900">{student.progress}%</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Avg Score</p>
                      <p className="font-medium text-gray-900">{student.averageScore}%</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Assignments</p>
                      <p className="font-medium text-gray-900">{student.assignmentsCompleted}/8</p>
                    </div>
                  </div>

                  {student.isEligible ? (
                    <div className="bg-green-50 p-3 rounded-lg">
                      <h4 className="text-sm font-medium text-green-900 mb-2">Requirements Met:</h4>
                      <ul className="space-y-1">
                        {student.requirementsMet.map((req, index) => (
                          <li key={index} className="text-xs text-green-700 flex items-center">
                            <svg className="w-3 h-3 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div className="bg-red-50 p-3 rounded-lg">
                      <h4 className="text-sm font-medium text-red-900 mb-2">Missing Requirements:</h4>
                      <ul className="space-y-1">
                        {student.missingRequirements.map((req, index) => (
                          <li key={index} className="text-xs text-red-700 flex items-center">
                            <svg className="w-3 h-3 mr-1 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
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
          </div>
        </div>

        {/* Certificate Preview Modal */}
        {showPreviewModal && selectedTemplate && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Certificate Preview</h3>
                  <button
                    onClick={() => setShowPreviewModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                {/* Certificate Preview */}
                <div
                  className="w-full h-96 border-8 border-gray-300 rounded-lg p-8 text-center relative"
                  style={{
                    backgroundColor: selectedTemplate.backgroundColor,
                    color: selectedTemplate.textColor
                  }}
                >
                  {selectedTemplate.logo && (
                    <img
                      src={selectedTemplate.logo}
                      alt="Course Logo"
                      className="mx-auto mb-6 h-16"
                    />
                  )}
                  
                  <h1 className="text-3xl font-bold mb-4">Certificate of Completion</h1>
                  <p className="text-lg mb-6">This is to certify that</p>
                  <h2 className="text-2xl font-bold mb-6 text-blue-300">John Doe</h2>
                  <p className="text-lg mb-6">has successfully completed the course</p>
                  <h3 className="text-xl font-semibold mb-8">{selectedTemplate.courseName}</h3>
                  
                  <div className="flex justify-between items-end">
                    <div className="text-left">
                      <p className="text-sm">Date: {new Date().toLocaleDateString()}</p>
                      <p className="text-sm">Certificate ID: CERT-{selectedTemplate.id}-001</p>
                    </div>
                    {selectedTemplate.signature && (
                      <img
                        src={selectedTemplate.signature}
                        alt="Instructor Signature"
                        className="h-12"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Generate Certificate Modal */}
        {showCreateModal && selectedTemplate && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Generate Certificates - {selectedTemplate.name}
                </h3>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Eligible Students
                  </label>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {eligibleStudents
                      .filter(student => student.isEligible)
                      .map((student) => (
                        <label key={student.studentId} className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            defaultChecked
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{student.studentName}</p>
                            <p className="text-xs text-gray-500">{student.email}</p>
                          </div>
                        </label>
                      ))}
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => createCertificate(selectedTemplate.id, ['1', '2'])}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Generate Certificates
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

export default CertificateGeneratorPage;
