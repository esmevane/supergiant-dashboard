require('styles/application.scss')

import React from 'react'
import { connect } from 'react-redux'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import KeyboardControls from '../shared/KeyboardControls.wrapper'
import Header from './Header.component'
import Footer from './Footer.component'
import Modal from '../modals/Modal.component'
import PageChange from '../shared/PageChange.animation'

// In order to furnish the hot loader with the logic it needs to swap out
// components when their presentation or logic changes, you need to use this
// class syntax to extend React.Component.  Simple functions that return JSX
// don't trigger hot-swapping.
//
class Main extends React.Component {
  render() {
    const fadeStyle = { opacity: (this.props.faded ? 0.2 : 1) }

    return(
      <div>
        <div className='main' style={ fadeStyle }>
          <Header />
          <main>
            <PageChange location={ this.props.location }>
              { this.props.children }
            </PageChange>
          </main>
          <Footer />
        </div>
        <Modal />
      </div>
    )
  }
}

function mapStateToProps(state) {
  let faded = state.getIn(['layouts', 'faded'])
  return { faded }
}

const DraggableContainer = DragDropContext(HTML5Backend)(Main)
const KeyboardContainer = KeyboardControls(DraggableContainer)
export default connect(mapStateToProps)(KeyboardContainer)
