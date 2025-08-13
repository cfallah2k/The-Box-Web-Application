import React, { useState } from 'react';

interface CertificateVerification {
  certificateId: string;
  studentName: string;
  courseName: string;
  instructorName: string;
  issuedDate: string;
  expiryDate?: string;
  status: 'valid' | 'expired' | 'revoked' | 'not_found';
  grade?: number;
  verificationUrl: string;
  requirements: string[];
}

const CertificateVerificationPage: React.FC = () => {
  const [certificateId, setCertificateId] = useState('');
  const [verificationResult, setVerificationResult] = useState<CertificateVerification | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const verifyCertificate = async () => {
    if (!certificateId.trim()) {
      setError('Please enter a certificate ID');
      return;
    }

    setLoading(true);
    setError('');
    setVerificationResult(null);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock verification results
    const mockResults: Record<string, CertificateVerification> = {
      'CERT-2024-001': {
        certificateId: 'CERT-2024-001',
        studentName: 'John Doe',
        courseName: 'React Development Fundamentals',
        instructorName: 'Sarah Johnson',
        issuedDate: '2024-01-20T10:30:00Z',
        expiryDate: '2027-01-20T10:30:00Z',
        status: 'valid',
        grade: 92,
        verificationUrl: 'https://verify.example.com/CERT-2024-001',
        requirements: ['Complete all course modules', 'Maintain 80% or higher average score', 'Complete all 8 assignments']
      },
      'CERT-2024-002': {
        certificateId: 'CERT-2024-002',
        studentName: 'Jane Smith',
        courseName: 'Advanced JavaScript Concepts',
        instructorName: 'Mike Chen',
        issuedDate: '2024-01-15T16:45:00Z',
        status: 'valid',
        grade: 88,
        verificationUrl: 'https://verify.example.com/CERT-2024-002',
        requirements: ['Complete all course modules', 'Maintain 85% or higher average score']
      },
      'CERT-2023-156': {
        certificateId: 'CERT-2023-156',
        studentName: 'Mike Johnson',
        courseName: 'React Development Fundamentals',
        instructorName: 'Sarah Johnson',
        issuedDate: '2023-12-15T11:20:00Z',
        expiryDate: '2026-12-15T11:20:00Z',
        status: 'expired',
        grade: 85,
        verificationUrl: 'https://verify.example.com/CERT-2023-156',
        requirements: ['Complete all course modules', 'Maintain 80% or higher average score', 'Complete all 8 assignments']
      }
    };

    const result = mockResults[certificateId];
    
    if (result) {
      setVerificationResult(result);
    } else {
      setVerificationResult({
        certificateId,
        studentName: '',
        courseName: '',
        instructorName: '',
        issuedDate: '',
        status: 'not_found',
        verificationUrl: '',
        requirements: []
      });
    }

    setLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'valid': return 'bg-green-100 text-green-800';
      case 'expired': return 'bg-yellow-100 text-yellow-800';
      case 'revoked': return 'bg-red-100 text-red-800';
      case 'not_found': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'valid': return 'Valid';
      case 'expired': return 'Expired';
      case 'revoked': return 'Revoked';
      case 'not_found': return 'Not Found';
      default: return 'Unknown';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Certificate Verification</h1>
          <p className="text-xl text-gray-600">Verify the authenticity of any certificate issued by our platform</p>
        </div>

        {/* Verification Form */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Enter Certificate ID</h2>
            
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="e.g., CERT-2024-001"
                value={certificateId}
                onChange={(e) => setCertificateId(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                onKeyPress={(e) => e.key === 'Enter' && verifyCertificate()}
              />
              <button
                onClick={verifyCertificate}
                disabled={loading}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg font-medium"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Verifying...
                  </div>
                ) : (
                  'Verify'
                )}
              </button>
            </div>

            {error && (
              <p className="mt-3 text-red-600 text-sm">{error}</p>
            )}
          </div>
        </div>

        {/* Verification Result */}
        {verificationResult && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">Verification Result</h2>
                <span className={`px-4 py-2 text-sm font-medium rounded-full ${getStatusColor(verificationResult.status)}`}>
                  {getStatusText(verificationResult.status)}
                </span>
              </div>

              {verificationResult.status === 'not_found' ? (
                <div className="text-center py-12">
                  <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Certificate Not Found</h3>
                  <p className="text-gray-600">
                    The certificate ID "{verificationResult.certificateId}" was not found in our system.
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Please check the certificate ID and try again.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Certificate Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Certificate Information</h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Certificate ID</p>
                          <p className="text-sm text-gray-900 font-mono">{verificationResult.certificateId}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600">Student Name</p>
                          <p className="text-sm text-gray-900">{verificationResult.studentName}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600">Course</p>
                          <p className="text-sm text-gray-900">{verificationResult.courseName}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600">Instructor</p>
                          <p className="text-sm text-gray-900">{verificationResult.instructorName}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Completion Details</h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Issued Date</p>
                          <p className="text-sm text-gray-900">{formatDate(verificationResult.issuedDate)}</p>
                        </div>
                        {verificationResult.expiryDate && (
                          <div>
                            <p className="text-sm font-medium text-gray-600">Expiry Date</p>
                            <p className="text-sm text-gray-900">{formatDate(verificationResult.expiryDate)}</p>
                          </div>
                        )}
                        {verificationResult.grade && (
                          <div>
                            <p className="text-sm font-medium text-gray-600">Final Grade</p>
                            <p className="text-sm text-gray-900">{verificationResult.grade}%</p>
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-medium text-gray-600">Verification URL</p>
                          <a
                            href={verificationResult.verificationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:text-blue-800 break-all"
                          >
                            {verificationResult.verificationUrl}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Requirements */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Requirements Met</h3>
                    <ul className="space-y-2">
                      {verificationResult.requirements.map((req, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-center">
                          <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Status Information */}
                  {verificationResult.status === 'expired' && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex">
                        <svg className="w-5 h-5 text-yellow-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <h4 className="text-sm font-medium text-yellow-800">Certificate Expired</h4>
                          <p className="text-sm text-yellow-700 mt-1">
                            This certificate has expired. Please contact the issuing institution for renewal options.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {verificationResult.status === 'revoked' && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex">
                        <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <div>
                          <h4 className="text-sm font-medium text-red-800">Certificate Revoked</h4>
                          <p className="text-sm text-red-700 mt-1">
                            This certificate has been revoked and is no longer valid.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {verificationResult.status === 'valid' && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex">
                        <svg className="w-5 h-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <h4 className="text-sm font-medium text-green-800">Certificate Valid</h4>
                          <p className="text-sm text-green-700 mt-1">
                            This certificate is valid and has been verified in our system.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Information Section */}
        <div className="mt-12 bg-blue-50 rounded-lg p-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">About Certificate Verification</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">How to Verify</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Enter the certificate ID exactly as shown on the certificate</li>
                  <li>• Certificate IDs typically start with "CERT-" followed by numbers</li>
                  <li>• Verification results are instant and secure</li>
                  <li>• All certificates are stored on our secure blockchain</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Certificate Status</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• <span className="text-green-600 font-medium">Valid:</span> Certificate is active and verified</li>
                  <li>• <span className="text-yellow-600 font-medium">Expired:</span> Certificate has passed its expiry date</li>
                  <li>• <span className="text-red-600 font-medium">Revoked:</span> Certificate has been invalidated</li>
                  <li>• <span className="text-gray-600 font-medium">Not Found:</span> Certificate ID doesn't exist in our system</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateVerificationPage;
