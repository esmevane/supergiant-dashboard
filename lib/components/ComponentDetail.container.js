import { fromJS } from 'immutable'
import { connect } from 'react-redux'
import { get as fetchApp } from '../apps/apps.actions'
import { deploy, remove, get as fetchComponent } from './components.actions'
import ComponentDetail from './ComponentDetail.component'
import {
  getApp,
  getComponent,
  getComponentContainers,
  getComponentVolumes
} from '../selectors'

function mapStateToProps(state, props) {
  const app = getApp(state, props)
  const component = getComponent(state, props)
  const fauxState = fromJS({
    containers: state.get('containers'),
    volumes: state.get('volumes')
  })

  return { app, component, fauxState }
}

function mapDispatchToProps(dispatch, props) {
  const fetchResources = () => {
    dispatch(fetchApp(props.params.appName))
    dispatch(fetchComponent(props.params.componentName, props.params.appName))
  }

  const handleDeploy = (app, component, state) => event => {
    event.preventDefault()

    let containers = getComponentContainers(component)(state, props)
    let volumes = getComponentVolumes(component)(state, props)

    dispatch(
      deploy(
        component.get('name'),
        app.get('name'),
        volumes.toJS(),
        containers.toJS()
      )
    )
  }

  const handleDestroy = (app, component) => event => {
    event.preventDefault()
    dispatch(remove(component.get('name'), app.get('name')))
  }

  return { fetchResources, handleDeploy, handleDestroy }
}

export default connect(mapStateToProps, mapDispatchToProps)(ComponentDetail)
