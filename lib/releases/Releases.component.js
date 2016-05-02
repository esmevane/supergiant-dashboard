import React from 'react'
import ContextHeader from '../elements/ContextHeader.component'
import ContextMenu from '../elements/ContextMenu.component'
import ContextTitle from '../elements/ContextTitle.component'
import DeployButton from '../elements/DeployButton.component'
import DestroyButton from '../elements/DestroyButton.component'
import PlusButton from '../elements/PlusButton.component'
import Release from './Release.component'
import ReleaseWelcome from './ReleaseWelcome.component'
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
        <ContextHeader>
          <ContextTitle>Releases</ContextTitle>
          <ContextMenu>
            <FadeChange>
              {
                target && target.toList().count() > 0 && (
                  <DeployButton onClick={ deploy }>
                    Deploy Changes
                  </DeployButton>
                )
              }

              {
                target && target.toList().count() === 0 && (
                  <PlusButton onClick={ create }>
                    Create a Release
                  </PlusButton>
                )
              }

              {
                target && target.toList().count() > 0 && (
                  <DestroyButton isAction={ true } onClick={ destroyTarget }>
                    Clear Changes
                  </DestroyButton>
                )
              }
            </FadeChange>
          </ContextMenu>
        </ContextHeader>

        { releases.count() === 0 && <ReleaseWelcome create={ create } /> }

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
