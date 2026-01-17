const express = require('express');
const { body, validationResult } = require('express-validator');
const Achievement = require('../models/Achievement');
const { adminAuth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/achievements
// @desc    Get all achievements (public)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, year, domain, featured, limit = 10, page = 1 } = req.query;
    
    let query = {};
    if (category) query.category = category;
    if (year) query.year = parseInt(year);
    if (domain) query.domains = domain;
    if (featured) query.featured = featured === 'true';

    const achievements = await Achievement.find(query)
      .sort({ date: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Achievement.countDocuments(query);

    // Get unique years for filter
    const years = await Achievement.distinct('year');

    res.json({
      achievements,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
      years: years.sort((a, b) => b - a)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/achievements/:id
// @desc    Get single achievement
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const achievement = await Achievement.findById(req.params.id);
    if (!achievement) {
      return res.status(404).json({ message: 'Achievement not found' });
    }

    res.json(achievement);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/achievements
// @desc    Create achievement
// @access  Private (Admin)
router.post('/', [
  adminAuth,
  body('title').notEmpty().trim(),
  body('description').notEmpty(),
  body('category').isIn(['hackathon', 'competition', 'research', 'recognition', 'certification', 'other']),
  body('year').isInt({ min: 2020, max: new Date().getFullYear() + 1 }),
  body('date').isISO8601()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const achievement = new Achievement(req.body);
    await achievement.save();

    res.status(201).json(achievement);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/achievements/:id
// @desc    Update achievement
// @access  Private (Admin)
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const achievement = await Achievement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!achievement) {
      return res.status(404).json({ message: 'Achievement not found' });
    }

    res.json(achievement);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/achievements/:id
// @desc    Delete achievement
// @access  Private (Admin)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const achievement = await Achievement.findByIdAndDelete(req.params.id);
    if (!achievement) {
      return res.status(404).json({ message: 'Achievement not found' });
    }

    res.json({ message: 'Achievement deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;