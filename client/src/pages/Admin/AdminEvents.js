import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Plus, Search, Filter, Edit, Trash2, Eye } from 'lucide-react';
import { format } from 'date-fns';
import { api } from '../../utils/api';
import { EVENT_TYPES } from '../../utils/constants';
import LoadingSpinner from '../../components/UI/LoadingSpinner';

const AdminEvents = () => {
  const [filters, setFilters] = useState({
    status: '',
    search: ''
  });

  const { data, isLoading, refetch } = useQuery(
    ['admin-events', filters],
    () => {
      const params = new URLSearchParams();
      if (filters.status) params.append('status', filters.status);
      return api.get(`/events?${params.toString()}&limit=50`).then(res => res.data);
    }
  );

  const filteredEvents = data?.events?.filter(event =>
    event.title.toLowerCase().includes(filters.search.toLowerCase())
  ) || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">Events Management</h1>
          <p className="text-secondary-600">Manage club events, workshops, and seminars</p>
        </div>
        <button className="btn-primary flex items-center">
          <Plus size={18} className="mr-2" />
          Add Event
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" />
            <input
              type="text"
              placeholder="Search events..."
              className="input-field pl-10"
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
            />
          </div>
          <select
            className="input-field"
            value={filters.status}
            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
          >
            <option value="">All Status</option>
            <option value="upcoming">Upcoming</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <button className="btn-outline flex items-center">
            <Filter size={18} className="mr-2" />
            More Filters
          </button>
        </div>
      </div>

      {/* Events Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary-50 border-b border-secondary-200">
                <tr>
                  <th className="text-left py-3 px-6 font-medium text-secondary-900">Event</th>
                  <th className="text-left py-3 px-6 font-medium text-secondary-900">Date</th>
                  <th className="text-left py-3 px-6 font-medium text-secondary-900">Status</th>
                  <th className="text-left py-3 px-6 font-medium text-secondary-900">Type</th>
                  <th className="text-left py-3 px-6 font-medium text-secondary-900">Views</th>
                  <th className="text-left py-3 px-6 font-medium text-secondary-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary-200">
                {filteredEvents.map((event) => {
                  const eventType = EVENT_TYPES.find(type => type.id === event.type);
                  return (
                    <tr key={event._id} className="hover:bg-secondary-50">
                      <td className="py-4 px-6">
                        <div>
                          <h3 className="font-medium text-secondary-900">{event.title}</h3>
                          <p className="text-sm text-secondary-600">{event.venue}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-secondary-700">
                        {format(new Date(event.date), 'MMM dd, yyyy')}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          event.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                          event.status === 'ongoing' ? 'bg-green-100 text-green-800' :
                          event.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {event.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${eventType?.color || 'bg-gray-100 text-gray-800'}`}>
                          {eventType?.name || event.type}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-secondary-700">
                        {event.analytics?.views || 0}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <button className="p-2 text-secondary-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg">
                            <Eye size={16} />
                          </button>
                          <button className="p-2 text-secondary-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                            <Edit size={16} />
                          </button>
                          <button className="p-2 text-secondary-600 hover:text-red-600 hover:bg-red-50 rounded-lg">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {filteredEvents.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-secondary-600">No events found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminEvents;