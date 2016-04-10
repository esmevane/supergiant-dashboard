import { fromJS } from 'immutable'
import fetch from 'isomorphic-fetch'

const username = process.env.SG_DASH_USER || `admin`
const password = process.env.SG_DASH_PASS || `password`
const authHash = new Buffer(`${username}:${password}`).toString(`base64`)
const headers = { "Authorization": `Basic ${authHash}` }

export const appRoute = () => `v0/apps`
export const entrypointRoute = () => `v0/entrypoints`
export const registryRoute = () => `v0/registries/dockerhub/repos`
export const componentRoute = (appName) => `v0/apps/${appName}/components`
export const releaseRoute = (appName, componentName) =>
  `v0/apps/${appName}/components/${componentName}/releases`

function renderResponse(response, content) {
  try {
    let json = JSON.parse(content)

    return { response, body: json }
  } catch(error) {
    return { response, body: { errors: [content] } }
  }
}

export function getResources(resource) {
  return async () => {
    let response = await fetch(`/api/${resource}`, { headers })
    let content  = await response.text()

    return renderResponse(response, content)
  }
}

export function getResource(resource) {
  return async (id) => {
    let response = await fetch(`/api/${resource}/${id}`, { headers })
    let content  = await response.text()

    return renderResponse(response, content)
  }
}

export function createResource(resource) {
  return async (params) => {
    let method   = `POST`
    let request  = { method, headers, body: JSON.stringify(params) }
    let response = await fetch(`/api/${resource}`, request)
    let content  = await response.text()

    return renderResponse(response, content)
  }
}

export function deleteResource(resource) {
  return async (id) => {
    let method   = `DELETE`
    let response = await fetch(`/api/${resource}/${id}`, { method, headers })
    let content  = await response.text()

    return renderResponse(response, content)
  }
}

export function updateResource(resource) {
  return async (id, params) => {
    let method   = `PATCH`
    let body     = JSON.stringify(params)
    let request  = { method, headers, body }
    let response = await fetch(`/api/${resource}/${id}`, request)
    let content  = await response.text()

    return renderResponse(response, content)
  }
}

export class ResourceClient {
  constructor(namespace) {
    this.get = getResource(namespace)
    this.fetch = getResources(namespace)
    this.create = createResource(namespace)
    this.update = updateResource(namespace)
    this.delete = deleteResource(namespace)
  }
}
