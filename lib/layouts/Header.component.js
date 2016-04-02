import React from 'react'
import Menu from './Menu.component'
import Notifications from '../notifications/NotificationBar.container'

export default class Header extends React.Component {
  render() { return <header> <Menu /> <Notifications /> </header> }
}
