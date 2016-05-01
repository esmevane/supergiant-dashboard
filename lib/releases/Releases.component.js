import React from 'react'
import ActionButton from '../elements/ActionButton.component'
import Aside from '../elements/Aside.component'
import Column from '../elements/Column.component'
import ContextHeader from '../elements/ContextHeader.component'
import ContextMenu from '../elements/ContextMenu.component'
import ContextTitle from '../elements/ContextTitle.component'
import DeployButton from '../elements/DeployButton.component'
import DestroyButton from '../elements/DestroyButton.component'
import PlusButton from '../elements/PlusButton.component'
import Row from '../elements/Row.component'
import TextNote from '../elements/TextNote.component'
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

        {
          releases.count() === 0 && (
            <article className='releases-welcome'>
              <Row>
                <Column size={ 3 } />

                <Column size={ 3 }>
                  <h3>Create your first release.</h3>
                </Column>
              </Row>

              <Row>
                <Column size={ 3 } />

                <Column size={ 3 }>
                  <ActionButton isAction={ true } onClick={ create }>
                    Create a Release
                  </ActionButton>
                </Column>

                <Aside size={ 3 }>
                  <TextNote>
                    When you are ready to deploy your Component, you need to
                    create a new Release.
                  </TextNote>
                  <TextNote>
                    Releases help you keep track of changes to your Component
                    each time you deploy it.
                  </TextNote>
                </Aside>
              </Row>
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
