import React from 'react'
import { connect } from 'react-redux'
import { openModal } from './modals/modals.actions'

class ModalLink extends React.Component {
  handleClick = (event) => {
    event.preventDefault()

    this.props.dispatch(openModal(this.props.component))
  };

  render() {
    return(
      <a href='#' onClick={ this.handleClick }>
        { this.props.children }
      </a>
    )
  }
}

export default connect()(ModalLink)
