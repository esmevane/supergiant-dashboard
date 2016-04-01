import React from 'react'
import Header from './Header.component'
import Footer from './Footer.component'
import Modal from '../modals/Modal.component'
import PageChange from '../shared/PageChange.animation'

// In order to furnish the hot loader with the logic it needs to swap out
// components when their presentation or logic changes, you need to use this
// class syntax to extend React.Component.  Simple functions that return JSX
// don't trigger hot-swapping.
//
const Main = ({ faded, location, children }) =>
  <div>
    <div className='main' style={ { opacity: (faded ? 0.2 : 1) } }>
      <Header />
      <main className='dashboard'>
        <PageChange location={ location }>
          { children }
        </PageChange>
      </main>
      <Footer />
    </div>
    <Modal />
  </div>

Main.propTypes = {
  faded: React.PropTypes.bool.isRequired,
  location: React.PropTypes.object.isRequired,
  children: React.PropTypes.node.isRequired
}

export default Main
