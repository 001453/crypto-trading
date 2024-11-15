const express = require('express');
const router = express.Router();
const Exchange = require('../models/Exchange');
const auth = require('../middleware/auth');

router.post('/update', auth, async(req, res) => {
    try {
        console.log('Request body:', req.body); // İstek verilerini kontrol et
        console.log('User:', req.user); // Kullanıcı bilgilerini kontrol et

        const { exchange, apiKey, secretKey } = req.body;

        let exchangeData = await Exchange.findOne({
            userId: req.user.id,
            exchange: exchange
        });

        if (exchangeData) {
            exchangeData.apiKey = apiKey;
            exchangeData.secretKey = secretKey;
            await exchangeData.save();
        } else {
            exchangeData = new Exchange({
                userId: req.user.id,
                exchange,
                apiKey,
                secretKey
            });
            await exchangeData.save();
        }

        res.status(200).json({ message: 'API anahtarları güncellendi' });
    } catch (error) {
        console.error('Exchange update error:', error);
        res.status(500).json({ error: 'API anahtarları güncellenemedi', details: error.message });
    }
});

module.exports = router;