import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

export default class SlideChange extends React.Component {
  render() {
    return(
      <ReactCSSTransitionGroup transitionName='drop-in'
                               transitionAppear={ true }
                               transitionAppearTimeout={ 300 }
                               transitionLeaveTimeout={ 300 }
                               transitionEnterTimeout={ 300 } >
        { this.props.children }
      </ReactCSSTransitionGroup>
    )
  }
}
