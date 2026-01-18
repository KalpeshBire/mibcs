const express = require('express');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
// const User = require('../models/User'); // Commented out for mock auth
const { auth } = require('../middleware/auth'); // Uncommented for proper auth verification

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
// @desc    Get current user (MOCK VERSION with proper JWT verification)
// @access  Private
router.get('/me', async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // For mock version, check if the decoded ID matches our mock admin
    if (decoded.id !== mockAdmin._id) {
      return res.status(401).json({ message: 'Token is not valid' });
    }

    // Return mock admin data
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
    console.error('Auth verification error:', error);
    res.status(401).json({ message: 'Token is not valid' });
  }
});

// @route   POST /api/auth/change-password
// @desc    Change password (MOCK VERSION with proper JWT verification)
// @access  Private
router.post('/change-password', [
  body('currentPassword').isLength({ min: 6 }),
  body('newPassword').isLength({ min: 6 })
], async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // For mock version, check if the decoded ID matches our mock admin
    if (decoded.id !== mockAdmin._id) {
      return res.status(401).json({ message: 'Token is not valid' });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Mock password change - always succeeds for demo
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Auth verification error:', error);
    res.status(401).json({ message: 'Token is not valid' });
  }
});

module.exports = router;