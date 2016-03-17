import React from 'react'
import ButtonLink from '../shared/ButtonLink.container'
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
          <ButtonLink to={ `/apps/${appId}` }>Back to app</ButtonLink>
          <ButtonLink to='/'>Back to Dashboard</ButtonLink>
        </footer>
      </article>
    )
  }
}
