require('dotenv').config()
const cors = require('@koa/cors');

const Koa = require('koa')

const config = require('./lib/config')
const handlers = require('./handlers')
const controllers = require('./controllers')
const mongooseConfig = require('./lib/mongoose-config')

const app = new Koa()

let corsOptions = {
  origin: process.env.CLIENT_URL || '*',
  credentials: true
};

handlers.forEach((h) => app.use(h))

app.use(cors(corsOptions));
app.use(controllers.routes())
app.use(controllers.allowedMethods())

mongooseConfig()

const start = () => {
  try {
    app.listen(config.port, () => console.log(`server start at ${config.port}`))
  } catch (err) {
    console.log(err)
  }
}

start()
