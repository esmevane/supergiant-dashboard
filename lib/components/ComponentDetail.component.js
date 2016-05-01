import React from 'react'
import ActionButton from '../elements/ActionButton.component'
import Column from '../elements/Column.component'
import ContextHeader from '../elements/ContextHeader.component'
import ContextMenu from '../elements/ContextMenu.component'
import ContextOverview from '../elements/ContextOverview.component'
import ContextTitle from '../elements/ContextTitle.component'
import DestroyButton from '../elements/DestroyButton.component'
import InlineTextNote from '../elements/InlineTextNote.component'
import ComponentDetailResources from './ComponentDetailResources.component'
import ReleasesDiff from '../releases/ReleasesDiff.container'
import ReleaseSummary from '../releases/ReleaseSummary.container'
import InstancesSummary from '../instances/InstancesSummary.container'
import InstancesStatus from '../instances/InstancesStatus.container'
import Instances from '../instances/Instances.container'
import Containers from '../containers/Containers.container'
import Volumes from '../volumes/Volumes.container'
import NotFound from '../shared/NotFound.component'
import { BackgroundPlanet } from '../visuals/backgroundPlanet'

export default class ComponentDetail extends React.Component {
  static propTypes = {
    app: React.PropTypes.object,
    component: React.PropTypes.object,
    fetchResources: React.PropTypes.func.isRequired,
    handleDestroy: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)

    this.state = { color: '#ff0000' }
  }

  componentWillMount() {
    this.props.fetchResources()

    if (this.props.component) {
      this.setState({ color: this.props.component.get('color') })
    }

    this.backgroundCanvas = new BackgroundPlanet(this.state.color)
  }

  componentWillReceiveProps(newProps) {
    if (this.props.component !== newProps.component) {
      let color = newProps.component.get('color')
      this.setState({ color })

      this.backgroundCanvas.stop()
      this.backgroundCanvas = new BackgroundPlanet(color)
      this.backgroundCanvas.start()
    }
  }

  componentDidMount() { this.backgroundCanvas.start() }
  componentWillUnmount() { this.backgroundCanvas.stop() }

  resourcesFound() {
    const {
      app,
      component,
      goToReleases,
      handleDeploy,
      handleDestroy
    } = this.props

    const destroy = handleDestroy(app, component)

    return(
      <div className='component'>
        <ContextHeader>
          <ContextTitle>
            {
              component.get('tags').get('name')
            } <InlineTextNote>({ component.get('name') })</InlineTextNote>
          </ContextTitle>

          <ContextMenu>
            <ReleasesDiff app={ app } component={ component } />

            <DestroyButton onClick={ destroy } isAction={ true }>
              Destroy
            </DestroyButton>

            <ActionButton onClick={ goToReleases } isAction={ true }>
              Releases
            </ActionButton>
          </ContextMenu>
        </ContextHeader>

        <ContextOverview>
          <InstancesSummary app={ app } component={ component } />
          <ReleaseSummary app={ app } component={ component } />
          <Column size={ 1 } />
          <InstancesStatus app={ app } component={ component } />
        </ContextOverview>

        <ComponentDetailResources>
          <Containers component={ component } app={ app } />
          <Volumes component={ component } app={ app } />
        </ComponentDetailResources>

        <Instances component={ component } app={ app } />
      </div>
    )
  }

  render() {
    const { app, component } = this.props

    return app && component ? this.resourcesFound() : <NotFound />
  }
}
