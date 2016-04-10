// Allows generators and other ES6+ functionality.
//
import 'babel-polyfill'

// Node system libs.
//
import { resolve } from 'path'
import fs from 'fs'

const join = (...elements) => elements.join("/")

// Express and Express middleware.
//
import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'

// Required for custom implementations of some below routes.
//
import { action, info, log, Messages } from '../messages'
import webpack from 'webpack'
import DevServer from 'webpack-dev-server'
import config from '../../webpack.config'
import statics from './statics'
import authorize from './auth'

const Environment = process.env.NODE_ENV || 'development'
const appHost = `http://localhost:${config.meta.port - 1}`
const scripts = `http://localhost:${config.meta.port}/assets`
const appPath = resolve(join(__dirname, '..', '..', 'app'))
const secret = "whispering suspects trade playing cards"
const index = resolve(join(appPath, 'index.html'))

// The main Express server, which will proxy /assets/ to Webpack unless in
// production environment.
//
let app = express()
let messages = new Messages

app.set('secret', secret)
app.set('username', process.env.SG_DASH_USER || 'admin')
app.set('password', process.env.SG_DASH_PASS || 'password')

messages.add(function* () {
  yield action(`Primary application URL`)
  yield log(`@`)
  yield info(appHost)
})

// Middleware in use:  Body parser, basic auth, morgan logging.
//
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('common'))
app.use(authorize)

// Some of these features are held at a separate file because the lack of
// modularity had previously poisoned debugging efforts.  The intention isn't
// to obfuscate, here, but that is one practical result of it.  Better patterns
// invited.
//
statics(app, messages, Environment)

// All unscripted routes immediately defer to the index route, which has an
// internal route handler on the client side.
//
app.get('*', (request, response) => response.sendFile(index))

if (Environment !== 'test') {
  // We open the central app on the base port.
  //
  app.listen(config.meta.port - 1)

  // Webpack Development Server:  Build and manage script assets.
  //
  if (Environment !== 'production') {
    let devServerOptions = {
      contentBase:        resolve(appPath),
      publicPath:         config.output.publicPath,
      hot:                true,
      cached:             false,
      cachedAssets:       false,
      historyApiFallback: true,
      stats:              { colors: true, chunkModules: false }
    }

    let devServer = new DevServer(webpack(config), devServerOptions)

    devServer.listen(config.meta.port, 'localhost', () => {})
  }

  // Deliver console introduction.
  //
  messages.print()
}
