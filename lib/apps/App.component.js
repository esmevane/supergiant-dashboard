import React from 'react'
import Star from './Star.component'
import NewComponent from '../components/NewComponent.container'
import DraggablePlanets from '../components/DraggablePlanets.container'

const App = ({ app, components }) =>
  <div className='dashboard-app'>
    <Star name={ app.get('name') } />
    <DraggablePlanets app={ app } components={ components } />
    <div className='dashboard-controls'>
      <NewComponent appId={ app.get('name') }/>
    </div>
  </div>

App.propTypes = {
  app: React.PropTypes.object.isRequired,
  components: React.PropTypes.object.isRequired
}

export default App
