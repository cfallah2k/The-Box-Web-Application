import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface Certificate {
  id: string;
  courseName: string;
  instructor: string;
  issueDate: string;
  certificateUrl: string;
  grade: string;
  hoursCompleted: number;
  status: 'issued' | 'pending' | 'expired';
}

const CertificatesPage: React.FC = () => {
  const { user } = useAuth();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCertificates = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockCertificates: Certificate[] = [
        {
          id: '1',
          courseName: 'Advanced JavaScript Concepts',
          instructor: 'Mike Chen',
          issueDate: '2024-01-15',
          certificateUrl: '/certificates/js-advanced.pdf',
          grade: 'A+',
          hoursCompleted: 32,
          status: 'issued'
        },
        {
          id: '2',
          courseName: 'React Development Fundamentals',
          instructor: 'Sarah Johnson',
          issueDate: '2024-01-10',
          certificateUrl: '/certificates/react-fundamentals.pdf',
          grade: 'A',
          hoursCompleted: 24,
          status: 'issued'
        }
      ];
      
      setCertificates(mockCertificates);
      setLoading(false);
    };

    loadCertificates();
  }, []);

  const downloadCertificate = (certificate: Certificate) => {
    // Simulate download
    const link = document.createElement('a');
    link.href = certificate.certificateUrl;
    link.download = `${certificate.courseName}-Certificate.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Certificates</h1>
          <p className="text-gray-600">View and download your earned certificates</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((certificate) => (
            <div key={certificate.id} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  certificate.status === 'issued' ? 'bg-green-100 text-green-800' :
                  certificate.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {certificate.status.charAt(0).toUpperCase() + certificate.status.slice(1)}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">{certificate.courseName}</h3>
              <p className="text-sm text-gray-600 mb-4">by {certificate.instructor}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Grade:</span>
                  <span className="font-medium text-gray-900">{certificate.grade}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Hours:</span>
                  <span className="font-medium text-gray-900">{certificate.hoursCompleted}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Issued:</span>
                  <span className="font-medium text-gray-900">{certificate.issueDate}</span>
                </div>
              </div>

              <button
                onClick={() => downloadCertificate(certificate)}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Download Certificate
              </button>
            </div>
          ))}
        </div>

        {certificates.length === 0 && (
          <div className="text-center py-12">
            <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No certificates yet</h3>
            <p className="text-gray-600 mb-6">Complete courses to earn certificates</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificatesPage;
