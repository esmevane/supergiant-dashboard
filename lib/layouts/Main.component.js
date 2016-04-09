import React from 'react'
import Header from './Header.component'
import Footer from './Footer.component'
import NotFound from '../shared/NotFound.page'
import PageChange from '../shared/PageChange.animation'

export default class Main extends React.Component {
  static propTypes = {
    faded: React.PropTypes.bool.isRequired,
    location: React.PropTypes.object.isRequired,
    children: React.PropTypes.node
  }

  render() {
    const { faded, location, children } = this.props
    return(
      <div className='main' style={ { opacity: (faded ? 0.2 : 1) } }>
        <Header { ...(this.props) } />
        <main className='application-dashboard'>
          <PageChange location={ location }>
            { children ? children : <NotFound /> }
          </PageChange>
        </main>
        <Footer />
      </div>
    )
  }
}
