const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const token = req.header('Authorization') && req.header('Authorization').replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Yetkilendirme hatası' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            id: decoded.userId // userId'yi doğru şekilde ayarlıyoruz
        };
        next();
    } catch (error) {
        res.status(401).json({ message: 'Geçersiz token' });
    }
};