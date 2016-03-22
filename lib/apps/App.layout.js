import React from 'react'

export default class Apps extends React.Component {
  static propTypes = { children: React.PropTypes.node.isRequired }
  
  render() {
    return <section className='apps'>{ this.props.children }</section>
  }
}
