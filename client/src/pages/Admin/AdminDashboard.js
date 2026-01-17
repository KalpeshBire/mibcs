import React from 'react';
import { useQuery } from 'react-query';
import { 
  Calendar, 
  Trophy, 
  FolderOpen, 
  Users, 
  Eye, 
  MousePointer, 
  MessageSquare,
  TrendingUp
} from 'lucide-react';
import { api } from '../../utils/api';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import { format } from 'date-fns';

const AdminDashboard = () => {
  const { data: analytics, isLoading } = useQuery(
    'dashboard-analytics',
    () => api.get('/analytics/dashboard').then(res => res.data)
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const stats = [
    {
      name: 'Total Events',
      value: analytics?.summary?.totalEvents || 0,
      icon: Calendar,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      name: 'Achievements',
      value: analytics?.summary?.totalAchievements || 0,
      icon: Trophy,
      color: 'bg-yellow-500',
      change: '+8%'
    },
    {
      name: 'Active Projects',
      value: analytics?.summary?.activeProjects || 0,
      icon: FolderOpen,
      color: 'bg-green-500',
      change: '+15%'
    },
    {
      name: 'Total Members',
      value: analytics?.summary?.totalMembers || 0,
      icon: Users,
      color: 'bg-purple-500',
      change: '+5%'
    },
    {
      name: 'Page Views',
      value: analytics?.summary?.totalViews || 0,
      icon: Eye,
      color: 'bg-indigo-500',
      change: '+23%'
    },
    {
      name: 'Registration Clicks',
      value: analytics?.summary?.totalRegistrationClicks || 0,
      icon: MousePointer,
      color: 'bg-pink-500',
      change: '+18%'
    },
    {
      name: 'Pending Contacts',
      value: analytics?.summary?.pendingContacts || 0,
      icon: MessageSquare,
      color: 'bg-red-500',
      change: analytics?.summary?.pendingContacts > 0 ? 'New' : 'None'
    },
    {
      name: 'Upcoming Events',
      value: analytics?.summary?.upcomingEvents || 0,
      icon: TrendingUp,
      color: 'bg-cyan-500',
      change: 'This month'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold text-secondary-900 mb-2">
          Welcome to MIBCS Admin Dashboard
        </h1>
        <p className="text-secondary-600">
          Manage your club's content, track analytics, and stay updated with the latest activities.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-secondary-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-secondary-900">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon size={24} className="text-white" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-sm text-green-600 font-medium">{stat.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Events */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-secondary-900 mb-4">Recent Events</h2>
          <div className="space-y-4">
            {analytics?.recentActivities?.events?.map((event) => (
              <div key={event._id} className="flex items-center space-x-3 p-3 bg-secondary-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium text-secondary-900">{event.title}</p>
                  <p className="text-sm text-secondary-600">
                    {format(new Date(event.date), 'MMM dd, yyyy')} • {event.status}
                  </p>
                </div>
              </div>
            )) || (
              <p className="text-secondary-500 text-center py-4">No recent events</p>
            )}
          </div>
        </div>

        {/* Recent Achievements */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-secondary-900 mb-4">Recent Achievements</h2>
          <div className="space-y-4">
            {analytics?.recentActivities?.achievements?.map((achievement) => (
              <div key={achievement._id} className="flex items-center space-x-3 p-3 bg-secondary-50 rounded-lg">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium text-secondary-900">{achievement.title}</p>
                  <p className="text-sm text-secondary-600">
                    {achievement.category} • {achievement.year}
                  </p>
                </div>
              </div>
            )) || (
              <p className="text-secondary-500 text-center py-4">No recent achievements</p>
            )}
          </div>
        </div>
      </div>

      {/* Recent Contacts */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-secondary-900 mb-4">Recent Contact Messages</h2>
        <div className="space-y-4">
          {analytics?.recentActivities?.contacts?.map((contact) => (
            <div key={contact._id} className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <p className="font-medium text-secondary-900">{contact.name}</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    contact.status === 'new' 
                      ? 'bg-red-100 text-red-800' 
                      : contact.status === 'in-progress'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {contact.status}
                  </span>
                </div>
                <p className="text-sm text-secondary-600 mt-1">{contact.subject}</p>
                <p className="text-xs text-secondary-500 mt-1">
                  {format(new Date(contact.createdAt), 'MMM dd, yyyy HH:mm')}
                </p>
              </div>
              <div className="text-sm text-secondary-600">
                {contact.type}
              </div>
            </div>
          )) || (
            <p className="text-secondary-500 text-center py-4">No recent contacts</p>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-secondary-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border border-secondary-200 rounded-lg hover:bg-secondary-50 transition-colors duration-200 text-left">
            <Calendar size={24} className="text-blue-500 mb-2" />
            <p className="font-medium text-secondary-900">Create Event</p>
            <p className="text-sm text-secondary-600">Add a new event or workshop</p>
          </button>
          <button className="p-4 border border-secondary-200 rounded-lg hover:bg-secondary-50 transition-colors duration-200 text-left">
            <Trophy size={24} className="text-yellow-500 mb-2" />
            <p className="font-medium text-secondary-900">Add Achievement</p>
            <p className="text-sm text-secondary-600">Record a new accomplishment</p>
          </button>
          <button className="p-4 border border-secondary-200 rounded-lg hover:bg-secondary-50 transition-colors duration-200 text-left">
            <FolderOpen size={24} className="text-green-500 mb-2" />
            <p className="font-medium text-secondary-900">New Project</p>
            <p className="text-sm text-secondary-600">Start tracking a new project</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;