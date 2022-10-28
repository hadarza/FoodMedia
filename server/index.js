
const express = require('express')
const app = express()
const session = require('express-session')
const port = 4000
const Phone = require('./routes/Phone')
const User = require('./routes/User')
const DashBoard = require('./routes/DashBoard')
const ShoppingCart = require('./routes/ShoppingCart')
const redis = require('redis')
const connectRedis = require('connect-redis');

var cors = require('cors');
const dotenv = require('dotenv')
dotenv.config()

const {PASSWORD_REDIS, REDIS_URL,SECRET_REDIS_SESSION} = process.env

//middleware
app.use(express.json()) // access to request.body
app.use(express.urlencoded({extended: true}));
app.use(cors())


let redisClient = redis.createClient({
    url: `redis://Hadar:${PASSWORD_REDIS}@${REDIS_URL}`
  });

app.set('redisClient', redisClient);

app.use(
  session({
      store: new RedisStore({ client: redisClient }),
      secret: SECRET_REDIS_SESSION,
      resave: false,
      saveUninitialized: false,
      rolling: true,
      cookie: {
          maxAge: 3600 * 1000 * 3
      }
  })
);

//routes
app.use('/public', express.static(__dirname + '/public' ));

app.use('/api/ShoppingCart',ShoppingCart)
app.use('/api/Phone',Phone)
app.use('/api/user',User)
app.use('/api/dashboard',DashBoard)

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})

