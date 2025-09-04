const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    originalURL: {
        type: String,
        required: true
    },
    shortURL: {
        type: String,
        required: true,
        unique: true
    },
    expireAt: {
        type: Date,
        default: () => new Date(Date.now() + 30 * 60 * 1000), // 30 minutes from now
        index: { expires: 0 } // TTL index - expire exactly at this time
    },
    accessCount: {
        type: Number,
        default: 0
    },
    accessInfo: {
        type: [
            {
                timestamp: { type: Date, default: Date.now },
                ipAddress: String,
                userAgent: String
            }
        ],
        default: []
    }
}, { timestamps: true });

module.exports = mongoose.model('Url', urlSchema);
