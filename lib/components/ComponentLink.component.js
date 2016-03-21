import React from 'react'
import { Link } from 'react-router'
import { hexToRGBA } from './components.behavior'
import { isMap, isList } from '../shared/immutable.prop-types'

export default class ComponentLink extends React.Component {
  static propTypes = { app: isMap, component: isMap }

  render() {
    const { app, component } = this.props
    const backgroundColor = hexToRGBA(component.get('color'))
    let uri = `/apps/${app.get('id')}/components/${component.get('id')}`

    return(
      <Link className='component-link' to={ uri }>
        { component.get('name') }
        <span className='component-color-dot' style={ { backgroundColor } } />
      </Link>
    )
  }
}
