import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { get as fetchApp } from '../apps/apps.actions'
import { get as fetchComponent } from '../components/components.actions'
import { create, destroy, fetch } from '../releases/releases.actions'
import Releases from './Releases.component'
import {
  createContainerSelector,
  createAppAndComponentSelector,
  createVolumeSelector,
  getReleases
} from '../selectors'

function mapStateToProps(state, props) {
  let selector = createAppAndComponentSelector()
  let releases = getReleases(state, props)
  let { app, component } = selector(state, props)
  let containers = createContainerSelector(component)(state, props)
  let volumes = createVolumeSelector(component)(state, props)

  return { releases, app, component, containers, volumes }
}

function mapDispatchToProps(dispatch, props) {
  const createRelease = resources => event => {
    const { volumes, containers } = resources
    const params = {
      instance_count: 1,
      termination_grace_period: 10,
      volumes: (volumes && volumes.toJS()) || [],
      containers: (containers && containers.toJS()) || []
    }

    event.preventDefault()
    dispatch(create(params, props.params.appName, props.params.componentName))
  }

  const destroyRelease = id => event => {
    event.preventDefault()

    if (window.confirm("Are you sure you want to destroy this release?")) {
      dispatch(destroy(id, props.params.appName, props.params.componentName))
    }
  }

  const fetchResources = () => {
    dispatch(fetchApp(props.params.appName))
    dispatch(fetchComponent(props.params.componentName, props.params.appName))
    dispatch(fetch(props.params.appName, props.params.componentName))
  }

  return {
    createRelease,
    destroyCurrent: destroyRelease(`current`),
    destroyRelease,
    destroyTarget: destroyRelease(`target`),
    fetchResources
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Releases)
