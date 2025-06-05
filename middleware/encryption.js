const EncryptionService = require('../utils/encryption');

// Middleware to decrypt incoming requests
const decryptRequest = (req, res, next) => {
  try {
    // Skip decryption for auth routes and GET requests
    if (req.path.includes('/auth') || req.method === 'GET') {
      return next();
    }

    // Check if request body has encrypted data
    if (req.body && req.body.encryptedData) {
      console.log('Decrypting request data...');
      const decryptedData = EncryptionService.decrypt(req.body.encryptedData);

      // Parse decrypted JSON string into JS object
      req.body = JSON.parse(decryptedData);

      console.log('Request decrypted successfully', req.body);
    }

    next();
  } catch (error) {
    console.error('Request decryption error:', error);
    res.status(400).json({
      success: false,
      message: 'Invalid encrypted request data',
    });
  }
};

// Middleware to encrypt outgoing responses
const encryptResponse = (req, res, next) => {
  // Store original json method
  const originalJson = res.json;

  // Override json method
  res.json = function (data) {
    try {
      // Skip encryption for auth routes or error responses
      if (req.path.includes('/auth') || !data.success) {
        return originalJson.call(this, data);
      }

      console.log('Encrypting response data...');
      const encryptedData = EncryptionService.encrypt(data);

      const encryptedResponse = {
        success: true,
        encrypted: true,
        data: encryptedData,
      };

      console.log('Response encrypted successfully', encryptedResponse);
      return originalJson.call(this, encryptedResponse);
    } catch (error) {
      console.error('Response encryption error:', error);
      return originalJson.call(this, {
        success: false,
        message: 'Response encryption failed',
      });
    }
  };

  next();
};

module.exports = {
  decryptRequest,
  encryptResponse,
};
