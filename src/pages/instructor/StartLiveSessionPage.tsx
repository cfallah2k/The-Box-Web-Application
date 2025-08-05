import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  VideoCameraIcon,
  ClockIcon,
  UserGroupIcon,
  CogIcon,
  PlayIcon,
  PauseIcon,
  StopIcon,
  MicrophoneIcon,
  SpeakerWaveIcon,
  ChatBubbleLeftRightIcon,
  ShareIcon,
  ArrowLeftIcon,
  PlusIcon,
  CalendarIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

interface LiveSession {
  id: string;
  title: string;
  description: string;
  startTime: string;
  duration: number;
  maxParticipants: number;
  isActive: boolean;
  participants: Participant[];
  settings: SessionSettings;
}

interface Participant {
  id: string;
  name: string;
  email: string;
  avatar: string;
  isOnline: boolean;
  isMuted: boolean;
  isVideoOn: boolean;
}

interface SessionSettings {
  allowChat: boolean;
  allowScreenShare: boolean;
  allowRecording: boolean;
  autoMute: boolean;
  waitingRoom: boolean;
}

const StartLiveSessionPage: React.FC = () => {
  const navigate = useNavigate();
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [currentSession, setCurrentSession] = useState<LiveSession | null>(null);
  const [sessionSettings, setSessionSettings] = useState<SessionSettings>({
    allowChat: true,
    allowScreenShare: true,
    allowRecording: false,
    autoMute: true,
    waitingRoom: true,
  });

  const [newSession, setNewSession] = useState({
    title: '',
    description: '',
    startTime: '',
    duration: 60,
    maxParticipants: 50,
  });

  const mockParticipants: Participant[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      isOnline: true,
      isMuted: false,
      isVideoOn: true,
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      isOnline: true,
      isMuted: true,
      isVideoOn: false,
    },
    {
      id: '3',
      name: 'Mike Wilson',
      email: 'mike@example.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      isOnline: false,
      isMuted: false,
      isVideoOn: false,
    },
  ];

  const handleStartSession = () => {
    const session: LiveSession = {
      id: Date.now().toString(),
      title: newSession.title || 'Live Session',
      description: newSession.description,
      startTime: new Date().toISOString(),
      duration: newSession.duration,
      maxParticipants: newSession.maxParticipants,
      isActive: true,
      participants: mockParticipants,
      settings: sessionSettings,
    };
    setCurrentSession(session);
    setIsSessionActive(true);
  };

  const handleStopSession = () => {
    setIsSessionActive(false);
    setCurrentSession(null);
  };

  const handleToggleMute = (participantId: string) => {
    if (currentSession) {
      setCurrentSession({
        ...currentSession,
        participants: currentSession.participants.map(p =>
          p.id === participantId ? { ...p, isMuted: !p.isMuted } : p
        ),
      });
    }
  };

  const handleRemoveParticipant = (participantId: string) => {
    if (currentSession) {
      setCurrentSession({
        ...currentSession,
        participants: currentSession.participants.filter(p => p.id !== participantId),
      });
    }
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
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Live Sessions</h1>
              <p className="text-gray-600 dark:text-gray-400">Manage your live teaching sessions</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/instructor/schedule-session')}
            className="btn-primary"
          >
            <PlusIcon className="w-4 h-4" />
            Schedule Session
          </button>
        </div>

        {!isSessionActive ? (
          /* Session Setup */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Quick Start */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Quick Start Session</h2>
              
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
                    placeholder="Describe your session..."
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Duration (minutes)
                    </label>
                    <input
                      type="number"
                      value={newSession.duration}
                      onChange={(e) => setNewSession(prev => ({ ...prev, duration: parseInt(e.target.value) || 60 }))}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Max Participants
                    </label>
                    <input
                      type="number"
                      value={newSession.maxParticipants}
                      onChange={(e) => setNewSession(prev => ({ ...prev, maxParticipants: parseInt(e.target.value) || 50 }))}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <button
                  onClick={handleStartSession}
                  className="w-full btn-primary"
                >
                  <PlayIcon className="w-4 h-4" />
                  Start Live Session
                </button>
              </div>
            </div>

            {/* Session Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Session Settings</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <ChatBubbleLeftRightIcon className="w-5 h-5 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Allow Chat</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={sessionSettings.allowChat}
                      onChange={(e) => setSessionSettings(prev => ({ ...prev, allowChat: e.target.checked }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <ShareIcon className="w-5 h-5 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Allow Screen Share</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={sessionSettings.allowScreenShare}
                      onChange={(e) => setSessionSettings(prev => ({ ...prev, allowScreenShare: e.target.checked }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <VideoCameraIcon className="w-5 h-5 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Allow Recording</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={sessionSettings.allowRecording}
                      onChange={(e) => setSessionSettings(prev => ({ ...prev, allowRecording: e.target.checked }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <MicrophoneIcon className="w-5 h-5 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Auto Mute Participants</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={sessionSettings.autoMute}
                      onChange={(e) => setSessionSettings(prev => ({ ...prev, autoMute: e.target.checked }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <UserGroupIcon className="w-5 h-5 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Waiting Room</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={sessionSettings.waitingRoom}
                      onChange={(e) => setSessionSettings(prev => ({ ...prev, waitingRoom: e.target.checked }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Active Session */
          <div className="space-y-6">
            {/* Session Controls */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {currentSession?.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {currentSession?.participants.length} participants • {currentSession?.duration} minutes
                  </p>
                </div>
                <div className="flex space-x-3">
                  <button className="btn-secondary">
                    <PauseIcon className="w-4 h-4" />
                    Pause
                  </button>
                  <button
                    onClick={handleStopSession}
                    className="btn-danger"
                  >
                    <StopIcon className="w-4 h-4" />
                    End Session
                  </button>
                </div>
              </div>

              {/* Video Controls */}
              <div className="flex items-center justify-center space-x-4 mb-6">
                <button className="p-4 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600">
                  <MicrophoneIcon className="w-6 h-6" />
                </button>
                <button className="p-4 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600">
                  <VideoCameraIcon className="w-6 h-6" />
                </button>
                <button className="p-4 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600">
                  <ShareIcon className="w-6 h-6" />
                </button>
                <button className="p-4 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600">
                  <ChatBubbleLeftRightIcon className="w-6 h-6" />
                </button>
              </div>

              {/* Video Placeholder */}
              <div className="bg-gray-900 rounded-lg h-96 flex items-center justify-center">
                <div className="text-center text-white">
                  <VideoCameraIcon className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-lg font-medium">Live Session</p>
                  <p className="text-gray-400">Your video will appear here</p>
                </div>
              </div>
            </div>

            {/* Participants */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Participants</h3>
              
              <div className="space-y-3">
                {currentSession?.participants.map((participant) => (
                  <div key={participant.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <img
                        src={participant.avatar}
                        alt={participant.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{participant.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{participant.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${participant.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                      <button
                        onClick={() => handleToggleMute(participant.id)}
                        className={`p-2 rounded-full ${
                          participant.isMuted ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        <MicrophoneIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleRemoveParticipant(participant.id)}
                        className="p-2 text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StartLiveSessionPage; 