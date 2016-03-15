require('styles/application.scss')

import React from 'react'
import { connect } from 'react-redux'
import KeyboardControls from './components/KeyboardControls'
import Header from './components/Header'
import Footer from './components/Footer'
import Modal from './components/Modal'
import PageChange from './components/PageChange'

// In order to furnish the hot loader with the logic it needs to swap out
// components when their presentation or logic changes, you need to use this
// class syntax to extend React.Component.  Simple functions that return JSX
// don't trigger hot-swapping.
//
class App extends React.Component {
  render() {
    const fadeStyle = { opacity: (this.props.faded ? 0.2 : 1) }

    return(
      <div>
        <div className='modal-fades' style={ fadeStyle }>
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
  let faded = state.getIn(['dashboards', 'faded'])
  return { faded }
}

const KeyboardContainer = KeyboardControls(App)
export default connect(mapStateToProps)(KeyboardContainer)
