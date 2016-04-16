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
        <div className='menu-controls'>
          <Link to='/' className='menu-logo-banner' />
          <Link to='/settings' className='menu-config-icon' />
        </div>
        <div className='menu-omnibar'>
          <Omnibar />
        </div>
      </div>
    )
  }
}
