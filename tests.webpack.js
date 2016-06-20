"use strict"

require('./test-helper')

const context = require.context('./lib', true, /\-spec\.js$/)

context.keys().forEach(context)
