import React from 'react'
import { connect } from 'react-redux'
import { hideModal } from '../actions'

class ModalContainer extends React.Component {
  handleClick = (event) => {
    if (event.target === this.refs.container) {
      this.props.dispatch(hideModal())
    }
  };

  render() {
    let classes = (this.props.hidden ? '' : 'visible')
    return (
      <div ref='container'
           onClick={ this.handleClick }
           className={ `modal ${classes}` } >
        <div className='modal-content'>
          { this.props.component }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  let [component] = state.getIn(['modals', 'content']).toJS()
  let hidden      = state.getIn(['modals', 'hidden'])
  return { component, hidden }
}

export default connect(mapStateToProps)(ModalContainer)
