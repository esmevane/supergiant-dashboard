import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import Omnibar from './Omnibar.container'
import SlideChange from '../shared/SlideChange.animation'

const Environment = process.env.NODE_ENV

export default class Menu extends React.Component {
  render() {
    const notProduction = Environment !== `production`

    return(
      <div className='application-menu'>
        <nav className='menu-controls'>
          <Link to='/' className='menu-icon app-logo' title='Dashboard' />
          <Link to='/settings' className='menu-icon settings-icon' title='Settings' />
          <Link to='/nodes' className='menu-icon node-icon' title='Nodes' />
        </nav>
        <div className='menu-omnibar'>
          <Omnibar />
        </div>
      </div>
    )
  }
}
