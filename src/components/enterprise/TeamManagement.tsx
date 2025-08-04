import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  UserGroupIcon,
  CogIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  AcademicCapIcon,
  ChartBarIcon,
  ClockIcon,
  StarIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  ShieldCheckIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'instructor' | 'student' | 'manager';
  avatar: string;
  status: 'active' | 'inactive' | 'pending';
  joinDate: Date;
  lastActive: Date;
  coursesEnrolled: number;
  progress: number;
  permissions: string[];
}

interface Team {
  id: string;
  name: string;
  description: string;
  members: TeamMember[];
  totalMembers: number;
  activeMembers: number;
  createdAt: Date;
  settings: {
    allowInvites: boolean;
    requireApproval: boolean;
    maxMembers: number;
  };
}

const TeamManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'members' | 'teams' | 'permissions'>('members');
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [showInviteModal, setShowInviteModal] = useState(false);

  const teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      email: 'sarah.chen@company.com',
      role: 'admin',
      avatar: 'https://i.pravatar.cc/150?u=sarah',
      status: 'active',
      joinDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      lastActive: new Date(),
      coursesEnrolled: 8,
      progress: 85,
      permissions: ['manage_team', 'create_courses', 'view_analytics', 'invite_members'],
    },
    {
      id: '2',
      name: 'Mike Johnson',
      email: 'mike.johnson@company.com',
      role: 'instructor',
      avatar: 'https://i.pravatar.cc/150?u=mike',
      status: 'active',
      joinDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
      lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000),
      coursesEnrolled: 12,
      progress: 92,
      permissions: ['create_courses', 'view_analytics'],
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@company.com',
      role: 'student',
      avatar: 'https://i.pravatar.cc/150?u=emily',
      status: 'active',
      joinDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      lastActive: new Date(Date.now() - 1 * 60 * 60 * 1000),
      coursesEnrolled: 5,
      progress: 67,
      permissions: ['view_courses'],
    },
    {
      id: '4',
      name: 'David Kim',
      email: 'david.kim@company.com',
      role: 'manager',
      avatar: 'https://i.pravatar.cc/150?u=david',
      status: 'pending',
      joinDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      lastActive: new Date(Date.now() - 24 * 60 * 60 * 1000),
      coursesEnrolled: 3,
      progress: 45,
      permissions: ['view_analytics', 'manage_students'],
    },
  ];

  const teams: Team[] = [
    {
      id: '1',
      name: 'Engineering Team',
      description: 'Software development and engineering team',
      members: teamMembers,
      totalMembers: 15,
      activeMembers: 12,
      createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
      settings: {
        allowInvites: true,
        requireApproval: true,
        maxMembers: 25,
      },
    },
    {
      id: '2',
      name: 'Design Team',
      description: 'UI/UX and product design team',
      members: teamMembers.slice(0, 3),
      totalMembers: 8,
      activeMembers: 7,
      createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
      settings: {
        allowInvites: true,
        requireApproval: false,
        maxMembers: 15,
      },
    },
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      case 'instructor':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
      case 'student':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'manager':
        return 'text-purple-600 bg-purple-100 dark:bg-purple-900/20';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'inactive':
        return 'text-gray-600 bg-gray-100 dark:bg-gray-700';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-700';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <ShieldCheckIcon className="w-5 h-5" />;
      case 'instructor':
        return <AcademicCapIcon className="w-5 h-5" />;
      case 'student':
        return <UserIcon className="w-5 h-5" />;
      case 'manager':
        return <CogIcon className="w-5 h-5" />;
      default:
        return <UserIcon className="w-5 h-5" />;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
            <UserGroupIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Team Management</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Manage team members and permissions</p>
          </div>
        </div>
        <button
          onClick={() => setShowInviteModal(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <PlusIcon className="w-4 h-4" />
          <span>Invite Member</span>
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
        {[
          { id: 'members', label: 'Members', icon: UserIcon },
          { id: 'teams', label: 'Teams', icon: UserGroupIcon },
          { id: 'permissions', label: 'Permissions', icon: ShieldCheckIcon },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="space-y-6">
        {activeTab === 'members' && (
          <div className="space-y-4">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-semibold text-gray-900 dark:text-white">{member.name}</h4>
                        <div className={`px-2 py-1 rounded-full text-xs ${getRoleColor(member.role)}`}>
                          {member.role}
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs ${getStatusColor(member.status)}`}>
                          {member.status}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{member.email}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <AcademicCapIcon className="w-4 h-4" />
                          <span>{member.coursesEnrolled} courses</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <ChartBarIcon className="w-4 h-4" />
                          <span>{member.progress}% progress</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <ClockIcon className="w-4 h-4" />
                          <span>Last active {member.lastActive.toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setSelectedMember(member)}
                      className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                      <EyeIcon className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                      <PencilIcon className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-red-500 hover:text-red-700">
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'teams' && (
          <div className="space-y-4">
            {teams.map((team, index) => (
              <motion.div
                key={team.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white">{team.name}</h4>
                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs rounded-full">
                        {team.totalMembers} members
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{team.description}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <div className="flex items-center space-x-1">
                        <UserGroupIcon className="w-4 h-4" />
                        <span>{team.activeMembers} active</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <ClockIcon className="w-4 h-4" />
                        <span>Created {team.createdAt.toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {team.settings.allowInvites && (
                        <span className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 text-xs rounded-full">
                          Invites Allowed
                        </span>
                      )}
                      {team.settings.requireApproval && (
                        <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 text-xs rounded-full">
                          Approval Required
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button className="btn-secondary text-sm">
                      Manage
                    </button>
                    <button className="btn-primary text-sm">
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'permissions' && (
          <div className="space-y-6">
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Role Permissions</h4>
              <div className="space-y-4">
                {[
                  { role: 'Admin', permissions: ['Full access', 'Manage team', 'Create courses', 'View analytics', 'Invite members'] },
                  { role: 'Instructor', permissions: ['Create courses', 'View analytics', 'Manage students'] },
                  { role: 'Manager', permissions: ['View analytics', 'Manage students', 'View reports'] },
                  { role: 'Student', permissions: ['View courses', 'Take assessments', 'View progress'] },
                ].map((role, index) => (
                  <div key={role.role} className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-gray-900 dark:text-white">{role.role}</h5>
                      <button className="text-sm text-blue-600 hover:text-blue-700">Edit</button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {role.permissions.map((permission) => (
                        <span
                          key={permission}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full"
                        >
                          {permission}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Member Details Modal */}
      {/* AnimatePresence is not imported, so this block will be commented out or removed if not needed */}
      {/* <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Member Details</h2>
                  <button
                    onClick={() => setSelectedMember(null)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <ExclamationTriangleIcon className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="flex items-center space-x-4">
                  <img
                    src={selectedMember.avatar}
                    alt={selectedMember.name}
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{selectedMember.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{selectedMember.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Role & Status</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Role:</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${getRoleColor(selectedMember.role)}`}>
                          {selectedMember.role}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Status:</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(selectedMember.status)}`}>
                          {selectedMember.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Activity</h4>
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <div>Joined: {selectedMember.joinDate.toLocaleDateString()}</div>
                      <div>Last active: {selectedMember.lastActive.toLocaleDateString()}</div>
                      <div>Courses: {selectedMember.coursesEnrolled}</div>
                      <div>Progress: {selectedMember.progress}%</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Permissions</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedMember.permissions.map((permission) => (
                      <span
                        key={permission}
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs rounded-full"
                      >
                        {permission}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button className="btn-secondary flex-1">Edit Permissions</button>
                  <button className="btn-primary flex-1">Send Message</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence> */}
    </div>
  );
};

export default TeamManagement; 