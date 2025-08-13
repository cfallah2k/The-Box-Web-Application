import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface Certificate {
  id: string;
  certificateId: string;
  studentName: string;
  studentEmail: string;
  courseName: string;
  instructorName: string;
  templateName: string;
  issuedDate: string;
  expiryDate?: string;
  status: 'active' | 'expired' | 'revoked';
  verificationUrl: string;
  downloadUrl: string;
  grade?: number;
  completionDate: string;
  requirements: string[];
}

interface CertificateStats {
  totalIssued: number;
  activeCertificates: number;
  expiredCertificates: number;
  revokedCertificates: number;
  thisMonth: number;
  thisYear: number;
  topCourses: TopCourse[];
  recentActivity: RecentActivity[];
}

interface TopCourse {
  courseName: string;
  certificatesIssued: number;
  averageGrade: number;
}

interface RecentActivity {
  id: string;
  type: 'issued' | 'expired' | 'revoked';
  studentName: string;
  courseName: string;
  timestamp: string;
  description: string;
}

const CertificateManagementPage: React.FC = () => {
  const { user } = useAuth();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [stats, setStats] = useState<CertificateStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'active' | 'expired' | 'revoked'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockCertificates: Certificate[] = [
        {
          id: '1',
          certificateId: 'CERT-2024-001',
          studentName: 'John Doe',
          studentEmail: 'john.doe@example.com',
          courseName: 'React Development Fundamentals',
          instructorName: 'Sarah Johnson',
          templateName: 'React Development Certificate',
          issuedDate: '2024-01-20T10:30:00Z',
          expiryDate: '2027-01-20T10:30:00Z',
          status: 'active',
          verificationUrl: 'https://verify.example.com/CERT-2024-001',
          downloadUrl: '/api/certificates/CERT-2024-001/download',
          grade: 92,
          completionDate: '2024-01-18T14:20:00Z',
          requirements: ['Complete all course modules', 'Maintain 80% or higher average score', 'Complete all 8 assignments']
        },
        {
          id: '2',
          certificateId: 'CERT-2024-002',
          studentName: 'Jane Smith',
          studentEmail: 'jane.smith@example.com',
          courseName: 'Advanced JavaScript Concepts',
          instructorName: 'Mike Chen',
          templateName: 'JavaScript Mastery Certificate',
          issuedDate: '2024-01-15T16:45:00Z',
          status: 'active',
          verificationUrl: 'https://verify.example.com/CERT-2024-002',
          downloadUrl: '/api/certificates/CERT-2024-002/download',
          grade: 88,
          completionDate: '2024-01-14T09:15:00Z',
          requirements: ['Complete all course modules', 'Maintain 85% or higher average score']
        },
        {
          id: '3',
          certificateId: 'CERT-2023-156',
          studentName: 'Mike Johnson',
          studentEmail: 'mike.johnson@example.com',
          courseName: 'React Development Fundamentals',
          instructorName: 'Sarah Johnson',
          templateName: 'React Development Certificate',
          issuedDate: '2023-12-15T11:20:00Z',
          expiryDate: '2026-12-15T11:20:00Z',
          status: 'expired',
          verificationUrl: 'https://verify.example.com/CERT-2023-156',
          downloadUrl: '/api/certificates/CERT-2023-156/download',
          grade: 85,
          completionDate: '2023-12-12T13:30:00Z',
          requirements: ['Complete all course modules', 'Maintain 80% or higher average score', 'Complete all 8 assignments']
        }
      ];

      const mockStats: CertificateStats = {
        totalIssued: 1247,
        activeCertificates: 1189,
        expiredCertificates: 45,
        revokedCertificates: 13,
        thisMonth: 89,
        thisYear: 234,
        topCourses: [
          { courseName: 'React Development Fundamentals', certificatesIssued: 456, averageGrade: 87 },
          { courseName: 'Advanced JavaScript Concepts', certificatesIssued: 234, averageGrade: 82 },
          { courseName: 'UI/UX Design Masterclass', certificatesIssued: 189, averageGrade: 89 }
        ],
        recentActivity: [
          {
            id: '1',
            type: 'issued',
            studentName: 'John Doe',
            courseName: 'React Development Fundamentals',
            timestamp: '2024-01-20T10:30:00Z',
            description: 'Certificate issued for React Development Fundamentals'
          },
          {
            id: '2',
            type: 'issued',
            studentName: 'Jane Smith',
            courseName: 'Advanced JavaScript Concepts',
            timestamp: '2024-01-15T16:45:00Z',
            description: 'Certificate issued for Advanced JavaScript Concepts'
          },
          {
            id: '3',
            type: 'expired',
            studentName: 'Mike Johnson',
            courseName: 'React Development Fundamentals',
            timestamp: '2024-01-10T09:00:00Z',
            description: 'Certificate expired for React Development Fundamentals'
          }
        ]
      };

      setCertificates(mockCertificates);
      setStats(mockStats);
      setLoading(false);
    };

    loadData();
  }, []);

  const filteredCertificates = certificates.filter(certificate => {
    const matchesStatus = filter === 'all' || certificate.status === filter;
    const matchesSearch = 
      certificate.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      certificate.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      certificate.certificateId.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const revokeCertificate = (certificateId: string) => {
    setCertificates(prev => prev.map(cert => 
      cert.id === certificateId ? { ...cert, status: 'revoked' as const } : cert
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'expired': return 'bg-yellow-100 text-yellow-800';
      case 'revoked': return 'bg-red-100 text-red-800';
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

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading certificates...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Certificate Management</h1>
          <p className="text-gray-600">Manage and oversee all certificates across the platform</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Issued</p>
                <p className="text-2xl font-bold text-gray-900">{stats?.totalIssued.toLocaleString()}</p>
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
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-bold text-gray-900">{stats?.activeCertificates.toLocaleString()}</p>
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
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">{stats?.thisMonth}</p>
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
                <p className="text-sm font-medium text-gray-600">This Year</p>
                <p className="text-2xl font-bold text-gray-900">{stats?.thisYear}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Certificates Table */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">All Certificates</h2>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Search certificates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value as any)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="expired">Expired</option>
                    <option value="revoked">Revoked</option>
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Certificate
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Student
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Course
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredCertificates.map((certificate) => (
                      <tr key={certificate.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{certificate.certificateId}</div>
                            <div className="text-sm text-gray-500">{formatDate(certificate.issuedDate)}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{certificate.studentName}</div>
                            <div className="text-sm text-gray-500">{certificate.studentEmail}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{certificate.courseName}</div>
                            <div className="text-sm text-gray-500">by {certificate.instructorName}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(certificate.status)}`}>
                            {certificate.status.charAt(0).toUpperCase() + certificate.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => {
                                setSelectedCertificate(certificate);
                                setShowDetailsModal(true);
                              }}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              View
                            </button>
                            <button className="text-green-600 hover:text-green-900">
                              Download
                            </button>
                            {certificate.status === 'active' && (
                              <button
                                onClick={() => revokeCertificate(certificate.id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                Revoke
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Top Courses */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Courses</h3>
              <div className="space-y-4">
                {stats?.topCourses.map((course, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{course.courseName}</h4>
                      <span className="text-sm text-gray-500">#{index + 1}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Certificates</p>
                        <p className="font-medium text-gray-900">{course.certificatesIssued}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Avg Grade</p>
                        <p className="font-medium text-gray-900">{course.averageGrade}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {stats?.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        activity.type === 'issued' ? 'bg-green-100' :
                        activity.type === 'expired' ? 'bg-yellow-100' :
                        'bg-red-100'
                      }`}>
                        {activity.type === 'issued' && (
                          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                        {activity.type === 'expired' && (
                          <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                        {activity.type === 'revoked' && (
                          <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.studentName}</p>
                      <p className="text-sm text-gray-600">{activity.description}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatDateTime(activity.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Certificate Details Modal */}
        {showDetailsModal && selectedCertificate && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Certificate Details</h3>
                  <button
                    onClick={() => setShowDetailsModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Certificate ID</p>
                      <p className="text-sm text-gray-900">{selectedCertificate.certificateId}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Status</p>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedCertificate.status)}`}>
                        {selectedCertificate.status.charAt(0).toUpperCase() + selectedCertificate.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-600">Student</p>
                    <p className="text-sm text-gray-900">{selectedCertificate.studentName}</p>
                    <p className="text-sm text-gray-500">{selectedCertificate.studentEmail}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-600">Course</p>
                    <p className="text-sm text-gray-900">{selectedCertificate.courseName}</p>
                    <p className="text-sm text-gray-500">Instructor: {selectedCertificate.instructorName}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Issued Date</p>
                      <p className="text-sm text-gray-900">{formatDateTime(selectedCertificate.issuedDate)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Completion Date</p>
                      <p className="text-sm text-gray-900">{formatDateTime(selectedCertificate.completionDate)}</p>
                    </div>
                  </div>

                  {selectedCertificate.grade && (
                    <div>
                      <p className="text-sm font-medium text-gray-600">Final Grade</p>
                      <p className="text-sm text-gray-900">{selectedCertificate.grade}%</p>
                    </div>
                  )}

                  <div>
                    <p className="text-sm font-medium text-gray-600">Requirements Met</p>
                    <ul className="mt-2 space-y-1">
                      {selectedCertificate.requirements.map((req, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-center">
                          <svg className="w-3 h-3 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex justify-end space-x-3 pt-4 border-t">
                    <a
                      href={selectedCertificate.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Verify
                    </a>
                    <a
                      href={selectedCertificate.downloadUrl}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Download
                    </a>
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

export default CertificateManagementPage;
