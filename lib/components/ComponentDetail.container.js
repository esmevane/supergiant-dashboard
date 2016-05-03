import { fromJS } from 'immutable'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { get as fetchApp } from '../apps/apps.actions'
import { remove, get as fetchComponent, update } from './components.actions'
import ComponentDetail from './ComponentDetail.component'
import { getApp } from '../apps/apps.selectors'
import { getComponent } from '../selectors'

function mapStateToProps(state, props) {
  const app = getApp(state, props)
  const component = getComponent(state, props)

  return { app, component }
}

function mapDispatchToProps(dispatch, props) {
  const fetchResources = () => {
    dispatch(fetchApp(props.params.appName))
    dispatch(fetchComponent(props.params.componentName, props.params.appName))
  }

  const goToReleases = event => {
    const appRoot = `/apps/${props.params.appName}`
    const componentRoot = `/components/${props.params.componentName}`

    dispatch(push(`${appRoot}${componentRoot}/releases`))
  }

  const handleDestroy = (app, component) => event => {
    event.preventDefault()
    if (window.confirm('Are you sure you want to delete this component?')) {
      dispatch(remove(component.get('name'), app.get('name')))
    }
  }

  return { fetchResources, handleDestroy, goToReleases }
}

export default connect(mapStateToProps, mapDispatchToProps)(ComponentDetail)
