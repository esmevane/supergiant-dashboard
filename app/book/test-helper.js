process.env.NODE_ENV = 'test'

import 'babel-polyfill'
import React from 'react'
import chai from 'chai'
import chaiImmutable from 'chai-immutable'
import { createRenderer, Simulate } from 'react-addons-test-utils'

chai.use(chaiImmutable)

if (global) {
  global.expect = chai.expect
  global.React = React
  global.Simulate = Simulate
  global.createRenderer = createRenderer
}
