import React from 'react'

export default class DynamicRegistries extends React.Component {
  static propTypes = {
    reducerRegistry: React.PropTypes.object.isRequired,
    sagaRegistry: React.PropTypes.object.isRequired
  }

  constructor(props, context) {
    super(props, context)

    this.reducerRegistry = props.reducerRegistry
    this.sagaRegistry = props.sagaRegistry
  }

  getChildContext() {
    return {
      reducerRegistry: this.reducerRegistry,
      sagaRegistry: this.sagaRegistry
    }
  }

  render() { return React.Children.only(this.props.children) }
}

DynamicRegistries.childContextTypes = {
  reducerRegistry: React.PropTypes.object,
  sagaRegistry: React.PropTypes.object
}
