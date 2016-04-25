import React from 'react'
import Release from './Release.component'
import FadeChange from '../shared/FadeChange.animation'
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
            <FadeChange>
              {
                target && target.toList().count() > 0 && (
                  <button onClick={ deploy }
                          className='with-glyph glyph-deploy-action-color'>
                    Deploy Changes
                  </button>
                )
              }

              {
                target && target.toList().count() === 0 && (
                  <button className='with-glyph glyph-plus-action-color'
                          onClick={ create }>
                    Create a Release
                  </button>
                )
              }

              {
                target && target.toList().count() > 0 && (
                  <button className='with-glyph glyph-x-action-color'
                          onClick={ destroyTarget }>
                    Clear Changes
                  </button>
                )
              }
            </FadeChange>
          </div>
        </header>

        {
          releases.count() === 0 && (
            <article className='releases-welcome'>
              <div className='row'>
                <div className='col-3'/>

                <div className='col-3'>
                  <h3>Create your first release.</h3>
                </div>
              </div>

              <div className='row'>
                <div className='col-3'/>

                <div className='col-3'>
                  <button className='with-glyph glyph-plus-action-color'
                          onClick={ create }>
                    Create a Release
                  </button>
                </div>

                <aside className='col-3'>
                  <p className='text-note'>
                    When you are ready to deploy your Component, you need to
                    create a new Release.
                  </p>
                  <p className='text-note'>
                    Releases help you keep track of changes to your Component
                    each time you deploy it.
                  </p>
                </aside>
              </div>
            </article>
          )
        }

        <div className='accordion-table'>
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
