import React from 'react'
import Components from '../components/Components.container'
import NewComponent from '../components/NewComponent.container'

export default class App extends React.Component {
  static propTypes = {
    app: React.PropTypes.object.isRequired,
    components: React.PropTypes.object.isRequired
  }

  render() {
    const { app, components } = this.props
    return(
      <div className='dashboard-app'>
        <div className='dashboard-app-star'>
          <figure className='star' />
        </div>
        <div className='dashboard-app-detail'>
          <header className='app-detail-header'>
            <menu className='app-context-menu'>
              <NewComponent app={ app }/>
            </menu>
            <div className='app-detail-stat'>
              <div>{ app.get('name') }</div>
              <div className='text-note'>app-unique-name</div>
            </div>
            <div className='app-detail-stat'>
              <div>56% (21 cores)</div>
              <div className='text-note'>CPU utilization</div>
            </div>
            <div className='app-detail-stat'>
              <div>43% (5.5 GB)</div>
              <div className='text-note'>RAM utilization</div>
            </div>
          </header>
          <Components app={ app } components={ components } />
        </div>
      </div>
    )
  }
}
