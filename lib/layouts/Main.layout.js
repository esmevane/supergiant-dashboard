require('styles/application.scss')

import React from 'react'
import { connect } from 'react-redux'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import KeyboardControls from '../shared/KeyboardControls.wrapper'
import { isFaded } from '../selectors'
import Main from './Main.component'

function mapStateToProps(state) {
  let faded = isFaded(state)
  return { faded }
}

const dragAndDrop = DragDropContext(HTML5Backend)
const hasKeyboard = KeyboardControls(dragAndDrop(Main))

export default connect(mapStateToProps)(hasKeyboard)
