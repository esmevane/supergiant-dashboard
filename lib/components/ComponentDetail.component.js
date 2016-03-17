import React from 'react'
import { Link } from 'react-router'
import { isMap } from '../shared/immutable.prop-types'

export default class ComponentDetail extends React.Component {
  static propTypes = { app: isMap, component: isMap }

  render() {
    const { app, component } = this.props
    console.log(component.toJS())
    return(
      <article className='components-detail'>
        <header>
          <h3>{ component.get('name') }</h3>
          <h4>{ component.get('id') }</h4>
        </header>
        <section className='components-detail-main'>
          <strong>Type:</strong> { component.get('type') }
        </section>
        <footer>
          <ul>
            <li>
              <Link to={ `/apps/${app.get('id')}` }>Back to app</Link>
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
