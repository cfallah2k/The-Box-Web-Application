import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface CalendarEvent {
  id: string;
  title: string;
  type: 'assignment' | 'quiz' | 'live-session' | 'deadline' | 'reminder';
  courseName: string;
  date: string;
  time?: string;
  duration?: number; // in minutes
  status: 'upcoming' | 'completed' | 'overdue';
  priority: 'low' | 'medium' | 'high';
  description?: string;
  location?: string;
  instructor?: string;
}

const CalendarPage: React.FC = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockEvents: CalendarEvent[] = [
        {
          id: '1',
          title: 'React Hooks Quiz',
          type: 'quiz',
          courseName: 'React Development Fundamentals',
          date: '2024-01-25T14:00:00Z',
          time: '14:00',
          duration: 30,
          status: 'upcoming',
          priority: 'high',
          description: 'Test your knowledge of React hooks including useState, useEffect, and custom hooks.',
          instructor: 'Sarah Johnson'
        },
        {
          id: '2',
          title: 'Build a Todo App - Assignment Due',
          type: 'assignment',
          courseName: 'React Development Fundamentals',
          date: '2024-01-25T23:59:00Z',
          status: 'upcoming',
          priority: 'high',
          description: 'Create a simple todo application using React hooks and state management.',
          instructor: 'Sarah Johnson'
        },
        {
          id: '3',
          title: 'Live Q&A Session',
          type: 'live-session',
          courseName: 'Advanced JavaScript',
          date: '2024-01-26T16:00:00Z',
          time: '16:00',
          duration: 60,
          status: 'upcoming',
          priority: 'medium',
          description: 'Join us for a live Q&A session about async/await patterns.',
          location: 'Zoom Meeting',
          instructor: 'Mike Chen'
        },
        {
          id: '4',
          title: 'Component Architecture Assignment',
          type: 'assignment',
          courseName: 'React Development Fundamentals',
          date: '2024-01-20T23:59:00Z',
          status: 'completed',
          priority: 'medium',
          description: 'Design and implement a component hierarchy for a blog application.',
          instructor: 'Sarah Johnson'
        }
      ];

      setEvents(mockEvents);
      setLoading(false);
    };

    loadEvents();
  }, []);

  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const getEventsForWeek = (startDate: Date) => {
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate >= startDate && eventDate <= endDate;
    });
  };

  const getEventsForMonth = (date: Date) => {
    const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
    const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate >= startDate && eventDate <= endDate;
    });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'assignment': return 'bg-blue-100 text-blue-800';
      case 'quiz': return 'bg-purple-100 text-purple-800';
      case 'live-session': return 'bg-green-100 text-green-800';
      case 'deadline': return 'bg-red-100 text-red-800';
      case 'reminder': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-4 border-red-500';
      case 'medium': return 'border-l-4 border-yellow-500';
      case 'low': return 'border-l-4 border-green-500';
      default: return 'border-l-4 border-gray-300';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getWeekDays = () => {
    const startDate = new Date(currentDate);
    startDate.setDate(currentDate.getDate() - currentDate.getDay());
    
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      weekDays.push(day);
    }
    
    return weekDays;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading calendar...</p>
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Learning Calendar</h1>
              <p className="text-gray-600">Track your assignments, quizzes, and live sessions</p>
            </div>
            <div className="flex gap-2">
              {(['month', 'week', 'day'] as const).map((viewType) => (
                <button
                  key={viewType}
                  onClick={() => setView(viewType)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    view === viewType
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {viewType.charAt(0).toUpperCase() + viewType.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Calendar Navigation */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  const newDate = new Date(currentDate);
                  if (view === 'month') {
                    newDate.setMonth(currentDate.getMonth() - 1);
                  } else {
                    newDate.setDate(currentDate.getDate() - 7);
                  }
                  setCurrentDate(newDate);
                }}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <h2 className="text-xl font-semibold text-gray-900">
                {currentDate.toLocaleDateString('en-US', { 
                  month: 'long', 
                  year: 'numeric',
                  ...(view === 'week' && { day: 'numeric' })
                })}
              </h2>
              
              <button
                onClick={() => {
                  const newDate = new Date(currentDate);
                  if (view === 'month') {
                    newDate.setMonth(currentDate.getMonth() + 1);
                  } else {
                    newDate.setDate(currentDate.getDate() + 7);
                  }
                  setCurrentDate(newDate);
                }}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            <button
              onClick={() => setCurrentDate(new Date())}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Today
            </button>
          </div>
        </div>

        {/* Calendar View */}
        {view === 'month' && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {/* Weekday Headers */}
            <div className="grid grid-cols-7 bg-gray-50">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="p-4 text-center text-sm font-medium text-gray-500">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Calendar Grid */}
            <div className="grid grid-cols-7">
              {getDaysInMonth(currentDate).map((date, index) => (
                <div
                  key={index}
                  className={`min-h-32 border border-gray-200 p-2 ${
                    date && date.toDateString() === new Date().toDateString()
                      ? 'bg-blue-50'
                      : ''
                  }`}
                >
                  {date && (
                    <>
                      <div className="text-sm font-medium text-gray-900 mb-1">
                        {date.getDate()}
                      </div>
                      <div className="space-y-1">
                        {getEventsForDate(date).slice(0, 3).map(event => (
                          <div
                            key={event.id}
                            className={`text-xs p-1 rounded truncate cursor-pointer ${getTypeColor(event.type)}`}
                            onClick={() => setSelectedDate(date)}
                          >
                            {event.title}
                          </div>
                        ))}
                        {getEventsForDate(date).length > 3 && (
                          <div className="text-xs text-gray-500">
                            +{getEventsForDate(date).length - 3} more
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {view === 'week' && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {/* Weekday Headers */}
            <div className="grid grid-cols-8 bg-gray-50">
              <div className="p-4"></div>
              {getWeekDays().map(day => (
                <div key={day.toISOString()} className="p-4 text-center">
                  <div className="text-sm font-medium text-gray-900">
                    {day.toLocaleDateString('en-US', { weekday: 'short' })}
                  </div>
                  <div className="text-sm text-gray-500">
                    {day.getDate()}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Time Slots */}
            <div className="grid grid-cols-8">
              <div className="border-r border-gray-200">
                {Array.from({ length: 24 }, (_, i) => (
                  <div key={i} className="h-16 border-b border-gray-100 text-xs text-gray-500 p-1">
                    {i === 0 ? '12 AM' : i < 12 ? `${i} AM` : i === 12 ? '12 PM' : `${i - 12} PM`}
                  </div>
                ))}
              </div>
              
              {getWeekDays().map(day => (
                <div key={day.toISOString()} className="border-r border-gray-200 relative">
                  {Array.from({ length: 24 }, (_, i) => (
                    <div key={i} className="h-16 border-b border-gray-100"></div>
                  ))}
                  
                  {/* Events */}
                  {getEventsForDate(day).map(event => {
                    const eventDate = new Date(event.date);
                    const hour = eventDate.getHours();
                    const minute = eventDate.getMinutes();
                    const top = (hour + minute / 60) * 64; // 64px per hour
                    
                    return (
                      <div
                        key={event.id}
                        className={`absolute left-1 right-1 p-1 text-xs rounded cursor-pointer ${getTypeColor(event.type)}`}
                        style={{ top: `${top}px`, height: '32px' }}
                        onClick={() => setSelectedDate(day)}
                      >
                        {event.title}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upcoming Events Sidebar */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Events</h2>
              <div className="space-y-4">
                {events
                  .filter(event => new Date(event.date) > new Date())
                  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                  .slice(0, 5)
                  .map(event => (
                    <div
                      key={event.id}
                      className={`p-4 rounded-lg border ${getPriorityColor(event.priority)}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(event.type)}`}>
                              {event.type.replace('-', ' ')}
                            </span>
                            <span className="text-sm text-gray-500">{event.courseName}</span>
                          </div>
                          <h3 className="font-medium text-gray-900 mb-1">{event.title}</h3>
                          {event.description && (
                            <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                          )}
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>{formatDate(event.date)}</span>
                            {event.instructor && <span>• {event.instructor}</span>}
                            {event.location && <span>• {event.location}</span>}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-900">
                            {formatTime(event.date)}
                          </div>
                          {event.duration && (
                            <div className="text-xs text-gray-500">{event.duration}min</div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">This Week</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Assignments</span>
                  <span className="font-medium text-gray-900">
                    {events.filter(e => e.type === 'assignment' && new Date(e.date) > new Date() && new Date(e.date) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Quizzes</span>
                  <span className="font-medium text-gray-900">
                    {events.filter(e => e.type === 'quiz' && new Date(e.date) > new Date() && new Date(e.date) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Live Sessions</span>
                  <span className="font-medium text-gray-900">
                    {events.filter(e => e.type === 'live-session' && new Date(e.date) > new Date() && new Date(e.date) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)).length}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Types</h3>
              <div className="space-y-2">
                {Object.entries(
                  events.reduce((acc, event) => {
                    acc[event.type] = (acc[event.type] || 0) + 1;
                    return acc;
                  }, {} as Record<string, number>)
                ).map(([type, count]) => (
                  <div key={type} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${getTypeColor(type).replace('bg-', '').replace(' text-', ' bg-')}`}></div>
                      <span className="text-sm text-gray-600 capitalize">{type.replace('-', ' ')}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
