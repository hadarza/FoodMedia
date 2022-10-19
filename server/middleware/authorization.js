const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = async (req, res,next) =>{
//On server side make middleware that will check if request has token and its valid
//If not valid, send unauthorized response 
   try{
        const jwtToken = req.headers['jwt_token'];
        console.log(req.headers['jwt_token'])
        if (!jwtToken) {
            return res.status(403).send("Not authorize");
        }

        const payload = jwt.verify(jwtToken,process.env.JWTSECRET);
        console.log("payload "+payload.user)
        req.user = payload.user; // payload.user is from jwtGenerator 
        next()
    }catch (err){
        console.error(err.message)
        return res.status(403).send("Not authorize");
    }
}
