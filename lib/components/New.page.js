import React from 'react'
import { Link } from 'react-router'
import CreateComponent from './CreateComponent.container'

export default class New extends React.Component {
  render() {
    const { params: { appId } } = this.props
    return(
      <article className='components-detail'>
        <header>
          <h3>Create a new component</h3>
        </header>
        <section className='components-detail-main'>
          <CreateComponent appId={ appId } />
        </section>
        <footer>
          <ul>
            <li>
              <Link to={ `/apps/${appId}` }>Back to app</Link>
            </li>
            <li>
              <Link to='/'>Back to Dashboard</Link>
            </li>
          </ul>
        </footer>
      </article>
    )
  }
}
