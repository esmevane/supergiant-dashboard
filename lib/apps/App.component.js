import React from 'react'
import Star from './Star.component'
import Planets from '../components/Planets.component'
import Planet from '../components/Planet.component'
import NewComponent from '../components/NewComponent.container'

const App = ({ app, components, handleFollow }) =>
  <div className='dashboard-app'>
    <Star name={ app.get('name') } />
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
    <div className='dashboard-controls'>
      <NewComponent appName={ app.get('name') }/>
    </div>
  </div>

App.propTypes = {
  app: React.PropTypes.object.isRequired,
  components: React.PropTypes.object.isRequired,
  handleFollow: React.PropTypes.func.isRequired
}

export default App
