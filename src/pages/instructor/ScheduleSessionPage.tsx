import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CalendarIcon,
  ClockIcon,
  UserGroupIcon,
  VideoCameraIcon,
  GlobeAltIcon,
  ArrowLeftIcon,
  PlusIcon,
  CheckIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

interface ScheduledSession {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  maxParticipants: number;
  isRecurring: boolean;
  recurrence: 'weekly' | 'monthly' | null;
  timezone: string;
  status: 'scheduled' | 'live' | 'completed' | 'cancelled';
}

const ScheduleSessionPage: React.FC = () => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<ScheduledSession[]>([
    {
      id: '1',
      title: 'React Hooks Deep Dive',
      description: 'Advanced concepts and best practices for React hooks',
      date: '2024-01-25',
      startTime: '14:00',
      endTime: '15:30',
      maxParticipants: 50,
      isRecurring: true,
      recurrence: 'weekly',
      timezone: 'America/New_York',
      status: 'scheduled',
    },
    {
      id: '2',
      title: 'Q&A Session',
      description: 'Open Q&A for all enrolled students',
      date: '2024-01-28',
      startTime: '10:00',
      endTime: '11:00',
      maxParticipants: 100,
      isRecurring: false,
      recurrence: null,
      timezone: 'America/New_York',
      status: 'scheduled',
    },
  ]);

  const [newSession, setNewSession] = useState({
    title: '',
    description: '',
    date: '',
    startTime: '',
    endTime: '',
    maxParticipants: 50,
    isRecurring: false,
    recurrence: 'weekly' as 'weekly' | 'monthly' | null,
    timezone: 'America/New_York',
  });

  const timezones = [
    'America/New_York',
    'America/Chicago',
    'America/Denver',
    'America/Los_Angeles',
    'Europe/London',
    'Europe/Paris',
    'Asia/Tokyo',
    'Australia/Sydney',
  ];

  const handleAddSession = () => {
    if (newSession.title && newSession.date && newSession.startTime && newSession.endTime) {
      const session: ScheduledSession = {
        id: Date.now().toString(),
        title: newSession.title,
        description: newSession.description,
        date: newSession.date,
        startTime: newSession.startTime,
        endTime: newSession.endTime,
        maxParticipants: newSession.maxParticipants,
        isRecurring: newSession.isRecurring,
        recurrence: newSession.isRecurring ? newSession.recurrence : null,
        timezone: newSession.timezone,
        status: 'scheduled',
      };
      setSessions(prev => [...prev, session]);
      setNewSession({
        title: '',
        description: '',
        date: '',
        startTime: '',
        endTime: '',
        maxParticipants: 50,
        isRecurring: false,
        recurrence: 'weekly',
        timezone: 'America/New_York',
      });
    }
  };

  const handleDeleteSession = (sessionId: string) => {
    setSessions(prev => prev.filter(s => s.id !== sessionId));
  };

  const handleStartSession = (sessionId: string) => {
    setSessions(prev => prev.map(s => 
      s.id === sessionId ? { ...s, status: 'live' as const } : s
    ));
    navigate('/instructor/start-session');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container-responsive py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/instructor/dashboard')}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <ArrowLeftIcon className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Schedule Sessions</h1>
              <p className="text-gray-600 dark:text-gray-400">Plan and manage your live teaching sessions</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Schedule New Session */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Schedule New Session</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Session Title
                </label>
                <input
                  type="text"
                  value={newSession.title}
                  onChange={(e) => setNewSession(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter session title"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={newSession.description}
                  onChange={(e) => setNewSession(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  placeholder="Describe the session..."
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    value={newSession.date}
                    onChange={(e) => setNewSession(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Timezone
                  </label>
                  <select
                    value={newSession.timezone}
                    onChange={(e) => setNewSession(prev => ({ ...prev, timezone: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  >
                    {timezones.map((tz) => (
                      <option key={tz} value={tz}>{tz}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Start Time
                  </label>
                  <input
                    type="time"
                    value={newSession.startTime}
                    onChange={(e) => setNewSession(prev => ({ ...prev, startTime: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    End Time
                  </label>
                  <input
                    type="time"
                    value={newSession.endTime}
                    onChange={(e) => setNewSession(prev => ({ ...prev, endTime: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Maximum Participants
                </label>
                <input
                  type="number"
                  value={newSession.maxParticipants}
                  onChange={(e) => setNewSession(prev => ({ ...prev, maxParticipants: parseInt(e.target.value) || 50 }))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="recurring"
                  checked={newSession.isRecurring}
                  onChange={(e) => setNewSession(prev => ({ ...prev, isRecurring: e.target.checked }))}
                  className="rounded"
                />
                <label htmlFor="recurring" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Recurring session
                </label>
              </div>

              {newSession.isRecurring && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Recurrence
                  </label>
                  <select
                    value={newSession.recurrence || ''}
                    onChange={(e) => setNewSession(prev => ({ ...prev, recurrence: e.target.value as 'weekly' | 'monthly' }))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
              )}

              <button
                onClick={handleAddSession}
                className="w-full btn-primary"
              >
                <PlusIcon className="w-4 h-4" />
                Schedule Session
              </button>
            </div>
          </div>

          {/* Scheduled Sessions */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Scheduled Sessions</h2>
            
            <div className="space-y-4">
              {sessions.map((session) => (
                <div key={session.id} className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                        {session.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {session.description}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <CalendarIcon className="w-4 h-4" />
                          <span>{new Date(session.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <ClockIcon className="w-4 h-4" />
                          <span>{session.startTime} - {session.endTime}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <UserGroupIcon className="w-4 h-4" />
                          <span>{session.maxParticipants} max</span>
                        </div>
                      </div>
                      {session.isRecurring && (
                        <div className="mt-2">
                          <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded">
                            {session.recurrence} recurring
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      {session.status === 'scheduled' && (
                        <button
                          onClick={() => handleStartSession(session.id)}
                          className="p-2 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/20 rounded"
                        >
                          <VideoCameraIcon className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteSession(session.id)}
                        className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded"
                      >
                        <XMarkIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleSessionPage; 