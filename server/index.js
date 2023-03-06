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

const RedisStore = connectRedis(session)

const {PASSWORD_REDIS, REDIS_URL,SECRET_REDIS_SESSION} = process.env
let client = redis.createClient({
  url: `redis://Hadar:${PASSWORD_REDIS}@${REDIS_URL}`,
  // legacyMode: true
  });

  app.set('redisClient', client);

client.connect()

// middleware
app.use(express.json()) // access to request.body
app.use(express.urlencoded({extended: true}));
// app.use(cors())
//{ origin: true }
app.use(cors({credentials: true, origin: true})); // enable origin cors

//Configure session middleware
// const sessionMiddleware = session({
//   store: new RedisStore({ client }),
//   secret: 'secret$%^134',
//   resave: true,
//   saveUninitialized: true,
// })


// app.post("/post", function(req, res){
//   //if(req.session.user){
//     req.session.cartId = "myname";
//     res.send(req.session);
//  // }
//   console.log(req.session);
// });

app.use(sessionMiddleware)
app.use('/api/ShoppingCart',ShoppingCart)
app.use('/api/Product',Product)
app.use('/api/Phone',Phone)
app.use('/api/user',User)
app.use('/api/dashboard',DashBoard)

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})