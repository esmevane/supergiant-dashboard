import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import styles from './styles.module.css'

export default class FlipChange extends React.Component {
  static propTypes = { children: React.PropTypes.node.isRequired }
  render() {
    const { children } = this.props
    return(
      <ReactCSSTransitionGroup transitionName={ styles }
                               transitionAppearTimeout={ 1000 }
                               transitionEnterTimeout={ 1000 }
                               transitionLeaveTimeout={ 1000 }
                               { ...(this.props) }>
        { children }
      </ReactCSSTransitionGroup>
    )
  }
}
