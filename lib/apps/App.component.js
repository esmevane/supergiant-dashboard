import React from 'react'
import Planets from '../components/Planets.component'
import Planet from '../components/Planet.component'
import NewComponent from '../components/NewComponent.container'

const App = ({ app, components, handleFollow }) =>
  <div className='dashboard-app'>
    <div className='dashboard-app-star'>
      <figure className='star' />
    </div>
    <div className='dashboard-app-detail'>
      <header className='app-detail-header'>
        <menu className='app-context-menu'>
          <NewComponent appName={ app.get('name') }/>
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
      <Planets>
        {
          components.map((component, index) => (
            <Planet key={ index }
                    component={ component }
                    follow={handleFollow(component.get('name'))}
                    app={ app } />
          ))
        }

      </Planets>
    </div>
  </div>

App.propTypes = {
  app: React.PropTypes.object.isRequired,
  components: React.PropTypes.object.isRequired,
  handleFollow: React.PropTypes.func.isRequired
}

export default App
