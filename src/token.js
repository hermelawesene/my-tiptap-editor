// Generate a secure random token
const crypto = require('crypto');
const secureToken = crypto.randomBytes(32).toString('hex');
console.log('Your Secure Token:', secureToken);