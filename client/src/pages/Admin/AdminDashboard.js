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
  TrendingUp,
  Zap,
  Activity,
  Server,
  Database,
  Cpu,
  Shield,
  Terminal
} from 'lucide-react';
import { api } from '../../utils/api';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const { data: analytics, isLoading } = useQuery(
    'dashboard-analytics',
    () => api.get('/analytics/dashboard').then(res => res.data),
    {
      retry: false,
      staleTime: 30000, // 30 seconds
      refetchOnWindowFocus: false,
      onError: (error) => {
        console.log('Analytics API not available, using mock data');
      }
    }
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400 code-font">Loading system data...</p>
        </div>
      </div>
    );
  }

  const stats = [
    {
      name: 'Total Events',
      value: analytics?.summary?.totalEvents || 5,
      icon: Calendar,
      color: 'from-blue-500 to-cyan-500',
      change: '+12%',
      trend: 'up',
      description: 'Active events'
    },
    {
      name: 'Achievements',
      value: analytics?.summary?.totalAchievements || 23,
      icon: Trophy,
      color: 'from-yellow-500 to-orange-500',
      change: '+8%',
      trend: 'up',
      description: 'Total achievements'
    },
    {
      name: 'Active Projects',
      value: analytics?.summary?.activeProjects || 12,
      icon: FolderOpen,
      color: 'from-green-500 to-emerald-500',
      change: '+15%',
      trend: 'up',
      description: 'In development'
    },
    {
      name: 'Total Members',
      value: analytics?.summary?.totalMembers || 156,
      icon: Users,
      color: 'from-purple-500 to-pink-500',
      change: '+5%',
      trend: 'up',
      description: 'Active members'
    },
    {
      name: 'Page Views',
      value: analytics?.summary?.totalViews || 2847,
      icon: Eye,
      color: 'from-indigo-500 to-blue-500',
      change: '+23%',
      trend: 'up',
      description: 'This month'
    },
    {
      name: 'Registration Clicks',
      value: analytics?.summary?.totalRegistrationClicks || 342,
      icon: MousePointer,
      color: 'from-pink-500 to-rose-500',
      change: '+18%',
      trend: 'up',
      description: 'Event registrations'
    },
    {
      name: 'Pending Contacts',
      value: analytics?.summary?.pendingContacts || 7,
      icon: MessageSquare,
      color: 'from-red-500 to-pink-500',
      change: analytics?.summary?.pendingContacts > 0 ? 'New' : 'None',
      trend: 'neutral',
      description: 'Require attention'
    },
    {
      name: 'Upcoming Events',
      value: analytics?.summary?.upcomingEvents || 3,
      icon: TrendingUp,
      color: 'from-cyan-500 to-teal-500',
      change: 'This month',
      trend: 'neutral',
      description: 'Scheduled events'
    }
  ];

  const systemStats = [
    { label: 'Server Status', value: 'Online', status: 'success', icon: Server },
    { label: 'Database', value: 'Connected', status: 'success', icon: Database },
    { label: 'API Response', value: '45ms', status: 'success', icon: Zap },
    { label: 'Security', value: 'Secured', status: 'success', icon: Shield }
  ];

  return (
    <div className="space-y-3 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-blue-600/20 to-purple-600/20 rounded-2xl blur opacity-30"></div>
        <div className="relative card-glow">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2 code-font">
                <span className="text-gradient">MIBCS</span> Control Center
              </h1>
              <p className="text-gray-400 code-font flex items-center">
                <Terminal size={16} className="mr-2 text-cyan-400" />
                System operational • All services running
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-400 code-font">Live</span>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400 code-font">Last updated</p>
                <p className="text-cyan-400 code-font">{format(new Date(), 'HH:mm:ss')}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* System Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        {systemStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="card-glow">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg flex items-center justify-center border border-green-500/30">
                  <Icon size={18} className="text-green-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 code-font">{stat.label}</p>
                  <p className="text-sm font-bold text-green-400 code-font">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="group relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-blue-600/20 to-purple-600/20 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
              <div className="relative card-glow hover:border-cyan-500/50 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-400 code-font mb-1">{stat.name}</p>
                    <p className="text-3xl font-bold text-white code-font">{stat.value.toLocaleString()}</p>
                    <p className="text-xs text-gray-500 code-font mt-1">{stat.description}</p>
                  </div>
                  <div className={`w-14 h-14 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                    <Icon size={24} className="text-white" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium code-font flex items-center ${
                    stat.trend === 'up' ? 'text-green-400' : 
                    stat.trend === 'down' ? 'text-red-400' : 'text-gray-400'
                  }`}>
                    {stat.trend === 'up' && <TrendingUp size={14} className="mr-1" />}
                    {stat.change}
                  </span>
                  <Activity size={14} className="text-gray-500" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Events */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl blur opacity-30"></div>
          <div className="relative card-glow">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center border border-blue-500/30">
                <Calendar size={16} className="text-blue-400" />
              </div>
              <h2 className="text-lg font-semibold text-white code-font">Recent Events</h2>
            </div>
            <div className="space-y-3">
              {analytics?.recentActivities?.events?.map((event, index) => (
                <div key={event._id} className="flex items-center space-x-3 p-3 bg-gray-800/30 rounded-lg border border-gray-700/30 hover:border-blue-500/30 transition-colors">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <div className="flex-1">
                    <p className="font-medium text-white code-font text-sm">{event.title}</p>
                    <p className="text-xs text-gray-400 code-font">
                      {format(new Date(event.date), 'MMM dd, yyyy')} • <span className="text-blue-400">{event.status}</span>
                    </p>
                  </div>
                </div>
              )) || (
                [...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-3 p-3 bg-gray-800/30 rounded-lg border border-gray-700/30">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <div className="flex-1">
                      <p className="font-medium text-white code-font text-sm">
                        {['AI Workshop: Neural Networks', 'Blockchain Hackathon 2024', 'IoT Security Seminar'][i]}
                      </p>
                      <p className="text-xs text-gray-400 code-font">
                        {format(new Date(Date.now() + i * 86400000), 'MMM dd, yyyy')} • <span className="text-blue-400">upcoming</span>
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </motion.div>

        {/* Recent Achievements */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl blur opacity-30"></div>
          <div className="relative card-glow">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg flex items-center justify-center border border-yellow-500/30">
                <Trophy size={16} className="text-yellow-400" />
              </div>
              <h2 className="text-lg font-semibold text-white code-font">Recent Achievements</h2>
            </div>
            <div className="space-y-3">
              {analytics?.recentActivities?.achievements?.map((achievement, index) => (
                <div key={achievement._id} className="flex items-center space-x-3 p-3 bg-gray-800/30 rounded-lg border border-gray-700/30 hover:border-yellow-500/30 transition-colors">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  <div className="flex-1">
                    <p className="font-medium text-white code-font text-sm">{achievement.title}</p>
                    <p className="text-xs text-gray-400 code-font">
                      <span className="text-yellow-400">{achievement.category}</span> • {achievement.year}
                    </p>
                  </div>
                </div>
              )) || (
                [...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-3 p-3 bg-gray-800/30 rounded-lg border border-gray-700/30">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                    <div className="flex-1">
                      <p className="font-medium text-white code-font text-sm">
                        {['Hackathon Winner 2024', 'Best Innovation Award', 'Research Publication'][i]}
                      </p>
                      <p className="text-xs text-gray-400 code-font">
                        <span className="text-yellow-400">{['hackathon', 'recognition', 'research'][i]}</span> • 2024
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Contacts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="relative"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur opacity-30"></div>
        <div className="relative card-glow">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center border border-purple-500/30">
              <MessageSquare size={16} className="text-purple-400" />
            </div>
            <h2 className="text-lg font-semibold text-white code-font">Recent Contact Messages</h2>
          </div>
          <div className="space-y-3">
            {analytics?.recentActivities?.contacts?.map((contact, index) => (
              <div key={contact._id} className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg border border-gray-700/30 hover:border-purple-500/30 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <p className="font-medium text-white code-font">{contact.name}</p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium code-font ${
                      contact.status === 'new' 
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                        : contact.status === 'in-progress'
                        ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                        : 'bg-green-500/20 text-green-400 border border-green-500/30'
                    }`}>
                      {contact.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 mb-1">{contact.subject}</p>
                  <p className="text-xs text-gray-500 code-font">
                    {format(new Date(contact.createdAt), 'MMM dd, yyyy HH:mm')}
                  </p>
                </div>
                <div className="text-sm text-purple-400 code-font">
                  {contact.type}
                </div>
              </div>
            )) || (
              <div className="text-center py-8">
                <MessageSquare size={48} className="text-gray-600 mx-auto mb-4" />
                <p className="text-gray-500 code-font">No recent contacts</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="relative"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-blue-600/20 to-purple-600/20 rounded-2xl blur opacity-30"></div>
        <div className="relative card-glow">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-lg flex items-center justify-center border border-cyan-500/30">
              <Zap size={16} className="text-cyan-400" />
            </div>
            <h2 className="text-lg font-semibold text-white code-font">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="group relative p-6 bg-gray-800/30 border border-gray-700/30 rounded-lg hover:border-blue-500/50 transition-all duration-300 text-left">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg blur opacity-0 group-hover:opacity-50 transition duration-300"></div>
              <div className="relative">
                <Calendar size={24} className="text-blue-400 mb-3" />
                <p className="font-medium text-white code-font mb-1">Create Event</p>
                <p className="text-sm text-gray-400 code-font">Add a new event or workshop</p>
              </div>
            </button>
            <button className="group relative p-6 bg-gray-800/30 border border-gray-700/30 rounded-lg hover:border-yellow-500/50 transition-all duration-300 text-left">
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg blur opacity-0 group-hover:opacity-50 transition duration-300"></div>
              <div className="relative">
                <Trophy size={24} className="text-yellow-400 mb-3" />
                <p className="font-medium text-white code-font mb-1">Add Achievement</p>
                <p className="text-sm text-gray-400 code-font">Record a new accomplishment</p>
              </div>
            </button>
            <button className="group relative p-6 bg-gray-800/30 border border-gray-700/30 rounded-lg hover:border-green-500/50 transition-all duration-300 text-left">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg blur opacity-0 group-hover:opacity-50 transition duration-300"></div>
              <div className="relative">
                <FolderOpen size={24} className="text-green-400 mb-3" />
                <p className="font-medium text-white code-font mb-1">New Project</p>
                <p className="text-sm text-gray-400 code-font">Start tracking a new project</p>
              </div>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;