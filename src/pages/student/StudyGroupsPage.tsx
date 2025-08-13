import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface StudyGroup {
  id: string;
  name: string;
  course: string;
  members: number;
  maxMembers: number;
  description: string;
  meetingTime: string;
  meetingDay: string;
  isJoined: boolean;
  leader: string;
  topics: string[];
}

const StudyGroupsPage: React.FC = () => {
  const { user } = useAuth();
  const [studyGroups, setStudyGroups] = useState<StudyGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'joined' | 'available'>('all');

  useEffect(() => {
    const loadStudyGroups = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockStudyGroups: StudyGroup[] = [
        {
          id: '1',
          name: 'React Masters',
          course: 'React Development Fundamentals',
          members: 8,
          maxMembers: 12,
          description: 'Advanced React concepts and best practices discussion group',
          meetingTime: '7:00 PM',
          meetingDay: 'Tuesdays',
          isJoined: true,
          leader: 'Sarah Johnson',
          topics: ['Hooks', 'Context API', 'Performance']
        },
        {
          id: '2',
          name: 'JavaScript Fundamentals',
          course: 'Advanced JavaScript Concepts',
          members: 15,
          maxMembers: 20,
          description: 'Deep dive into JavaScript core concepts',
          meetingTime: '6:30 PM',
          meetingDay: 'Thursdays',
          isJoined: false,
          leader: 'Mike Chen',
          topics: ['Closures', 'Prototypes', 'Async/Await']
        }
      ];
      
      setStudyGroups(mockStudyGroups);
      setLoading(false);
    };

    loadStudyGroups();
  }, []);

  const joinStudyGroup = (groupId: string) => {
    setStudyGroups(prev => prev.map(group => 
      group.id === groupId ? { ...group, isJoined: true, members: group.members + 1 } : group
    ));
  };

  const leaveStudyGroup = (groupId: string) => {
    setStudyGroups(prev => prev.map(group => 
      group.id === groupId ? { ...group, isJoined: false, members: group.members - 1 } : group
    ));
  };

  const filteredGroups = studyGroups.filter(group => {
    if (filter === 'joined') return group.isJoined;
    if (filter === 'available') return !group.isJoined;
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading study groups...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Study Groups</h1>
          <p className="text-gray-600">Join study groups to learn together with peers</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex gap-2">
            {(['all', 'joined', 'available'] as const).map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === filterType
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.map((group) => (
            <div key={group.id} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{group.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  group.isJoined ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {group.isJoined ? 'Joined' : 'Available'}
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-2">{group.course}</p>
              <p className="text-sm text-gray-700 mb-4">{group.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Members:</span>
                  <span className="font-medium text-gray-900">{group.members}/{group.maxMembers}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Leader:</span>
                  <span className="font-medium text-gray-900">{group.leader}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Meets:</span>
                  <span className="font-medium text-gray-900">{group.meetingDay}s at {group.meetingTime}</span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Topics:</p>
                <div className="flex flex-wrap gap-1">
                  {group.topics.map((topic, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => group.isJoined ? leaveStudyGroup(group.id) : joinStudyGroup(group.id)}
                className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                  group.isJoined
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {group.isJoined ? 'Leave Group' : 'Join Group'}
              </button>
            </div>
          ))}
        </div>

        {filteredGroups.length === 0 && (
          <div className="text-center py-12">
            <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No study groups found</h3>
            <p className="text-gray-600 mb-6">
              {filter === 'joined' ? 'You haven\'t joined any study groups yet.' : 'No study groups available.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyGroupsPage;
