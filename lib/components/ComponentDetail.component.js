import React from 'react'
import { Link } from 'react-router'
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
    const { app, component, handleDeploy, handleDestroy } = this.props
    const destroy = handleDestroy(app, component)
    const appRoot = `/apps/${app.get('name')}`
    const componentRoot = `/components/${component.get('name')}`

    return(
      <div className='component'>
        <header className='context-header'>
          <div className='context-title'>{ component.get('name') }</div>

          <div className='context-menu'>
            <ReleasesDiff app={ app } component={ component } />

            <button className='with-glyph glyph-x-action-color'
                    onClick={ destroy }>
              Destroy
            </button>
          </div>
        </header>

        <div className='context-overview'>
          <InstancesSummary app={ app } component={ component } />
          <ReleaseSummary app={ app } component={ component } />
          <div className='status' />
          <InstancesStatus app={ app } component={ component } />
        </div>

        <div className='component-detail-resources'>
          <Containers component={ component } app={ app } />
          <Volumes component={ component } app={ app } />
        </div>

        <Instances component={ component } app={ app } />
      </div>
    )
  }

  render() {
    const { app, component } = this.props

    return app && component ? this.resourcesFound() : <NotFound />
  }
}
