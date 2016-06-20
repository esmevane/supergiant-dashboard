"use strict"

require('babel-polyfill')

const React = require('react')
const chai = require('chai')
const chaiImmutable = require('chai-immutable')
const chaiAsPromised = require('chai-as-promised')
const ReactTestUtils = require('react-addons-test-utils')
const createRenderer = ReactTestUtils.createRenderer
const Simulate = ReactTestUtils.Simulate

chai.use(chaiImmutable)
chai.use(chaiAsPromised)

const mockClient = (Entity, status = 200) => {
  const body = {}
  const items = [body]
  const response = { status }
  const result = { response, body }
  const listResult = { response, body: { items } }

  const throwErrorUnless = code => clientResponse => result
  const getResource = () => key => Promise.resolve(result)
  const getResources = () => () => Promise.resolve({ response, listResult })
  const createResource = () => params => Promise.resolve(result)
  const updateResource = () => entity => Promise.resolve(entity)
  const deleteResource = () => key => Promise.resolve({})

  return {
    throwErrorUnless,
    getResource,
    getResources,
    deleteResource,
    createResource,
    updateResource
  }
}

if (global) {
  global.expect = chai.expect
  global.mockClient = mockClient
  global.React = React
  global.Simulate = Simulate
  global.createRenderer = createRenderer
}
