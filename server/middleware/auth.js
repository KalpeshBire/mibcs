const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Mock admin user for testing (should match the one in auth.js)
const mockAdmin = {
  _id: 'admin123',
  name: 'Admin User',
  email: 'admin@mibcs.com',
  role: 'admin'
};

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Mock mode: check if decoded ID matches mock admin
    if (process.env.NODE_ENV !== 'production' && decoded.id === mockAdmin._id) {
      req.user = mockAdmin;
      return next();
    }
    
    // Real mode: find user in database
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(401).json({ message: 'Token is not valid' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

const adminAuth = async (req, res, next) => {
  try {
    await auth(req, res, () => {
      if (req.user.role !== 'admin' && req.user.role !== 'moderator') {
        return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
      }
      next();
    });
  } catch (error) {
    res.status(401).json({ message: 'Authorization failed' });
  }
};

module.exports = { auth, adminAuth };