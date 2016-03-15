import fetch from 'isomorphic-fetch'

/**
 * This file bootstraps a bunch of convenience wrappers for a hypermedia JSON
 * API that obeys a restful structure.  There are two possible routes for
 * using the contents below.
 *
 * Case 1, directly grabbing the wrapper scripts as you need them, and then
 * invoking them on a given namespace on a case by case basis:
 *
 * @example
 *
 *     const getUsers = getResources('users')
 *     const { response, data, errors } = getUsers()
 *
 * Case 2, grabbing the `Resource` class and using it to bootstrap all five
 * available functions for a namespace:
 *
 * @example
 *
 *     const Users = new Resource('users')
 *     const { response, data, errors } = Users.fetch()
 *
 * The core assumption here is that the data structure of the API uses a `data`
 * key in its envelope, like so:
 *
 * @example
 *
 *    // An acceptable response:
 *    { "data": (An array of documents or a document object) }
 *
 *    // An acceptable error response:
 *    { "errors": (An array of messages) }
 *
 *    // An unacceptable response:
 *    { "documents": [] }
 *
 */

/**
 * @name getResources
 *
 * Create an index request for a given resource. The function takes a namespace
 * and returns an asynchronous function which can be used to perform an index
 * operation on the resource.
 *
 * @param {string} - A string representing a resource namespace
 * @returns {function} - A function which returns `{ response, data, errors }`
 *
 * @example
 *
 *   // Build the function
 *   import { getResources } from './client'
 *   const documentIndex = getResources(`documents`)
 *
 *   // Get a list of documents
 *   const { response, data, errors } = documentIndex()
 *
 */
export function getResources(resource) {
  return async () => {
    let response   = await fetch(`/api/${resource}`)
    let json       = await response.json()
    let { data }   = json
    let { errors } = json

    return { response, data, errors }
  }
}

/**
 * @name getResource
 *
 * Create a show request for a given resource. The function takes a namespace
 * and returns an asynchronous function which can be used to perform a request
 * operation for a single entity using the entity ID.  This ID is essentially
 * anything, as long as it can be serialized into a uri string and put into a
 * request.
 *
 * @param {string} - A string representing a resource namespace
 * @returns {function} - A function which returns `{ response, data, errors }`
 *
 * @example
 *
 *   // Build the function
 *   import { getResource } from './client'
 *   const showDocument = getResource(`documents`)
 *
 *   // Get a document
 *   const id = 12345
 *   const { response, data, errors } = showDocument(id)
 *
 */
export function getResource(resource) {
  return async (id) => {
    let response   = await fetch(`/api/${resource}/${id}`)
    let json       = await response.json()
    let { data }   = json
    let { errors } = json

    return { response, data, errors }
  }
}

/**
 * @name createResource
 *
 * Create a create / post request for a given resource.  createResource takes
 * a namespace and returns an asynchronous function which accepts a params
 * object and creates a resource entity in the namespace.
 *
 * @param {string} - A string representing a resource namespace
 * @returns {function} - A function which returns `{ response, data, errors }`
 *
 * @example
 *
 *   // Build the function
 *   import { createResource } from './client'
 *   const createDocument = createResource(`documents`)
 *
 *   // Create the document
 *   const params = { title: "A brand new post", body:  "# It's amazing!" }
 *   const { response, data, errors } = createDocument(params)
 *
 */
export function createResource(resource) {
  return async (params) => {
    let method     = "POST"
    let body       = JSON.stringify({ data: { attributes: params } })
    let headers    = { "Content-Type": "application/json" }
    let response   = await fetch(`/api/${resource}`, { method, headers, body })
    let json       = await response.json()
    let { data }   = json
    let { errors } = json

    return { response, data, errors }
  }
}

/**
 * @name deleteResource
 *
 * Create an asynchronous function for a given resource, which takes an ID
 * and calls a destroy action on a resourceful entity.
 *
 * @param {string} - A string representing a resource namespace
 * @returns {function} - A function which returns `{ response, data, errors }`
 *
 * @example
 *
 *   // Build the function
 *   import { deleteResource } from './client'
 *   const deleteDocument = deleteResource(`documents`)
 *
 *   // Delete the document
 *   const id = 12345
 *   const { response, data, errors } = deleteDocument(id)
 *
 */
export function deleteResource(resource) {
  return async (id) => {
    let method     = "DELETE"
    let headers    = { "Content-Type": "application/json" }
    let response   = await fetch(`/api/${resource}/${id}`, { method, headers })
    let json       = await response.json()
    let { data }   = json
    let { errors } = json

    return { response, data, errors }
  }
}

/**
 * @name updateResource
 *
 * Create an asynchronous function for a given resource, which takes an ID
 * and parameters, and calls an update action on a resourceful entity.
 *
 * @param {string} - A string representing a resource namespace
 * @returns {function} - A function which returns `{ response, data, errors }`
 *
 * @example
 *
 *   // Build the function
 *   import { updateResource } from './client'
 *   const updateDocument = updateResource(`documents`)
 *
 *   // Update the document
 *   const id = 12345
 *   const params = { title: "A brand new post", body:  "# It's amazing!" }
 *   const { response, data, errors } = updateDocument(id, params)
 *
 */
export function updateResource(resource) {
  return async (id, params) => {
    let method     = "PATCh"
    let body       = JSON.stringify({ id, data: { attributes: params } })
    let headers    = { "Content-Type": "application/json" }
    let request    = { method, headers, body }
    let response   = await fetch(`/api/${resource}/${id}`, request)
    let json       = await response.json()
    let { data }   = json
    let { errors } = json

    return { response, data, errors }
  }
}

/**
 * @class Resource
 *
 * A single wrapper for a namespace, which provides convenience methods for
 * all standard resource actions for that namespace.
 *
 * @param {string} - A string representing a resource namespace
 *
 * @example
 *
 *   // Build the function
 *   import { Resource } from './client'
 *   const documents = new Resource(`documents`)
 *
 *   // All of these work
 *   const id = 12345
 *   const params = { title: "A brand new post", body:  "# It's amazing!" }
 *
 *   // Get all documents
 *   const { response, data, errors } = documents.fetch()
 *
 *   // Get a specific document
 *   const { response, data, errors } = documents.get(id)
 *
 *   // Create a document
 *   const { response, data, errors } = documents.create(params)
 *
 *   // Delete a document
 *   const { response, data, errors } = documents.delete(id)
 *
 *   // Update a document
 *   const { response, data, errors } = documents.update(id, params)
 *
 */
export class Resource {
  constructor(namespace) {
    this.get = getResource(namespace)
    this.fetch = getResources(namespace)
    this.create = createResource(namespace)
    this.update = updateResource(namespace)
    this.delete = deleteResource(namespace)
  }
}
