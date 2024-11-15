const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const exchangeRoutes = require('./routes/exchangeRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/exchange', exchangeRoutes);

const PORT = process.env.PORT || 5001;

// MongoDB Bağlantısı
mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB bağlantısı başarılı'))
    .catch((err) => console.log('MongoDB bağlantı hatası:', err));

// Test route
app.get('/', (req, res) => {
    res.send('Crypto Trading API çalışıyor');
});

app.listen(PORT, () => {
    console.log(`Server ${PORT} portunda çalışıyor`);
});