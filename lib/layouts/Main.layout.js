require('styles/application.scss')

import React from 'react'
import { connect } from 'react-redux'
import { isFaded } from '../selectors'
import Main from './Main.component'

class AppContainer extends React.Component {
  render() { return <Main { ...(this.props) }/> }
}

function mapStateToProps(state) {
  let faded = isFaded(state) || false
  return { faded }
}

const connector = connect(mapStateToProps)

export default connector(AppContainer)
