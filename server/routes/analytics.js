const express = require('express');
const Event = require('../models/Event');
const Achievement = require('../models/Achievement');
const Project = require('../models/Project');
const Contact = require('../models/Contact');
const Member = require('../models/Member');
const { adminAuth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/analytics/dashboard
// @desc    Get dashboard analytics
// @access  Private (Admin)
router.get('/dashboard', adminAuth, async (req, res) => {
  try {
    // Get counts
    const totalEvents = await Event.countDocuments();
    const upcomingEvents = await Event.countDocuments({ status: 'upcoming' });
    const totalAchievements = await Achievement.countDocuments();
    const totalProjects = await Project.countDocuments();
    const activeProjects = await Project.countDocuments({ status: { $in: ['ongoing', 'planning'] } });
    const totalMembers = await Member.countDocuments({ isActive: true });
    const pendingContacts = await Contact.countDocuments({ status: 'new' });

    // Get event analytics
    const eventAnalytics = await Event.aggregate([
      {
        $group: {
          _id: null,
          totalViews: { $sum: '$analytics.views' },
          totalRegistrationClicks: { $sum: '$analytics.registrationClicks' }
        }
      }
    ]);

    // Get recent activities
    const recentEvents = await Event.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title date status createdAt');

    const recentAchievements = await Achievement.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title category year createdAt');

    const recentContacts = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email subject type status createdAt');

    // Monthly event views
    const monthlyViews = await Event.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          views: { $sum: '$analytics.views' },
          events: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': -1, '_id.month': -1 } },
      { $limit: 12 }
    ]);

    res.json({
      summary: {
        totalEvents,
        upcomingEvents,
        totalAchievements,
        totalProjects,
        activeProjects,
        totalMembers,
        pendingContacts,
        totalViews: eventAnalytics[0]?.totalViews || 0,
        totalRegistrationClicks: eventAnalytics[0]?.totalRegistrationClicks || 0
      },
      recentActivities: {
        events: recentEvents,
        achievements: recentAchievements,
        contacts: recentContacts
      },
      charts: {
        monthlyViews: monthlyViews.reverse()
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/analytics/events
// @desc    Get event analytics
// @access  Private (Admin)
router.get('/events', adminAuth, async (req, res) => {
  try {
    const events = await Event.find()
      .select('title date analytics status registrationLink')
      .sort({ 'analytics.views': -1 });

    const topEvents = events.slice(0, 10);
    
    const statusDistribution = await Event.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      topEvents,
      statusDistribution,
      totalEvents: events.length
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;