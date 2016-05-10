import ResourceClient from './resource-client'
import LogEntry from './entities/log-entry'

const composeApi = ({ client, scope }) => {
  const api = new ResourceClient({ client })

  api.route = `${scope}/log`
  api.resource = LogEntry

  return api
}

export default class Log {
  constructor({ client, scope }) {
    const api = composeApi({ client, scope })

    this.fetch = api.fetch
    this.route = api.route
  }
}
