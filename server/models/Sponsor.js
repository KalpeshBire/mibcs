const mongoose = require('mongoose');

const sponsorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  logo: {
    url: String,
    publicId: String
  },
  website: {
    type: String,
    validate: {
      validator: function(v) {
        return !v || /^https?:\/\/.+/.test(v);
      },
      message: 'Website must be a valid URL'
    }
  },
  description: {
    type: String,
    maxlength: 500
  },
  tier: {
    type: String,
    enum: ['Platinum', 'Gold', 'Silver', 'Bronze', 'Partner'],
    default: 'Bronze'
  },
  sponsorshipType: {
    type: String,
    enum: ['Financial', 'In-kind', 'Venue', 'Mentorship', 'Other'],
    default: 'Financial'
  },
  amount: {
    type: Number,
    min: 0
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date
  },
  events: [String],
  contactPerson: {
    name: String,
    email: String,
    phone: String
  },
  isActive: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

sponsorSchema.index({ tier: 1, isActive: 1 });
sponsorSchema.index({ featured: 1, tier: 1 });

module.exports = mongoose.model('Sponsor', sponsorSchema);