import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Plus, Search, Filter, Edit, Trash2, Eye, Star, Calendar, MapPin, Users, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'react-hot-toast';
import { api } from '../../utils/api';
import { EVENT_TYPES } from '../../utils/constants';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import EventForm from '../../components/Admin/EventForm';

const AdminEvents = () => {
  const [filters, setFilters] = useState({
    status: '',
    search: ''
  });
  const [showEventForm, setShowEventForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const queryClient = useQueryClient();

  const { data, isLoading, refetch } = useQuery(
    ['admin-events', filters],
    () => {
      const params = new URLSearchParams();
      if (filters.status) params.append('status', filters.status);
      return api.get(`/events?${params.toString()}&limit=50`).then(res => res.data);
    }
  );

  const deleteMutation = useMutation(
    (eventId) => api.delete(`/events/${eventId}`),
    {
      onSuccess: () => {
        toast.success('Event deleted successfully');
        queryClient.invalidateQueries('admin-events');
        setShowDeleteConfirm(null);
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Failed to delete event');
      }
    }
  );

  const filteredEvents = data?.events?.filter(event =>
    event.title.toLowerCase().includes(filters.search.toLowerCase())
  ) || [];

  const handleAddEvent = () => {
    setSelectedEvent(null);
    setShowEventForm(true);
  };

  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setShowEventForm(true);
  };

  const handleDeleteEvent = (event) => {
    setShowDeleteConfirm(event);
  };

  const confirmDelete = () => {
    if (showDeleteConfirm) {
      deleteMutation.mutate(showDeleteConfirm._id);
    }
  };

  const handleFormSuccess = () => {
    queryClient.invalidateQueries('admin-events');
  };

  const handleViewEvent = (event) => {
    // Open event in new tab (public view)
    window.open(`/events/${event._id}`, '_blank');
  };

  const handleRegisterClick = async (event) => {
    if (event.registrationLink) {
      try {
        // Track the registration click
        await api.post(`/events/${event._id}/register-click`);
        // Open registration link
        window.open(event.registrationLink, '_blank');
      } catch (error) {
        console.error('Failed to track registration click:', error);
        // Still open the link even if tracking fails
        window.open(event.registrationLink, '_blank');
      }
    } else {
      toast.error('No registration link available for this event');
    }
  };

  return (
    <div className="space-y-4 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center relative z-10">
        <div>
          <h1 className="text-3xl font-bold text-white code-font">
            Events <span className="text-gradient">Management</span>
          </h1>
          <p className="text-gray-400 code-font">Manage club events, workshops, and seminars</p>
        </div>
        <button 
          onClick={handleAddEvent}
          className="btn-primary flex items-center group"
        >
          <Plus size={18} className="mr-2 group-hover:rotate-90 transition-transform duration-200" />
          Add Event
        </button>
      </div>

      {/* Filters */}
      <div className="relative z-10">
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-blue-600/20 to-purple-600/20 rounded-2xl blur opacity-30"></div>
        <div className="relative card-glow">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search events..."
                className="input-field pl-10"
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              />
            </div>
            <select
              className="select-field"
              value={filters.status}
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
            >
              <option value="">All Status</option>
              <option value="upcoming">Upcoming</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <div className="flex items-center justify-between px-4 py-3 bg-gray-800/30 border border-gray-700/30 rounded-lg">
              <span className="text-sm text-gray-400 code-font">Total Events:</span>
              <span className="font-bold text-cyan-400 code-font">{filteredEvents.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 relative z-10">
        {isLoading ? (
          <div className="col-span-full flex justify-center py-12">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-400 code-font">Loading events...</p>
            </div>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-2xl blur opacity-30"></div>
              <div className="relative card-glow p-12">
                <Calendar size={64} className="mx-auto text-gray-600 mb-6" />
                <h3 className="text-xl font-bold text-white mb-2 code-font">No events found</h3>
                <p className="text-gray-400 mb-6 code-font">Create your first event to get started</p>
                <button 
                  onClick={handleAddEvent}
                  className="btn-primary group"
                >
                  <Plus size={18} className="mr-2 group-hover:rotate-90 transition-transform duration-200" />
                  Add Event
                </button>
              </div>
            </div>
          </div>
        ) : (
          filteredEvents.map((event, index) => {
            const eventType = EVENT_TYPES.find(type => type.id === event.type);
            const eventDate = new Date(event.date);
            const isUpcoming = eventDate > new Date();
            
            return (
              <div key={event._id} className="group relative">
                {/* Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-blue-600/20 to-purple-600/20 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
                
                <div className="relative card-glow hover:border-cyan-500/50 transition-all duration-300 overflow-hidden">
                  {/* Event Image */}
                  {event.images?.[0]?.url && (
                    <div className="relative h-48 bg-gray-800">
                      <img
                        src={event.images[0].url}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent"></div>
                      {event.featured && (
                        <div className="absolute top-3 right-3 bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold flex items-center">
                          <Star size={12} className="mr-1" />
                          FEATURED
                        </div>
                      )}
                    </div>
                  )}

                  <div className="p-6">
                    {/* Event Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-white text-lg mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors duration-300 code-font">
                          {event.title}
                        </h3>
                        <div className="flex items-center space-x-3 text-sm">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${eventType?.color || 'bg-gray-100 text-gray-800'}`}>
                            {eventType?.name || event.type}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            event.status === 'upcoming' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                            event.status === 'ongoing' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                            event.status === 'completed' ? 'bg-gray-500/20 text-gray-400 border border-gray-500/30' :
                            'bg-red-500/20 text-red-400 border border-red-500/30'
                          }`}>
                            {event.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Event Details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-400">
                        <Calendar size={14} className="mr-2 text-gray-500" />
                        <span className="code-font">{format(eventDate, 'MMM dd, yyyy')} at {event.time}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-400">
                        <MapPin size={14} className="mr-2 text-gray-500" />
                        <span className="truncate code-font">{event.venue}</span>
                      </div>
                      {event.maxParticipants && (
                        <div className="flex items-center text-sm text-gray-400">
                          <Users size={14} className="mr-2 text-gray-500" />
                          <span className="code-font">{event.currentParticipants || 0} / {event.maxParticipants} participants</span>
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    {event.shortDescription && (
                      <p className="text-sm text-gray-300 mb-4 line-clamp-2">
                        {event.shortDescription}
                      </p>
                    )}

                    {/* Analytics */}
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4 pt-3 border-t border-gray-700/50">
                      <span className="code-font">{event.analytics?.views || 0} views</span>
                      <span className="code-font">{event.analytics?.registrationClicks || 0} clicks</span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewEvent(event)}
                          className="p-2 text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-colors border border-transparent hover:border-cyan-500/30"
                          title="View Event"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => handleEditEvent(event)}
                          className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors border border-transparent hover:border-blue-500/30"
                          title="Edit Event"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteEvent(event)}
                          className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors border border-transparent hover:border-red-500/30"
                          title="Delete Event"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      {/* Registration Button */}
                      {event.registrationLink && isUpcoming && (
                        <button
                          onClick={() => handleRegisterClick(event)}
                          className="btn-primary text-sm flex items-center group/btn"
                        >
                          <ExternalLink size={14} className="mr-1 group-hover/btn:rotate-12 transition-transform duration-200" />
                          Register
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Event Form Modal */}
      {showEventForm && (
        <EventForm
          event={selectedEvent}
          onClose={() => setShowEventForm(false)}
          onSuccess={handleFormSuccess}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="relative max-w-md w-full">
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-red-500/30 to-pink-500/30 rounded-2xl blur opacity-75"></div>
            
            <div className="relative bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6">
              <h3 className="text-xl font-bold text-white mb-4 code-font">Delete Event</h3>
              <p className="text-gray-300 mb-6">
                Are you sure you want to delete "<span className="text-cyan-400 font-medium">{showDeleteConfirm.title}</span>"? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="btn-outline"
                  disabled={deleteMutation.isLoading}
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 disabled:opacity-50 font-medium code-font"
                  disabled={deleteMutation.isLoading}
                >
                  {deleteMutation.isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block mr-2"></div>
                      Deleting...
                    </>
                  ) : (
                    'Delete Event'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEvents;