import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';
import { EVENT_TYPES } from '../../utils/constants';
import { api } from '../../utils/api';

const EventCard = ({ event }) => {
  const eventType = EVENT_TYPES.find(type => type.id === event.type);
  
  const handleRegisterClick = async () => {
    if (event.registrationLink) {
      // Track click
      try {
        await api.post(`/events/${event._id}/register-click`);
      } catch (error) {
        console.error('Failed to track registration click:', error);
      }
      // Open registration link
      window.open(event.registrationLink, '_blank');
    }
  };

  return (
    <div className="card hover:shadow-lg transition-all duration-200">
      {/* Event Image */}
      {event.images && event.images.length > 0 && (
        <div className="relative h-48 -m-6 mb-6 rounded-t-xl overflow-hidden">
          <img
            src={event.images[0].url}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${eventType?.color || 'bg-gray-100 text-gray-800'}`}>
              {eventType?.name || event.type}
            </span>
          </div>
        </div>
      )}

      {/* Event Content */}
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold text-secondary-900 mb-2">
            {event.title}
          </h3>
          <p className="text-secondary-600 line-clamp-3">
            {event.shortDescription || event.description}
          </p>
        </div>

        {/* Event Details */}
        <div className="space-y-2">
          <div className="flex items-center text-sm text-secondary-600">
            <Calendar size={16} className="mr-2 text-primary-600" />
            <span>{format(new Date(event.date), 'MMM dd, yyyy')}</span>
          </div>
          <div className="flex items-center text-sm text-secondary-600">
            <Clock size={16} className="mr-2 text-primary-600" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center text-sm text-secondary-600">
            <MapPin size={16} className="mr-2 text-primary-600" />
            <span>{event.venue}</span>
          </div>
          {event.maxParticipants && (
            <div className="flex items-center text-sm text-secondary-600">
              <Users size={16} className="mr-2 text-primary-600" />
              <span>
                {event.currentParticipants || 0} / {event.maxParticipants} participants
              </span>
            </div>
          )}
        </div>

        {/* Domains */}
        {event.domains && event.domains.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {event.domains.map((domain) => (
              <span
                key={domain}
                className="px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded-md"
              >
                {domain}
              </span>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-secondary-200">
          <Link
            to={`/events/${event._id}`}
            className="text-primary-600 hover:text-primary-700 font-medium text-sm"
          >
            View Details
          </Link>
          {event.registrationLink && event.status === 'upcoming' && (
            <button
              onClick={handleRegisterClick}
              className="btn-primary text-sm inline-flex items-center"
            >
              Register Now
              <ExternalLink size={14} className="ml-1" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;