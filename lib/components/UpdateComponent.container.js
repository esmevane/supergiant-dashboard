import React from 'react'
import { connect } from 'react-redux'
import { update } from './components.actions'
import ComponentState from './ComponentState.component'

function mapStateToProps(state, props) {
  return {}
}

function mapDispatchToProps(dispatch, props) {
  return { submit: (id, params) => dispatch(update(id, params)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(ComponentState)
