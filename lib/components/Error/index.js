import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import styles from './styles.module.css'
import BounceChange from 'components/BounceChange'

export default class Error extends React.Component {
  static propTypes = {
    message: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.bool
    ]),
    messages: React.PropTypes.array
  }

  render() {
    const { message, messages = [] } = this.props
    const list = [message].concat(messages).filter(message => message)

    return(
        <div className={ styles.container }>
          <ReactCSSTransitionGroup transitionName={ styles }
                                   transitionAppearTimeout={ 1000 }
                                   transitionEnterTimeout={ 1000 }
                                   transitionLeaveTimeout={ 1000 }
                                   { ...(this.props) }>
                {
                  list.map((message, index) => (
                    <div key={ index } className={ styles.message }>
                      <i className='fa fa-warning fa-fw' />
                      { message }
                    </div>
                  ))
                }
          </ReactCSSTransitionGroup>
        </div>
    )
  }
}
