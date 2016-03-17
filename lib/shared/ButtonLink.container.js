import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

class ButtonLink extends React.Component {
  render() {
    const { children, to, handleClick, ...rest } = this.props
    const onClick = handleClick(to)

    return <button { ...rest } onClick={ onClick }>{ children }</button>
  }
}

function mapStateToProps() { return {} }

function mapDispatchToProps(dispatch) {
  const handleClick = (destination) => {
    return (event) => {
      event.preventDefault()

      dispatch(push(destination))
    }
  }

  return { handleClick }
}

export default connect(mapStateToProps, mapDispatchToProps)(ButtonLink)
