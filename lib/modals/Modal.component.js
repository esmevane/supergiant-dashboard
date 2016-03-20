import React from 'react'
import { connect } from 'react-redux'
import { hide } from './modals.actions'
import { getModalContent, isHidden } from '../selectors'

class ModalContainer extends React.Component {
  render() {
    const { component, hidden, dispatch } = this.props
    const classes = (hidden ? 'modal' : 'modal visible')

    const click = (event) => {
      if (this.refs.container === event.target) { dispatch(hide()) }
    }

    return (
      <div ref='container' onClick={ click } className={ classes } >
        <div className='modal-content'> { component } </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const [ component ] = getModalContent(state).toJS()
  const hidden        = isHidden(state)

  return { component, hidden }
}

export default connect(mapStateToProps)(ModalContainer)
