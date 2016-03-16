import React from 'react'
import { Link } from 'react-router'

export default class AppLink extends React.Component {
  render() {
    const { app } = this.props
    return(
      <Link to={ `/apps/${app.get('id')}` }>
        { app.get('name') }
      </Link>
    )
  }
}
