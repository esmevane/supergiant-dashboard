import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { Link } from 'react-router'
import { connect } from 'react-redux'

const Environment = process.env.NODE_ENV

class Menu extends React.Component {
  render() {
    const notProduction = Environment !== `production`

    return(
      <ul className='menu'>
        <ReactCSSTransitionGroup transitionName='drop-in'
                                 transitionAppear={ true }
                                 transitionAppearTimeout={ 300 }
                                 transitionLeaveTimeout={ 300 }
                                 transitionEnterTimeout={ 300 } >
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
        </ReactCSSTransitionGroup>
      </ul>
    )
  }
}

function mapStateToProps(state) {
  const keypath  = [`tokens`, `contents`]
  const loggedIn = state.getIn(keypath)

  return { loggedIn }
}

export default connect(mapStateToProps)(Menu)
