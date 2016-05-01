import { resolve } from 'path'
import proxy from 'proxy-middleware'
import url from 'url'
import { action, info, log } from '../messages'
import config from '../../webpack.config'

let apiHost = process.env.SG_API_HOST || `http://localhost`
let apiPort = process.env.SG_API_PORT || `8080`
let appHost = `http://localhost:${config.meta.port - 1}`
let apiUri  = `${apiHost}:${apiPort}`

export default function api(app, messages, environment) {
  messages.add(function* () {
    yield action(`API proxy`)
    yield log(`@`)
    yield info(`${appHost}/api`)
  })

  messages.add(function* () {
    yield action(`Directly access API`)
    yield log(`@`)
    yield info(apiUri)
  })

  app.use('/api', proxy(url.parse(apiUri)))
}
