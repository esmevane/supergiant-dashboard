import React from 'react'
import App from './App.container'
import NotFound from '../shared/NotFound.component'
import { supergiant } from '../visuals/supergiant'

export default class AppDetail extends React.Component {
  static propTypes = {
    app: React.PropTypes.object,
    deleteApp: React.PropTypes.func.isRequired,
    fetchApp: React.PropTypes.func.isRequired
  }

  componentWillMount()   { this.props.fetchApp() }
  componentDidMount()    { supergiant.start() }
  componentWillUnmount() { supergiant.stop() }

  resourcesFound() {
    const { deleteApp, app } = this.props

    return(
      <div className='app-view'>
        <header className='context-header'>
          <div className='context-title'>{ app.get('name') }</div>

          <div className='context-menu'>
            <button className='with-glyph glyph-x-action-color'
                    onClick={ deleteApp }>
              Destroy
            </button>
          </div>
        </header>
        <App app={ app } />
        <div />
      </div>
    )
  }

  render() {
    const { app } = this.props
    return app ? this.resourcesFound() : <NotFound />
  }
}
