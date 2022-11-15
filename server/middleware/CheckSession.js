var { nanoid } = require("nanoid");

module.exports = (req, res, next) => {
    if (req.session.cartId15) {
        console.log("exist already")
        next()
    }
else{
    req.session.cartId15 = nanoid(64)
    req.session.save((err) => {
    if(!err)
        next()
    });
}
};