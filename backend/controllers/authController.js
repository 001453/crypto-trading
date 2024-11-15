const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Kullanıcı Kaydı
exports.register = async(req, res) => {
    try {
        const { email, password } = req.body;

        // Email kontrolü
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Bu email zaten kayıtlı' });
        }

        // Şifre hashleme
        const hashedPassword = await bcrypt.hash(password, 12);

        // Yeni kullanıcı oluşturma
        const user = new User({
            email,
            password: hashedPassword,
            exchanges: {
                binance: { apiKey: '', secretKey: '' },
                ftx: { apiKey: '', secretKey: '' },
                mexc: { apiKey: '', secretKey: '' }
            }
        });

        await user.save();

        // Token oluşturma
        const token = jwt.sign({ userId: user._id },
            process.env.JWT_SECRET, { expiresIn: '24h' }
        );

        res.status(201).json({ token, userId: user._id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Kullanıcı Girişi
exports.login = async(req, res) => {
    try {
        const { email, password } = req.body;

        // Kullanıcı kontrolü
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Kullanıcı bulunamadı' });
        }

        // Şifre kontrolü
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({ message: 'Geçersiz şifre' });
        }

        // Token oluşturma
        const token = jwt.sign({ userId: user._id },
            process.env.JWT_SECRET, { expiresIn: '24h' }
        );

        res.json({ token, userId: user._id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};