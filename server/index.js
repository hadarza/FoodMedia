
const express = require('express')
const app = express()
const port = 4000
const Phone = require('./routes/Phone')
const User = require('./routes/User')
const DashBoard = require('./routes/DashBoard')
var cors = require('cors');
const pool = require("./db");
const redis = require('redis')

const dotenv = require('dotenv')
dotenv.config()

//middleware
app.use(express.json()) // access to request.body
app.use(express.urlencoded({extended: true}));
app.use(cors())

//routes
// app.use('/',(req,res)=>{
//   res.send("Hello world")
// })


app.use('/api/Phone',Phone)
app.use('/api/user',User)
app.use('/api/dashboard',DashBoard)

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})

