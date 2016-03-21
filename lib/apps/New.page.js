import React from 'react'
import ButtonLink from '../shared/ButtonLink.container'
import CreateApp from './CreateApp.container'

export default class New extends React.Component {
  render() {
    return(
      <article className='apps-detail'>
        <header>
          <h3>Create a new app</h3>
        </header>
        <div className='apps-detail-main'>
          <CreateApp />
        </div>
        <footer>
          <ButtonLink to='/'>Back to Dashboard</ButtonLink>
        </footer>
      </article>
    )
  }
}
