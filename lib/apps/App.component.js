import React from 'react'
import AppInstanceStats from '../instances/AppInstanceStats.container'
import Components from '../components/Components.container'
import NewComponent from '../components/NewComponent.container'

export default class App extends React.Component {
  static propTypes = {
    app: React.PropTypes.object.isRequired,
    components: React.PropTypes.object,
    follow: React.PropTypes.func.isRequired
  }

  render() {
    const { app, components, follow } = this.props
    return(
      <div className='dashboard-app'>
        <div className='dashboard-app-star'>
          <figure className='star' onClick={ follow }/>
        </div>
        <div className='dashboard-app-detail'>
          <header className='app-detail-header'>
            <menu className='app-context-menu'>
              <NewComponent app={ app }/>
            </menu>
            <AppInstanceStats app={ app } components={ components } />
          </header>
          <Components app={ app } components={ components } />
        </div>
      </div>
    )
  }
}
