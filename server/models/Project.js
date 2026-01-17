const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  shortDescription: {
    type: String,
    maxlength: 200
  },
  techStack: [String],
  domains: [{
    type: String,
    enum: ['ML', 'IoT', 'Blockchain', 'Cybersecurity', 'General']
  }],
  status: {
    type: String,
    enum: ['planning', 'ongoing', 'completed', 'paused'],
    default: 'planning'
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date
  },
  teamMembers: [{
    name: String,
    role: String,
    github: String
  }],
  links: {
    github: String,
    demo: String,
    documentation: String,
    other: [String]
  },
  images: [{
    url: String,
    publicId: String,
    caption: String
  }],
  tags: [String],
  featured: {
    type: Boolean,
    default: false
  },
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Intermediate'
  }
}, {
  timestamps: true
});

projectSchema.index({ status: 1, domains: 1 });
projectSchema.index({ featured: 1, updatedAt: -1 });

module.exports = mongoose.model('Project', projectSchema);