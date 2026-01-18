const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true
    },
    image: {
        url: {
            type: String,
            required: true
        },
        publicId: {
            type: String,
            required: true
        }
    },
    category: {
        type: String,
        default: 'general'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Gallery', gallerySchema);
