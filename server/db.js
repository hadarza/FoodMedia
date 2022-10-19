const Pool = require('pg').Pool;
const dotenv = require('dotenv');
dotenv.config()

const pool = new Pool({
    user: "postgres",
    password: process.env.Password_DB,
    host:"localhost",
    port:5432,
    database: "foodmediaapp"
})



module.exports = pool;