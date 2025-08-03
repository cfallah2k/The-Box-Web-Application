import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'student' | 'instructor' | 'admin' | 'enterprise';
  subscription?: {
    plan: 'free' | 'pro' | 'enterprise';
    status: 'active' | 'cancelled' | 'expired';
    expiresAt?: string;
  };
  profile?: {
    bio?: string;
    location?: string;
    website?: string;
    social?: {
      twitter?: string;
      linkedin?: string;
      github?: string;
    };
  };
  stats?: {
    coursesEnrolled: number;
    coursesCompleted: number;
    certificatesEarned: number;
    totalHoursLearned: number;
    currentStreak: number;
    totalPoints: number;
  };
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: SignupData) => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  refreshToken: () => Promise<void>;
  hasRole: (role: User['role']) => boolean;
  hasPermission: (permission: string) => boolean;
}

interface SignupData {
  name: string;
  email: string;
  password: string;
  role: User['role'];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Role-based permissions
  const permissions = {
    student: [
      'view_courses',
      'enroll_courses',
      'access_ai_tutor',
      'view_community',
      'view_blog',
      'manage_profile',
    ],
    instructor: [
      'view_courses',
      'create_courses',
      'edit_courses',
      'manage_students',
      'view_analytics',
      'access_ai_tutor',
      'view_community',
      'view_blog',
      'manage_profile',
    ],
    admin: [
      'view_courses',
      'create_courses',
      'edit_courses',
      'delete_courses',
      'manage_users',
      'manage_instructors',
      'view_all_analytics',
      'manage_content',
      'manage_system',
      'access_ai_tutor',
      'view_community',
      'view_blog',
      'manage_profile',
    ],
    enterprise: [
      'view_courses',
      'enroll_courses',
      'access_ai_tutor',
      'view_community',
      'view_blog',
      'manage_profile',
      'manage_team',
      'view_team_analytics',
      'custom_branding',
    ],
  };

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data based on email
      let mockUser: User;
      
      if (email.includes('admin')) {
        mockUser = {
          id: '1',
          name: 'Admin User',
          email,
          role: 'admin',
          subscription: { plan: 'enterprise', status: 'active' },
          stats: {
            coursesEnrolled: 0,
            coursesCompleted: 0,
            certificatesEarned: 0,
            totalHoursLearned: 0,
            currentStreak: 0,
            totalPoints: 0,
          },
        };
      } else if (email.includes('instructor')) {
        mockUser = {
          id: '2',
          name: 'Dr. Sarah Johnson',
          email,
          role: 'instructor',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
          subscription: { plan: 'pro', status: 'active' },
          profile: {
            bio: 'Senior Software Engineer with 8+ years of experience in React and modern web development.',
            location: 'San Francisco, CA',
            website: 'https://sarahjohnson.dev',
          },
          stats: {
            coursesEnrolled: 0,
            coursesCompleted: 0,
            certificatesEarned: 0,
            totalHoursLearned: 0,
            currentStreak: 0,
            totalPoints: 0,
          },
        };
      } else if (email.includes('enterprise')) {
        mockUser = {
          id: '3',
          name: 'Enterprise Manager',
          email,
          role: 'enterprise',
          subscription: { plan: 'enterprise', status: 'active' },
          stats: {
            coursesEnrolled: 0,
            coursesCompleted: 0,
            certificatesEarned: 0,
            totalHoursLearned: 0,
            currentStreak: 0,
            totalPoints: 0,
          },
        };
      } else {
        mockUser = {
          id: '4',
          name: 'John Doe',
          email,
          role: 'student',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
          subscription: { plan: 'pro', status: 'active' },
          stats: {
            coursesEnrolled: 12,
            coursesCompleted: 5,
            certificatesEarned: 3,
            totalHoursLearned: 48,
            currentStreak: 12,
            totalPoints: 2840,
          },
        };
      }

      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      throw new Error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData: SignupData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: userData.name,
        email: userData.email,
        role: userData.role,
        subscription: { plan: 'free', status: 'active' },
        stats: {
          coursesEnrolled: 0,
          coursesCompleted: 0,
          certificatesEarned: 0,
          totalHoursLearned: 0,
          currentStreak: 0,
          totalPoints: 0,
        },
      };

      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
    } catch (error) {
      throw new Error('Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const refreshToken = async () => {
    // Simulate token refresh
    await new Promise(resolve => setTimeout(resolve, 500));
  };

  const hasRole = (role: User['role']): boolean => {
    return user?.role === role;
  };

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    return permissions[user.role]?.includes(permission) || false;
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout,
    updateUser,
    refreshToken,
    hasRole,
    hasPermission,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 