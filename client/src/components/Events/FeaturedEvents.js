import React from 'react';
import { useQuery } from 'react-query';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, ExternalLink, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { api } from '../../utils/api';
import { EVENT_TYPES } from '../../utils/constants';
import LoadingSpinner from '../UI/LoadingSpinner';

const FeaturedEvents = () => {
  const { data, isLoading } = useQuery(
    'featured-events',
    () => api.get('/events?featured=true&status=upcoming&limit=3').then(res => res.data),
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );

  const featuredEvents = data?.events || [];

  if (isLoading) {
    return (
      <section className="py-20 bg-gray-900/30">
        <div className="container-max">
          <div className="flex justify-center">
            <LoadingSpinner size="lg" />
          </div>
        </div>
      </section>
    );
  }

  if (featuredEvents.length === 0) {
    return null; // Don't render section if no featured events
  }

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
    }
  };

  return (
    <section className="py-20 bg-gray-900/30 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-transparent to-gray-900/50"></div>
        <div className="matrix-bg opacity-5"></div>
      </div>

      <div className="container-max relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-4">
            <Star size={24} className="text-yellow-500 mr-2" />
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Featured <span className="text-gradient">Events</span>
            </h2>
          </div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Don't miss these exciting upcoming events designed to enhance your technical skills 
            and connect you with fellow innovators.
          </p>
        </motion.div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredEvents.map((event, index) => {
            const eventType = EVENT_TYPES.find(type => type.id === event.type);
            const eventDate = new Date(event.date);
            const isUpcoming = eventDate > new Date();

            return (
              <motion.div
                key={event._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                {/* Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
                
                <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-2xl border border-gray-700/50 overflow-hidden hover:border-cyan-500/50 transition-all duration-300">
                  {/* Featured Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <div className="bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold flex items-center">
                      <Star size={12} className="mr-1" />
                      FEATURED
                    </div>
                  </div>

                  {/* Event Image */}
                  {event.images?.[0]?.url && (
                    <div className="relative h-48 bg-gray-800">
                      <img
                        src={event.images[0].url}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent"></div>
                    </div>
                  )}

                  <div className="p-6">
                    {/* Event Type & Date */}
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${eventType?.color || 'bg-gray-100 text-gray-800'}`}>
                        {eventType?.name || event.type}
                      </span>
                      <span className="text-xs text-gray-400 code-font">
                        {format(eventDate, 'MMM dd, yyyy')}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300 line-clamp-2">
                      {event.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                      {event.shortDescription || event.description}
                    </p>

                    {/* Event Details */}
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock size={14} className="mr-2 text-gray-400" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin size={14} className="mr-2 text-gray-400" />
                        <span className="truncate">{event.venue}</span>
                      </div>
                      {event.maxParticipants && (
                        <div className="flex items-center text-sm text-gray-500">
                          <Users size={14} className="mr-2 text-gray-400" />
                          <span>{event.currentParticipants || 0} / {event.maxParticipants} registered</span>
                        </div>
                      )}
                    </div>

                    {/* Registration Progress */}
                    {event.maxParticipants && (
                      <div className="mb-6">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-400">Registration</span>
                          <span className="text-cyan-400">
                            {Math.round(((event.currentParticipants || 0) / event.maxParticipants) * 100)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-cyan-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${((event.currentParticipants || 0) / event.maxParticipants) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {/* Action Button */}
                    {event.registrationLink && isUpcoming ? (
                      <button
                        onClick={() => handleRegisterClick(event)}
                        className="w-full btn-primary flex items-center justify-center group/btn"
                      >
                        <ExternalLink size={16} className="mr-2" />
                        <span>Register Now</span>
                        <ArrowRight size={16} className="ml-2 group-hover/btn:translate-x-1 transition-transform duration-200" />
                      </button>
                    ) : (
                      <Link
                        to={`/events`}
                        className="w-full btn-outline flex items-center justify-center"
                      >
                        <Calendar size={16} className="mr-2" />
                        <span>View Details</span>
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All Events CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            to="/events"
            className="inline-flex items-center btn-outline group"
          >
            <Calendar size={18} className="mr-2" />
            <span>View All Events</span>
            <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedEvents;