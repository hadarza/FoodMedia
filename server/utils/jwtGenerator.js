const jwt = require('jsonwebtoken')
require("dotenv").config();

function jwtGenerator(IdUser){
    const payload = {
        user: IdUser
    }

   return jwt.sign(payload,process.env.JWTSECRET,{expiresIn: "1hr"})
}

module.exports = jwtGenerator;