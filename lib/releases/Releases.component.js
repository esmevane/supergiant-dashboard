import React from 'react'
import Release from './Release.component'
import DeployButton from '../deploys/DeployButton.container'
import NotFound from '../shared/NotFound.component'

export default class Releases extends React.Component {
  static propTypes = {
    app: React.PropTypes.object,
    component: React.PropTypes.object,
    destroyCurrent: React.PropTypes.func.isRequired,
    destroyRelease: React.PropTypes.func.isRequired,
    destroyTarget: React.PropTypes.func.isRequired,
    createRelease: React.PropTypes.func.isRequired,
    fetchResources: React.PropTypes.func.isRequired,
    releases: React.PropTypes.object.isRequired
  }

  componentWillMount() { this.props.fetchResources() }

  resourcesFound() {
    const {
      app,
      component,
      createRelease,
      destroyCurrent,
      destroyRelease,
      destroyTarget,
      releases
    } = this.props
    const create = createRelease(this.props)

    return(
      <section>
        <header className='context-header'>
          <div className='context-title'>
            Releases
          </div>
          <div className='context-menu'>
            <DeployButton appName={ app.get('name') }
                          componentName={ component.get('name') } />
            <button className='with-glyph glyph-x' onClick={ create }>
              Create new release
            </button>
            <button className='with-glyph glyph-x' onClick={ destroyCurrent }>
              Delete current release
            </button>
            <button className='with-glyph glyph-x' onClick={ destroyTarget }>
              Delete target release
            </button>
          </div>
        </header>

        <div className='accordion-table'>
        {
          releases.count() === 0 && (
            <div>You don't have any releases yet.</div>
          )
        }
        {
          releases.map((release, index) => (
            <Release key={ index }
                     release={ release }
                     destroy={ destroyRelease(release.get('timestamp')) } />
          ))
        }
        </div>
      </section>
    )
  }


  render() {
    const { app, component, releases } = this.props

    if (app && component && releases) { return this.resourcesFound() }

    return <NotFound />
  }
}
