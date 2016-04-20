import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

export default class FadeChange extends React.Component {
  render() {
    return(
      <ReactCSSTransitionGroup transitionName='page-change'
                               transitionAppear={ true }
                               transitionLeave={ false }
                               transitionAppearTimeout={ 300 }
                               transitionLeaveTimeout={ 300 }
                               transitionEnterTimeout={ 300 } >
        { this.props.children }
      </ReactCSSTransitionGroup>
    )
  }
}
