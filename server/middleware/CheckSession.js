var { nanoid } = require("nanoid");

module.exports = (req, res, next) => {
    console.log("cart id "+req.session.cartId)
    if (req.session.cartId) {
        return next()
    }else{
    req.session.cartId = nanoid(64)
    req.session.save((err) => {
        if (err) {
            return next(err);
        }
    });
    res.send(req.session.cartId)

    }
}