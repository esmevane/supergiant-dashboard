import React from 'react'
import ButtonLink from '../shared/ButtonLink.container'

export default class AppList extends React.Component {
  static propTypes = { children: React.PropTypes.node.isRequired }

  render() {
    return(
      <section className='apps-list'>
        <h2>Your apps</h2>
        <ButtonLink ref='button' to='/apps/new'>
          Create an app
        </ButtonLink>
        <div className='apps-list-content'>
          { this.props.children }
        </div>
      </section>
    )
  }
}
