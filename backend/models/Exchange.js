const mongoose = require('mongoose');

const exchangeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    exchange: {
        type: String,
        required: true
    },
    apiKey: {
        type: String,
        required: true
    },
    secretKey: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Exchange', exchangeSchema);