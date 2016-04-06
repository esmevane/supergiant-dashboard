import React from 'react'
import Breadcrumbs from 'react-breadcrumbs'
import Menu from './Menu.component'
import Notifications from '../notifications/NotificationBar.container'

export default class Header extends React.Component {
  render() {
    return(
      <header>
        <Menu />
        <Breadcrumbs routes={ this.props.routes }
                     params={ this.props.params } />
        <Notifications />
      </header>
    )
  }
}
