import React from 'react'
import { Link } from 'react-router'
import CreateApp from './CreateApp.container'

export default class New extends React.Component {
  render() {
    return(
      <article className='apps-detail'>
        <header>
          <h3>Create a new app</h3>
        </header>
        <section className='apps-detail-main'>
          <CreateApp />
        </section>
        <footer>
          <Link to='/'>Back to Dashboard</Link>
        </footer>
      </article>
    )
  }
}
