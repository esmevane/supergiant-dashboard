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
            <button onClick={ addApp } className='with-glyph glyph-right-arrow-action-color'>
              New App
            </button>
          </menu>
        </header>

        <div className='dashboard-apps'>
          {
            apps.count() < 1 && (
              <div className='welcome-message'>
                <h1>Welcome to Supergiant.</h1>

                <p className='text-note'>
                  This is your datacenter dashboard that makes it easy for you
                  to manage stateful, distributed apps at any scale.
                </p>

                <br />

                <p className='text-note'>
                  It appears you don't have any apps,<br />
                  so let's get started.
                </p>

                <div>
                  <button onClick={ addApp } className='with-glyph glyph-right-arrow'>Create My First App</button>
                </div>
              </div>
            )
          }

          { apps.map((app, index) => <App key={ index } app={ app } />) }
        </div>
      </section>
    )
  }
}
