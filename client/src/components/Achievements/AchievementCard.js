import React from 'react';
import { Trophy, Calendar, Users, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';
import { ACHIEVEMENT_CATEGORIES } from '../../utils/constants';

const AchievementCard = ({ achievement }) => {
  const category = ACHIEVEMENT_CATEGORIES.find(cat => cat.id === achievement.category);

  return (
    <div className="card hover:shadow-lg transition-all duration-200">
      {/* Achievement Image */}
      {achievement.images && achievement.images.length > 0 && (
        <div className="relative h-48 -m-6 mb-6 rounded-t-xl overflow-hidden">
          <img
            src={achievement.images[0].url}
            alt={achievement.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${category?.color || 'bg-gray-100 text-gray-800'}`}>
              {category?.name || achievement.category}
            </span>
          </div>
        </div>
      )}

      {/* Achievement Content */}
      <div className="space-y-4">
        <div>
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-xl font-semibold text-secondary-900 flex-1">
              {achievement.title}
            </h3>
            <Trophy size={20} className="text-yellow-500 ml-2 flex-shrink-0" />
          </div>
          <p className="text-secondary-600 line-clamp-3">
            {achievement.description}
          </p>
        </div>

        {/* Achievement Details */}
        <div className="space-y-2">
          <div className="flex items-center text-sm text-secondary-600">
            <Calendar size={16} className="mr-2 text-primary-600" />
            <span>{format(new Date(achievement.date), 'MMM dd, yyyy')}</span>
          </div>
          
          {achievement.position && (
            <div className="flex items-center text-sm">
              <Trophy size={16} className="mr-2 text-yellow-500" />
              <span className="font-medium text-secondary-900">{achievement.position}</span>
            </div>
          )}

          {achievement.event?.name && (
            <div className="text-sm text-secondary-600">
              <span className="font-medium">Event:</span> {achievement.event.name}
            </div>
          )}

          {achievement.event?.organizer && (
            <div className="text-sm text-secondary-600">
              <span className="font-medium">Organizer:</span> {achievement.event.organizer}
            </div>
          )}

          {achievement.teamMembers && achievement.teamMembers.length > 0 && (
            <div className="flex items-center text-sm text-secondary-600">
              <Users size={16} className="mr-2 text-primary-600" />
              <span>{achievement.teamMembers.length} team member(s)</span>
            </div>
          )}
        </div>

        {/* Domains */}
        {achievement.domains && achievement.domains.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {achievement.domains.map((domain) => (
              <span
                key={domain}
                className="px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded-md"
              >
                {domain}
              </span>
            ))}
          </div>
        )}

        {/* Team Members */}
        {achievement.teamMembers && achievement.teamMembers.length > 0 && (
          <div className="pt-4 border-t border-secondary-200">
            <h4 className="text-sm font-medium text-secondary-900 mb-2">Team Members:</h4>
            <div className="flex flex-wrap gap-1">
              {achievement.teamMembers.map((member, index) => (
                <span
                  key={index}
                  className="text-xs bg-secondary-100 text-secondary-700 px-2 py-1 rounded"
                >
                  {member}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Links */}
        {achievement.links && achievement.links.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-4 border-t border-secondary-200">
            {achievement.links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 text-sm inline-flex items-center"
              >
                {link.type || 'View'}
                <ExternalLink size={12} className="ml-1" />
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AchievementCard;