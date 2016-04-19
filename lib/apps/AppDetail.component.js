import React from 'react'
import App from './App.container'
import NotFound from '../shared/NotFound.component'

export default class AppDetail extends React.Component {
  static propTypes = {
    app: React.PropTypes.object,
    deleteApp: React.PropTypes.func.isRequired,
    fetchApp: React.PropTypes.func.isRequired
  }

  componentWillMount() { this.props.fetchApp() }
  resourcesFound() {
    const { deleteApp, app } = this.props

    return(
      <div className='component'>
        <header className='context-header'>
          <div className='context-menu'>
            <button className='with-glyph glyph-x-action-color' onClick={ deleteApp }>
              Destroy
            </button>
          </div>
        </header>
        <h1>{ app.get('name') }</h1>
      </div>
    )
  }

  render() {
    const { app } = this.props
    return app ? this.resourcesFound() : <NotFound />
  }
}
