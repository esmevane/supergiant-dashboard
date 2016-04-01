require('styles/application.scss')

import React from 'react'
import { connect } from 'react-redux'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { isFaded } from '../selectors'
import Main from './Main.component'

function mapStateToProps(state) {
  let faded = isFaded(state) || false
  return { faded }
}

const dragAndDrop = DragDropContext(HTML5Backend)
const connector = connect(mapStateToProps)

export default connector(dragAndDrop(Main))
