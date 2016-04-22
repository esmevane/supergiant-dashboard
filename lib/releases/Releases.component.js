import React from 'react'
import Release from './Release.component'
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
      deploy,
      target,
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

            {
              target && (
                <button onClick={ deploy }
                        className='with-glyph glyph-deploy-action-color'>
                  Deploy
                </button>
              )
            }

            {
              !target && (
                <button className='with-glyph glyph-right-arrow-action-color'
                        onClick={ create }>
                  Prepare a deploy
                </button>
              )
            }

            <button className='with-glyph glyph-x-action-color'
                    onClick={ destroyTarget }>
              Clear deploy queue
            </button>
          </div>
        </header>

        <div className='accordion-table'>
        {
          releases.count() === 0 && (
            <p className='text-note'>You don't have any releases yet.</p>
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
