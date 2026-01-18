const express = require('express');
const { body, validationResult } = require('express-validator');
const Event = require('../models/Event');
const { adminAuth } = require('../middleware/auth');

const router = express.Router();

// Mock events data for development
const mockEvents = [
  {
    _id: 'event1',
    title: 'AI Workshop: Building Neural Networks',
    description: 'Learn to build and train neural networks from scratch using TensorFlow and PyTorch. This comprehensive workshop covers the fundamentals of deep learning, neural network architectures, and practical implementation techniques.',
    shortDescription: 'Learn to build neural networks from scratch using TensorFlow and PyTorch.',
    date: new Date('2024-03-15T14:00:00Z'),
    endDate: new Date('2024-03-15T17:00:00Z'),
    time: '14:00',
    venue: 'Tech Lab A, Building 3',
    type: 'workshop',
    status: 'upcoming',
    registrationLink: 'https://forms.google.com/ai-workshop-registration',
    maxParticipants: 50,
    currentParticipants: 35,
    images: [{
      url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
      caption: 'AI Workshop'
    }],
    tags: ['AI', 'Machine Learning', 'TensorFlow', 'PyTorch', 'Workshop'],
    domains: ['ML'],
    organizers: ['Dr. Sarah Chen', 'AI Research Team'],
    featured: true,
    analytics: {
      views: 245,
      registrationClicks: 89
    },
    createdAt: new Date('2024-01-15T10:00:00Z'),
    updatedAt: new Date('2024-01-20T15:30:00Z')
  },
  {
    _id: 'event2',
    title: 'Blockchain Hackathon 2024',
    description: '48-hour hackathon focused on building decentralized applications and smart contracts. Teams will compete to create innovative blockchain solutions with mentorship from industry experts.',
    shortDescription: '48-hour hackathon for building decentralized applications and smart contracts.',
    date: new Date('2024-03-20T09:00:00Z'),
    endDate: new Date('2024-03-22T18:00:00Z'),
    time: '09:00',
    venue: 'Innovation Hub, Main Campus',
    type: 'hackathon',
    status: 'upcoming',
    registrationLink: 'https://forms.google.com/blockchain-hackathon-2024',
    maxParticipants: 100,
    currentParticipants: 87,
    images: [{
      url: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=400&fit=crop',
      caption: 'Blockchain Hackathon'
    }],
    tags: ['Blockchain', 'Hackathon', 'DApps', 'Smart Contracts', 'Web3'],
    domains: ['Blockchain'],
    organizers: ['Blockchain Club', 'Tech Innovation Center'],
    featured: true,
    analytics: {
      views: 456,
      registrationClicks: 123
    },
    createdAt: new Date('2024-01-10T09:00:00Z'),
    updatedAt: new Date('2024-01-25T11:15:00Z')
  },
  {
    _id: 'event3',
    title: 'IoT Security Best Practices',
    description: 'Comprehensive seminar on securing IoT devices and networks against cyber threats. Learn about common vulnerabilities, security frameworks, and implementation strategies.',
    shortDescription: 'Learn to secure IoT devices and networks against cyber threats.',
    date: new Date('2024-03-25T16:00:00Z'),
    time: '16:00',
    venue: 'Auditorium B, Engineering Building',
    type: 'seminar',
    status: 'upcoming',
    registrationLink: 'https://forms.google.com/iot-security-seminar',
    maxParticipants: 80,
    currentParticipants: 62,
    images: [{
      url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop',
      caption: 'IoT Security Seminar'
    }],
    tags: ['IoT', 'Cybersecurity', 'Network Security', 'Seminar'],
    domains: ['IoT', 'Cybersecurity'],
    organizers: ['Prof. Michael Rodriguez', 'Cybersecurity Research Lab'],
    featured: true,
    analytics: {
      views: 189,
      registrationClicks: 67
    },
    createdAt: new Date('2024-01-12T14:00:00Z'),
    updatedAt: new Date('2024-01-22T16:45:00Z')
  },
  {
    _id: 'event4',
    title: 'Machine Learning Competition',
    description: 'Annual ML competition where teams solve real-world data science problems. Prizes for top performers and networking opportunities with industry professionals.',
    shortDescription: 'Annual ML competition with real-world data science challenges.',
    date: new Date('2024-04-05T10:00:00Z'),
    time: '10:00',
    venue: 'Computer Science Building',
    type: 'competition',
    status: 'upcoming',
    registrationLink: 'https://forms.google.com/ml-competition-2024',
    maxParticipants: 60,
    currentParticipants: 45,
    tags: ['Machine Learning', 'Competition', 'Data Science', 'AI'],
    domains: ['ML'],
    organizers: ['ML Research Group', 'Data Science Club'],
    featured: false,
    analytics: {
      views: 234,
      registrationClicks: 78
    },
    createdAt: new Date('2024-01-08T12:00:00Z'),
    updatedAt: new Date('2024-01-18T09:30:00Z')
  },
  {
    _id: 'event5',
    title: 'Web Development Bootcamp',
    description: 'Intensive 3-day bootcamp covering modern web development technologies including React, Node.js, and cloud deployment strategies.',
    shortDescription: '3-day intensive bootcamp on modern web development technologies.',
    date: new Date('2023-12-15T09:00:00Z'),
    endDate: new Date('2023-12-17T17:00:00Z'),
    time: '09:00',
    venue: 'Tech Lab C',
    type: 'workshop',
    status: 'completed',
    maxParticipants: 40,
    currentParticipants: 40,
    tags: ['Web Development', 'React', 'Node.js', 'Bootcamp'],
    domains: ['General'],
    organizers: ['Web Dev Team', 'Student Tech Society'],
    featured: false,
    analytics: {
      views: 567,
      registrationClicks: 156
    },
    createdAt: new Date('2023-11-01T10:00:00Z'),
    updatedAt: new Date('2023-12-20T14:00:00Z')
  }
];

