import React from 'react'
import Apps from '../apps/Apps.component'
import App from '../apps/App.container'
import NodeList from '../shared/NodeList.container'

const Dashboard = ({ apps, addApp }) =>
  <section className='dashboard'>
    <button onClick={ addApp }>Create an app</button>
    <Apps>
      { apps.map((app, index) => <App key={ index } app={ app } />) }
    </Apps>
    <NodeList />
  </section>

Dashboard.propTypes = {
  apps: React.PropTypes.object.isRequired,
  addApp: React.PropTypes.func.isRequired
}

export default Dashboard
