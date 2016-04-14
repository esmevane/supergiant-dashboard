import React from 'react'
import Apps from '../apps/Apps.component'
import App from '../apps/App.container'
import NodeList from '../shared/NodeList.container'

const Dashboard = ({ apps, addApp }) =>
  <section className='application-dashboard'>
    <header className='context-header'>
      <div className='context-title'>My Apps</div>
      <menu className='context-menu'>
        <button onClick={ addApp } className='with-glyph glyph-right-arrow'>New App</button>
      </menu>
    </header>
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
