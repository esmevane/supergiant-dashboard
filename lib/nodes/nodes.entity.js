import { nodeRoute, ResourceClient } from '../client'
import { fromJS } from 'immutable'
import { kebabCase } from 'lodash'

export const deleteNode = (id) => new ResourceClient(nodeRoute()).delete(id)
export const getNodes = () => new ResourceClient(nodeRoute()).fetch()
export const getNode = (id) => new ResourceClient(nodeRoute()).get(id)
export const saveNode = (node) =>
  new ResourceClient(nodeRoute()).create(node.toJS())

export class Node {
  static from(params) { return new Node(params) }
  static create(params) { return new Node(params) }

  constructor(params) {
    this.contents = fromJS(params)
  }

  id() { return this.contents.get('id') }
  toJS() { return this.toMap().toJS() }
  toMap() { return this.contents }
}

export class Nodes {
  static from({ items }) {
    return new Nodes(items.map(item => Node.from(item)))
  }

  constructor(nodes) { this.contents = nodes }
  count() { return this.contents.length }
  first() { return this.contents[0] }
  toJS() { return this.contents }

  *[Symbol.iterator]() {
    for (let node of this.toJS()) { yield node.toMap() }
  }
}
