import React from 'react'
import { isMap } from '../shared/immutable.prop-types'
import ButtonLink from '../shared/ButtonLink.container'

export default class ComponentDetail extends React.Component {
  static propTypes = { app: isMap, component: isMap }

  render() {
    const { app, component } = this.props
    const appId = app.get('id')

    return(
      <article className='components-detail'>
        <header>
          <h3>{ component.get('name') }</h3>
          <h4>{ component.get('id') }</h4>
        </header>
        <section className='components-detail-main'>
          <strong>Type:</strong>
          <em>{ component.get('type') }</em>
        </section>
        <footer>
          <ButtonLink to={ `/apps/${appId}` }>Back to app</ButtonLink>
          <ButtonLink to='/'>Back to Dashboard</ButtonLink>
        </footer>
      </article>
    )
  }
}
