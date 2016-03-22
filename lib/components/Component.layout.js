import React from 'react'

export default class Component extends React.Component {
  static propTypes = { children: React.PropTypes.node.isRequired }

  render() {
    return <section className='components'>{ this.props.children }</section>
  }
}
