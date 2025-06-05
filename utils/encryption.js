const crypto = require('crypto');

// Ensure keys are properly formatted
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY 
    ? Buffer.from(process.env.ENCRYPTION_KEY, 'hex') 
    : crypto.randomBytes(32); // 32 bytes for AES-256

const IV = process.env.ENCRYPTION_IV 
    ? Buffer.from(process.env.ENCRYPTION_IV, 'hex') 
    : crypto.randomBytes(16); // 16 bytes for AES

class EncryptionService {
    static encrypt(text) {
        try {
            // Ensure input is a string
            const textToEncrypt = typeof text === 'string' ? text : JSON.stringify(text);
            
            const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, IV);
            let encrypted = cipher.update(textToEncrypt, 'utf8', 'hex');
            encrypted += cipher.final('hex');
            return encrypted;
        } catch (error) {
            console.error('Encryption error:', error);
            throw new Error('Encryption failed');
        }
    }

    static decrypt(encryptedText) {
        try {
            if (!encryptedText || typeof encryptedText !== 'string') {
                throw new Error('Invalid encrypted text');
            }

            const decipher = crypto.createDecipheriv('aes-256-cbc', ENCRYPTION_KEY, IV);
            let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
            decrypted += decipher.final('utf8');
            
            // Return as string, don't parse as JSON for JWT tokens
            return decrypted;
        } catch (error) {
            console.error('Decryption error:', error);
            throw new Error('Decryption failed');
        }
    }

    static encryptJWT(jwtToken) {
        // Ensure the JWT token is a string
        if (typeof jwtToken !== 'string') {
            throw new Error('JWT token must be a string');
        }
        return this.encrypt(jwtToken);
    }

    static decryptJWT(encryptedToken) {
        const decrypted = this.decrypt(encryptedToken);
        // Ensure we return a string for JWT verification
        return typeof decrypted === 'string' ? decrypted : String(decrypted);
    }
}

module.exports = EncryptionService;
