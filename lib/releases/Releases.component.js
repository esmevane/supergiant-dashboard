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
            <button className='with-glyph glyph-right-arrow-action-color' onClick={ create }>
              Create new release
            </button>
            <button className='with-glyph glyph-x-action-color' onClick={ destroyCurrent }>
              Delete current release
            </button>
            <button className='with-glyph glyph-x-action-color' onClick={ destroyTarget }>
              Delete target release
            </button>
          </div>
        </header>

        <div className='context-overview'>
          <div className='detail'>
            <h3>May 13, 2016 15:32</h3>
            <p><a href='#'>view release configuration</a></p>
          </div>

          <div className='status'/>

          <div className='summary'>
            <div className='notice active'>
              <h3 className='with-icon icon-deploy active'>
                This Release is deploying.
              </h3>
            </div>
            <div className='notice alert'>
              <h3>This Release has a problem.</h3>
              <p>Problem details.</p>
            </div>
            <div className='notice warn'>
              <h3>This Release is warning you, mister.</h3>
              <p>Warnaing details.</p>
            </div>
            <div className='notice'>
              <h3>This Release has a default notice.</h3>
              <p>We're all fine here now, thank you. How are you? </p>
            </div>
            <div className='notice success'>
              <h3 className='with-icon icon-deploy'>
                This Release is running.
              </h3>
            </div>
          </div>
        </div>

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
