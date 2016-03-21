import React from 'react'
import { isMap } from '../shared/immutable.prop-types'
import ButtonLink from '../shared/ButtonLink.container'
import UpdateComponent from './UpdateComponent.container'

export default class ComponentDetail extends React.Component {
  static propTypes = { app: isMap, component: isMap }

  render() {
    const { app, component } = this.props
    const appId = app.get('id')

    return(
      <article className='components-detail'>
        <header>
          <h2>Component { component.get('id') }</h2>
        </header>
        <UpdateComponent component={ component } />
        <footer>
          <ButtonLink to={ `/apps/${appId}` }>Back to app</ButtonLink>
          <ButtonLink to='/'>Back to Dashboard</ButtonLink>
        </footer>
      </article>
    )
  }
}
