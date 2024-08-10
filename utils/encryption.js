const crypto = require('crypto');

/**
 * Get hash of given text
 */
const encryptText = (text) => {
    const hash = crypto.createHash('sha256').update(text).digest('hex');
    return hash;
}

module.exports = {
    encryptText
}