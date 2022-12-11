var { nanoid } = require("nanoid");

module.exports = (req, res, next) => {
    console.log(req.session.cartId)
    if (req.session.cartId) {
        next()
    }else{
    req.session.cartId = nanoid(64)
    req.session.save((err) => {
        if(!err)
            next()
        });
    }
};