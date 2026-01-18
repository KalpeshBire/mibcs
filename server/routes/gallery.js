const express = require('express');
const router = express.Router();
const Gallery = require('../models/Gallery');
const { adminAuth } = require('../middleware/auth');
const multer = require('multer');
const { uploadToCloudinary } = require('../utils/cloudinary');
const fs = require('fs');

// Configure Multer for file upload
const upload = multer({ dest: 'uploads/' });

// @route   GET /api/gallery
// @desc    Get all gallery images
// @access  Public
router.get('/', async (req, res) => {
    try {
        const images = await Gallery.find().sort({ createdAt: -1 });
        res.json(images);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   POST /api/gallery
// @desc    Upload new image
// @access  Admin
router.post('/', [adminAuth, upload.single('image')], async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Please upload an image' });
        }

        const uploadResult = await uploadToCloudinary(req.file.path);

        if (!uploadResult) {
            return res.status(500).json({ message: 'Error uploading image to Cloudinary' });
        }

        const newImage = new Gallery({
            title: req.body.title,
            image: {
                url: uploadResult.secure_url,
                publicId: uploadResult.public_id
            },
            category: req.body.category
        });

        const savedImage = await newImage.save();
        res.json(savedImage);
    } catch (err) {
        console.error(err);
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   DELETE /api/gallery/:id
// @desc    Delete an image
// @access  Admin
router.delete('/:id', adminAuth, async (req, res) => {
    try {
        const image = await Gallery.findById(req.params.id);
        if (!image) {
            return res.status(404).json({ message: 'Image not found' });
        }

        // Optional: Delete from Cloudinary (requires additional utils if expected)
        // For now we just remove from DB as per typical flow unless strict clean up is required.

        await image.deleteOne();
        res.json({ message: 'Image removed' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
