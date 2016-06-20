import React from 'react'
import { fork } from 'redux-saga/effects'

const context = require.context('./containers', true, /sagas\.js/)
const get = () => context.keys().map(context).map(saga => saga.all)

export { get, context }

export default get()
