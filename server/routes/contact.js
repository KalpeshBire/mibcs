const express = require('express');
const { body, validationResult } = require('express-validator');
const Contact = require('../models/Contact');
const { adminAuth } = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/contact
// @desc    Submit contact form (public)
// @access  Public
router.post('/', [
  body('name').notEmpty().trim(),
  body('email').isEmail().normalizeEmail(),
  body('subject').notEmpty().trim(),
  body('message').notEmpty().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const contact = new Contact(req.body);
    await contact.save();

    res.status(201).json({ 
      message: 'Thank you for your message! We will get back to you soon.',
      id: contact._id 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin routes
// @route   GET /api/contact
// @desc    Get all contact messages (admin)
// @access  Private (Admin)
router.get('/', adminAuth, async (req, res) => {
  try {
    const { status, type, limit = 20, page = 1 } = req.query;
    
    let query = {};
    if (status) query.status = status;
    if (type) query.type = type;

    const contacts = await Contact.find(query)
      .populate('respondedBy', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Contact.countDocuments(query);

    res.json({
      contacts,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/contact/:id/respond
// @desc    Respond to contact message
// @access  Private (Admin)
router.put('/:id/respond', [
  adminAuth,
  body('response').notEmpty().trim(),
  body('status').isIn(['in-progress', 'resolved', 'closed'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { response, status } = req.body;

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        response,
        status,
        respondedBy: req.user._id,
        respondedAt: new Date()
      },
      { new: true }
    ).populate('respondedBy', 'name email');

    if (!contact) {
      return res.status(404).json({ message: 'Contact message not found' });
    }

    res.json(contact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;