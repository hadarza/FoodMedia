var { nanoid } = require("nanoid");

module.exports = (req, res, next) => {
    if (req.session.cartId) {
        next()
    }
else{
    req.session.cartId = nanoid(64)
    next()
}
};