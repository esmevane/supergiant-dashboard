import { resolve } from 'path'
import express from 'express'
import proxy from 'proxy-middleware'
import url from 'url'
import { action, info, log } from '../messages'
import config from '../../webpack.config'

let apiHost  = process.env.SG_API_HOST || `http://localhost`
let apiPort  = process.env.SG_API_PORT || `8080`
let appHost  = `http://localhost:${config.meta.port - 1}`
let scripts  = `http://localhost:${config.meta.port}/assets`
let apiUri   = `${apiHost}:${apiPort}`
let assetUri = `${appHost}/assets`
let appPath  = resolve([__dirname, '..', '..', 'app'].join("/"))

export default function statics(app, messages, environment) {
  if (environment === 'production') {
    messages.add(function* () {
      yield action(`Serving static assets in production mode`)
    })

    app.use('/assets', express.static(`${appPath}/assets`))
  } else {
    messages.add(function* () {
      yield action(`Hotloader proxy`)
      yield log(`@`)
      yield info(assetUri)
    })

    messages.add(function* () {
      yield action(`Directly access hotloader`)
      yield log(`@`)
      yield info(scripts)
    })

    app.use('/assets', proxy(url.parse(scripts)))
  }

  // Statically permit images, and also do a little trick work to bootstrap the
  // favicon (which needs to be expanded for other app interfaces).
  app.use('/images', express.static(`${appPath}/images`))
  app.use('/fonts', express.static(`${appPath}/fonts`))
  app.get('/favicon.ico', (request, response) => {
    response.sendFile(resolve([appPath, 'images', 'favicon.ico'].join("/")))
  })
}
