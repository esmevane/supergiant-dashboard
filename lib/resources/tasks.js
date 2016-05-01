import ResourceClient from './resource-client'
import Task from './entities/task'

const route = `/api/v0/tasks`

export default class Tasks extends ResourceClient {
  constructor(client) {
    super({ client, route, resource: Task })
  }
}
