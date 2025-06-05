const jsonwebtoken = require('jsonwebtoken');
const EncryptionService = require('../utils/encryption');

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'Access denied. No token provided.'
            });
        }

        const encryptedToken = authHeader.split(' ')[1];
        console.log('Encrypted Token:', encryptedToken);

        // Decrypt the token
        let jwtToken;
        try {
            jwtToken = EncryptionService.decryptJWT(encryptedToken);
            if (!jwtToken || typeof jwtToken !== 'string') {
                throw new Error('Invalid decrypted token');
            }
        } catch (decryptionError) {
            console.error('Decryption failed:', decryptionError);
            return res.status(401).json({
                success: false,
                message: 'Invalid encrypted token',
                error: decryptionError.message
            });
        }

        // Verify JWT
        const decoded = jsonwebtoken.verify(jwtToken, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);

        return res.status(401).json({
            success: false,
            message: 'Invalid token',
            error: error.message
        });
    }
};

module.exports = authMiddleware;
