import React from 'react'
import ActionButton from '../elements/ActionButton.component'
import Star from '../elements/Star.component'
import AppInstanceStats from '../instances/AppInstanceStats.container'
import Components from '../components/Components.container'

const App = ({ app, components, follow, newComponent }) =>
  <div className='dashboard-app'>
    <div className='dashboard-app-star'>
      <Star onClick={ follow } />
    </div>
    <div className='dashboard-app-detail'>
      <header className='app-detail-header'>
        <menu className='app-context-menu'>
          <ActionButton onClick={ newComponent } isAction={ true }>
            New Component
          </ActionButton>
        </menu>
        <AppInstanceStats app={ app } components={ components } />
      </header>
      <Components app={ app } components={ components } />
    </div>
  </div>

App.propTypes = {
  app: React.PropTypes.object.isRequired,
  components: React.PropTypes.object,
  follow: React.PropTypes.func.isRequired,
  newComponent: React.PropTypes.func.isRequired
}

export default App
