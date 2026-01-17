const express = require('express');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
// const User = require('../models/User'); // Commented out for mock auth
// const { auth } = require('../middleware/auth'); // Commented out for mock auth

const router = express.Router();

// Mock admin user for testing (remove when MongoDB is set up)
const mockAdmin = {
  _id: 'admin123',
  name: 'Admin User',
  email: 'admin@mibcs.com',
  password: 'admin123', // In real app, this would be hashed
  role: 'admin'
};

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
};

// @route   POST /api/auth/login
// @desc    Login admin (MOCK VERSION)
// @access  Public
router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Mock authentication - check against hardcoded admin
    if (email !== mockAdmin.email || password !== mockAdmin.password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken(mockAdmin._id);

    res.json({
      token,
      user: {
        id: mockAdmin._id,
        name: mockAdmin.name,
        email: mockAdmin.email,
        role: mockAdmin.role
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user (MOCK VERSION)
// @access  Private
router.get('/me', (req, res) => {
  try {
    // Mock response - in real app, this would verify JWT and get user from DB
    res.json({
      user: {
        id: mockAdmin._id,
        name: mockAdmin.name,
        email: mockAdmin.email,
        role: mockAdmin.role,
        lastLogin: new Date()
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/auth/change-password
// @desc    Change password (MOCK VERSION)
// @access  Private
router.post('/change-password', [
  body('currentPassword').isLength({ min: 6 }),
  body('newPassword').isLength({ min: 6 })
], (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Mock password change - always succeeds for demo
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;