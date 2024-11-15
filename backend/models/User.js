const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    exchanges: {
        binance: {
            apiKey: String,
            secretKey: String
        },
        ftx: {
            apiKey: String,
            secretKey: String
        },
        mexc: {
            apiKey: String,
            secretKey: String
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);