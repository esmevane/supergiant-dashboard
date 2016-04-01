import { resolve } from 'path'
import url from 'url'
import express from 'express'
import proxy from 'proxy-middleware'
import { action, info, log } from '../messages'
import config from '../../webpack.config'

let appHost  = `http://localhost:${config.meta.port - 1}`
let scripts  = `http://localhost:${config.meta.port}/assets`
let assetUri = `${appHost}/assets`
let bookUri  = `${appHost}/book`
let appPath  = resolve([__dirname, '..', '..', 'app'].join("/"))

// Some routes are only in use for the specific case of development mode hot
// loaders or developer documentation.
//
// This route is static in production:
// - /assets
//
// In non-production modes, this route is proxied to a Webpack hotloading dev
// server:
// - /assets
//
// Also in non-production, this route is available as a guidebook and running
// documentation for developers and staff:
// - /book
//
// Pending is a way to start up the gitbook server manually and proxy to it,
// so that we can have a little more of an automatic workflow there.
// Currently we have to manually build it.
//
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

    messages.add(function* () {
      yield action(`Gitbook mounted`)
      yield log(`@`)
      yield info(bookUri)
    })

    app.use('/assets', proxy(url.parse(scripts)))
    app.use('/book', express.static(`${appPath}/book`));
  }

  // Statically permit images, and also do a little trick work to bootstrap the
  // favicon (which needs to be expanded for other app interfaces).
  app.use('/images', express.static(`${appPath}/images`))
  app.use('/fonts', express.static(`${appPath}/fonts`))
  app.get('/favicon.ico', (request, response) => {
    response.sendFile(resolve([appPath, 'images', 'favicon.ico'].join("/")))
  })
}
