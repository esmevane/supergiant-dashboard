import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import SlideChange from '../shared/SlideChange.animation'

const Environment = process.env.NODE_ENV

export default class Menu extends React.Component {
  render() {
    const notProduction = Environment !== `production`

    return(
      <ul className='menu'>
        <SlideChange>
          <li key='home'><Link to='/'>Home</Link></li>
          {
            notProduction && (
              <li key='style'><Link to='/styleguide'>Styleguide</Link></li>
            )
          }
          {
            notProduction && (
              <li key='book'><a href='/book' target='_blank'>Handbook</a></li>
            )
          }
        </SlideChange>
      </ul>
    )
  }
}
