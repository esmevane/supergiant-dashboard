import React from 'react'
import Header from './Header.component'
import Footer from './Footer.component'
import PageChange from '../shared/PageChange.animation'

const Main = ({ faded, location, children }) =>
  <div className='main' style={ { opacity: (faded ? 0.2 : 1) } }>
    <Header />
    <main className='dashboard'>
      <PageChange location={ location }>
        { children }
      </PageChange>
    </main>
    <Footer />
  </div>

Main.propTypes = {
  faded: React.PropTypes.bool.isRequired,
  location: React.PropTypes.object.isRequired,
  children: React.PropTypes.node.isRequired
}

export default Main