// In-memory storage for new events (for demo purposes)
let eventIdCounter = 6;
let createdEvents = [];

// @route   GET /api/events
// @desc    Get all events (public)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { status, domain, featured, limit = 10, page = 1 } = req.query;
    
    // Combine mock events with created events
    let allEvents = [...mockEvents, ...createdEvents];
    
    // Apply filters
    let filteredEvents = allEvents;
    
    if (status) {
      filteredEvents = filteredEvents.filter(event => event.status === status);
    }
    
    if (domain) {
      filteredEvents = filteredEvents.filter(event => 
        event.domains && event.domains.includes(domain)
      );
    }
    
    if (featured) {
      const isFeatured = featured === 'true';
      filteredEvents = filteredEvents.filter(event => event.featured === isFeatured);
    }

    // Sort events
    filteredEvents.sort((a, b) => {
      if (status === 'completed') {
        return new Date(b.date) - new Date(a.date); // Newest first for completed
      }
      return new Date(a.date) - new Date(b.date); // Oldest first for upcoming
    });

    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedEvents = filteredEvents.slice(startIndex, endIndex);

    // Remove analytics from public response
    const publicEvents = paginatedEvents.map(event => {
      const { analytics, ...publicEvent } = event;
      return publicEvent;
    });

    res.json({
      events: publicEvents,
      totalPages: Math.ceil(filteredEvents.length / limit),
      currentPage: parseInt(page),
      total: filteredEvents.length
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/events/:id
// @desc    Get single event
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const eventId = req.params.id;
    
    // Find event in mock data or created events
    let event = mockEvents.find(e => e._id === eventId) || 
                createdEvents.find(e => e._id === eventId);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Increment view count (simulate analytics)
    if (event.analytics) {
      event.analytics.views += 1;
    }

    res.json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/events/:id/register-click
// @desc    Track registration button click
// @access  Public
router.post('/:id/register-click', async (req, res) => {
  try {
    const eventId = req.params.id;
    
    // Find event in mock data or created events
    let event = mockEvents.find(e => e._id === eventId) || 
                createdEvents.find(e => e._id === eventId);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Increment registration click count (simulate analytics)
    if (event.analytics) {
      event.analytics.registrationClicks += 1;
    }

    res.json({ message: 'Click tracked' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/events
// @desc    Create event
// @access  Private (Admin)
router.post('/', [
  adminAuth,
  body('title').notEmpty().trim(),
  body('description').notEmpty(),
  body('date').isISO8601(),
  body('time').notEmpty(),
  body('venue').notEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Create new event object
    const newEvent = {
      _id: `event${eventIdCounter++}`,
      title: req.body.title,
      description: req.body.description,
      shortDescription: req.body.shortDescription || '',
      date: new Date(req.body.date),
      endDate: req.body.endDate ? new Date(req.body.endDate) : null,
      time: req.body.time,
      venue: req.body.venue,
      type: req.body.type || 'workshop',
      status: req.body.status || 'upcoming',
      registrationLink: req.body.registrationLink || '',
      maxParticipants: req.body.maxParticipants || null,
      currentParticipants: 0,
      images: req.body.images || [],
      tags: req.body.tags || [],
      domains: req.body.domains || [],
      organizers: req.body.organizers || [],
      featured: req.body.featured || false,
      analytics: {
        views: 0,
        registrationClicks: 0
      },
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Add to created events array
    createdEvents.push(newEvent);

    res.status(201).json(newEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/events/:id
// @desc    Update event
// @access  Private (Admin)
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const eventId = req.params.id;
    
    // Find event in created events (only allow editing created events for demo)
    const eventIndex = createdEvents.findIndex(e => e._id === eventId);
    
    if (eventIndex === -1) {
      return res.status(404).json({ message: 'Event not found or cannot be edited' });
    }

    // Update event
    const updatedEvent = {
      ...createdEvents[eventIndex],
      ...req.body,
      _id: eventId, // Preserve ID
      updatedAt: new Date()
    };

    createdEvents[eventIndex] = updatedEvent;

    res.json(updatedEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/events/:id
// @desc    Delete event
// @access  Private (Admin)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const eventId = req.params.id;
    
    // Find and remove event from created events (only allow deleting created events for demo)
    const eventIndex = createdEvents.findIndex(e => e._id === eventId);
    
    if (eventIndex === -1) {
      return res.status(404).json({ message: 'Event not found or cannot be deleted' });
    }

    // Remove event from array
    createdEvents.splice(eventIndex, 1);

    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;