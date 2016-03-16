import React from 'react'

export default class AppList extends React.Component {

  static propTypes = {
    children: React.PropTypes.node.isRequired,
    onNew: React.PropTypes.func.isRequired
  }

  render() {
    return(
      <section className='apps-list'>
        <h2>Your apps</h2>
        <button onClick={ this.props.onNew }>Create an app</button>
        <div className='apps-list-content'>
          { this.props.children }
        </div>
      </section>
    )
  }
}
