import React from 'react'
import { hexToRGBA } from './components.behavior'
import { isMap } from '../shared/immutable.prop-types'
import ButtonLink from '../shared/ButtonLink.container'

export default class ComponentDetail extends React.Component {
  static propTypes = { app: isMap, component: isMap }

  render() {
    const { app, component } = this.props
    const appId = app.get('id')
    const backgroundColor = hexToRGBA(component.get('color'))

    return(
      <article className='components-detail'>
        <header>
          <h3 style={ { borderBottom: `3px solid ${backgroundColor}` } }>
            { component.get('name') }
            <span className='component-color-dot'
                  style={ { backgroundColor } } />
          </h3>
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
