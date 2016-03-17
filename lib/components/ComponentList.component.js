import React from 'react'
import ButtonLink from '../shared/ButtonLink.container'
import { isMap } from '../shared/immutable.prop-types'

export default class ComponentList extends React.Component {
  static propTypes = {
    app: isMap,
    children: React.PropTypes.node.isRequired
  }

  render() {
    const { app } = this.props
    const appId = app.get('id')

    return(
      <section className='components-list'>
        <header>
          <h3>Components</h3>
        </header>
        <section className='components-list-content'>
          { this.props.children }
        </section>
        <footer>
          <ButtonLink ref='button' to={ `/apps/${appId}/components/new` } >
            Create a component
          </ButtonLink>
        </footer>
      </section>
    )
  }
}
