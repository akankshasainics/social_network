const crypto = require('crypto');

const encryptText = (text) => {
    const hash = crypto.createHash('sha256').update(text).digest('hex');
    return hash;
}

module.exports = {
    encryptText
}