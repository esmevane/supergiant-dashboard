import React from 'react'
import { Link } from 'react-router'
import { isMap, isList } from '../shared/immutable.prop-types'
import ComponentLink from '../components/ComponentLink.component'

export default class AppDetail extends React.Component {
  static propTypes = { app: isMap, components: isList }

  render() {
    const { app, components } = this.props
    return(
      <article className='apps-detail'>
        <header>
          <h3>{ app.get('name') }</h3>
          <h4>{ app.get('id') }</h4>
          <Link to={ `/apps/${app.get('id')}/components/new` }>
            Add a component
          </Link>
        </header>
        <section className='apps-detail-main'>
          <ul>
            {
              components.map((component, index) => (
                <li key={ index }>
                  <ComponentLink app={ app } component={ component } />
                </li>
              ))
            }
          </ul>
        </section>
        <footer>
          <Link to='/'>Back to Dashboard</Link>
        </footer>
      </article>
    )
  }
}
