import React from 'react'
import { fork } from 'redux-saga/effects'
import * as crud from 'lib/crud-utilities'

export default class DynamicResource extends React.Component {
  static propTypes = {
    scope: React.PropTypes.string.isRequired,
    client: React.PropTypes.object.isRequired,
    children: React.PropTypes.node.isRequired,
  }

  constructor(props, context) {
    const { scope, client } = props

    super(props, context)

    this.sagas = crud.createCrudSagas(scope, client)
    this.reducer = { [this.props.scope]: crud.createCrudReducers(scope) }
  }

  componentWillMount() {
    this.context.sagaRegistry.run(this.sagas.all)
    this.context.reducerRegistry.register(this.reducer)
  }

  componentWillUnmount() {
    const hasTimeout = typeof setTimeout === 'function'
    const cancellation = () =>
      this.context.sagaRegistry.cancel(this.sagas.all)

    if (hasTimeout) {
      setTimeout(cancellation, 5000)
    } else {
      cancellation()
    }
  }

  render() { return React.Children.only(this.props.children) }
}

DynamicResource.contextTypes = {
  reducerRegistry: React.PropTypes.object,
  sagaRegistry: React.PropTypes.object
}
