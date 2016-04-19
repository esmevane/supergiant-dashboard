import React from 'react'
import App from './App.container'

export default class Apps extends React.Component {
  static propTypes = {
    apps: React.PropTypes.object.isRequired,
    addApp: React.PropTypes.func.isRequired,
    fetchApps: React.PropTypes.func.isRequired
  }

  componentWillMount() { this.props.fetchApps() }

  render() {
    const { apps, addApp } = this.props
    return(
      <section className='application-dashboard'>
        <header className='context-header'>
          <div className='context-title'>My Apps</div>
          <menu className='context-menu'>
            <button onClick={ addApp } className='with-glyph glyph-right-arrow'>New App</button>
          </menu>
        </header>
        <div className='dashboard-apps'>
          { apps.map((app, index) => <App key={ index } app={ app } />) }
        </div>
      </section>
    )
  }
}
