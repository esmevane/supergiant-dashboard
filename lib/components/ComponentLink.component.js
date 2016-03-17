import React from 'react'
import { Link } from 'react-router'
import { isMap, isList } from '../shared/immutable.prop-types'

export default class ComponentLink extends React.Component {
  static propTypes = { app: isMap, component: isMap }

  render() {
    const { app, component } = this.props
    let uri = `/apps/${app.get('id')}/components/${component.get('id')}`
    return <Link to={ uri }>{ component.get('name') }</Link>
  }
}
