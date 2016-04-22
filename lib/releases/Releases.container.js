import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { get as fetchApp } from '../apps/apps.actions'
import { get as fetchComponent } from '../components/components.actions'
import { create as createDeploy } from '../deploys/deploys.actions'
import {
  create,
  destroy,
  fetch,
  getTarget,
  getCurrent
} from './releases.actions'
import Releases from './Releases.component'
import {
  createTargetSelector,
  createCurrentSelector,
  createContainerSelector,
  createAppAndComponentSelector,
  createVolumeSelector,
  getReleases
} from '../selectors'

function mapStateToProps(state, props) {
  const { appName, componentName } = props.params
  const selector = createAppAndComponentSelector()
  const releases = getReleases(state, props)
  const { app, component } = selector(state, props)
  const containers = createContainerSelector(component)(state, props)
  const volumes = createVolumeSelector(component)(state, props)
  const selectCurrent = createCurrentSelector(appName, componentName)
  const selectTarget = createTargetSelector(appName, componentName)
  const current = selectCurrent(state, props)
  const target = selectTarget(state, props)

  return { releases, app, component, containers, volumes, target, current }
}

function mapDispatchToProps(dispatch, props) {
  const { appName, componentName } = props.params
  const deploy = () => dispatch(createDeploy(appName, componentName))

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
    const { appName, componentName } = props.params
    dispatch(fetchApp(appName))
    dispatch(fetchComponent(componentName, appName))
    dispatch(fetch(appName, componentName))
    dispatch(getTarget(appName, componentName))
    dispatch(getCurrent(appName, componentName))
  }

  return {
    deploy,
    createRelease,
    destroyCurrent: destroyRelease(`current`),
    destroyRelease,
    destroyTarget: destroyRelease(`target`),
    fetchResources
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Releases)
