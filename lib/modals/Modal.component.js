import React from 'react'
import { connect } from 'react-redux'
import { hideModal } from './modals.actions'

class ModalContainer extends React.Component {
  render() {
    const classes = (this.props.hidden ? 'modal' : 'modal visible')
    const click = (event) => {
      const outsideClick = this.refs.container === event.target
      const { dispatch } = this.props

      if (outsideClick) { dispatch(hideModal()) }
    }

    return (
      <div ref='container' onClick={ click } className={ classes } >
        <div className='modal-content'>
          { this.props.component }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const modalState    = state.get('modals')
  const [ component ] = modalState.get('content').toJS()
  const hidden        = modalState.get('hidden')

  return { component, hidden }
}

export default connect(mapStateToProps)(ModalContainer)
