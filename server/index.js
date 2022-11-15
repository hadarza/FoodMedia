
// const express = require('express')
// const app = express()
// const session = require('express-session')
// const port = 4000
// const Phone = require('./routes/Phone')
// const User = require('./routes/User')
// const DashBoard = require('./routes/DashBoard')
// const ShoppingCart = require('./routes/ShoppingCart')
// const Product = require('./routes/Product')
// const redis = require('redis')
// const connectRedis = require('connect-redis');

// var cors = require('cors');
// const dotenv = require('dotenv')
// dotenv.config()
// const RedisStore = connectRedis(session)

// const {PASSWORD_REDIS, REDIS_URL,SECRET_REDIS_SESSION} = process.env
// //middleware
// app.use(express.json()) // access to request.body
// app.use(express.urlencoded({extended: true}));
// app.use(cors())


// let redisClient = redis.createClient({
//   url: `redis://Hadar:${PASSWORD_REDIS}@${REDIS_URL}`,
//   legacyMode: true
//   });
// redisClient.connect()
// app.set('redisClient', redisClient);

// app.use(
//   session({
//       store: new RedisStore({ client: redisClient }),
//       secret: SECRET_REDIS_SESSION,
//       name: '_redisDemo', 
//       resave: false, // don't force the session to be saved to the session store if it wasn't modified
//       saveUninitialized: false, // dont force a session that is uninitalized to be saved to the store
//       cookie: {
//           secure: false,
//           httpOnly: false,
//           maxAge: 3600 * 1000 * 5
//       }
//   })
// );
// //routes
// app.use('/public', express.static(__dirname + '/public' ));

// app.use('/api/ShoppingCart',ShoppingCart)
// app.use('/api/Product',Product)
// app.use('/api/Phone',Phone)
// app.use('/api/user',User)
// app.use('/api/dashboard',DashBoard)

// app.listen(port, () => {
//   console.log(`app listening on port ${port}`)
// })
var express = require('express')
const app = express()
const port = 4000
const Phone = require('./routes/Phone')
const User = require('./routes/User')
const DashBoard = require('./routes/DashBoard')
const ShoppingCart = require('./routes/ShoppingCart')
const Product = require('./routes/Product')
var parseurl = require('parseurl')
var session = require('express-session')
const redis = require('redis')

var cors = require('cors');
const dotenv = require('dotenv')
dotenv.config()
const connectRedis = require('connect-redis');
const CheckSession = require('./middleware/CheckSession')

const RedisStore = connectRedis(session)

const {PASSWORD_REDIS, REDIS_URL,SECRET_REDIS_SESSION} = process.env
let client = redis.createClient({
  url: `redis://Hadar:${PASSWORD_REDIS}@${REDIS_URL}`,
  legacyMode: true
  });
  app.set('redisClient', client);

client.connect()

// middleware
app.use(express.json()) // access to request.body
app.use(express.urlencoded({extended: true}));
app.use(cors({credentials:true}))

app.use(session({
    store: new RedisStore({ client: client }),
    secret: SECRET_REDIS_SESSION,
    resave: false,
    saveUninitialized: false
}))
app.use('/api/ShoppingCart',ShoppingCart)
app.use('/api/Product',Product)
app.use('/api/Phone',Phone)
app.use('/api/user',User)
app.use('/api/dashboard',DashBoard)
// app.put('/api/shopping/12345',CheckSession,(req,res)=>{
//   console.log(req.session.cartId8)
//   // req.session.save()
//   res.send(req.session.cartId8)
// })
// app.delete('/api/shopping/123456',CheckSession,(req,res)=>{
//   console.log(req.session.cartId8)
//   res.send(req.session.cartId8)

// })
app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})