const express = require('express');
const Member = require('../models/Member');
const { adminAuth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/members
// @desc    Get all members (public)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { team, domain, active = 'true' } = req.query;
    
    let query = { isActive: active === 'true' };
    if (team) query.team = team;
    if (domain) query.domains = domain;

    const members = await Member.find(query)
      .sort({ team: 1, position: 1, name: 1 })
      .select('-email'); // Hide email from public

    res.json({ members });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin routes
router.post('/', adminAuth, async (req, res) => {
  try {
    const member = new Member(req.body);
    await member.save();
    res.status(201).json(member);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id', adminAuth, async (req, res) => {
  try {
    const member = await Member.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.json(member);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const member = await Member.findByIdAndDelete(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.json({ message: 'Member deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;