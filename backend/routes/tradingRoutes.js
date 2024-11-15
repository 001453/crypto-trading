const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const axios = require('axios');

// MEXC API endpoint'leri
const MEXC_API_URL = 'https://api.mexc.com/api/v3';

router.get('/price', auth, async(req, res) => {
    try {
        const { symbol } = req.query;
        const response = await axios.get(`${MEXC_API_URL}/ticker/price`, {
            params: { symbol: symbol.replace('/', '') }
        });
        res.json({ price: response.data.price });
    } catch (error) {
        res.status(500).json({ error: 'Fiyat bilgisi alınamadı' });
    }
});

router.post('/order', auth, async(req, res) => {
    try {
        const { symbol, amount, type } = req.body;
        // MEXC API ile alım-satım işlemi
        // API anahtarlarını veritabanından al
        res.json({ message: 'İşlem başarılı' });
    } catch (error) {
        res.status(500).json({ error: 'İşlem başarısız' });
    }
});

module.exports = router;