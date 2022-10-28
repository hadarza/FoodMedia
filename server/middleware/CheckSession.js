const crypto = require('crypto-js');

module.exports = (req, res, next) => {
    if (req.session && req.session.cartId) {
        return next();
    }

    req.session.cartId = crypto.randomBytes(16).toString('hex');

    return next();
};