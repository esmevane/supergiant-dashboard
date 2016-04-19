import { fromJS } from 'immutable'
import { connect } from 'react-redux'
import { get as fetchApp } from '../apps/apps.actions'
import { remove, get as fetchComponent } from './components.actions'
import ComponentDetail from './ComponentDetail.component'
import { getApp, getComponent, } from '../selectors'

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

  const handleDestroy = (app, component) => event => {
    event.preventDefault()
    dispatch(remove(component.get('name'), app.get('name')))
  }

  return { fetchResources, handleDestroy }
}

export default connect(mapStateToProps, mapDispatchToProps)(ComponentDetail)
