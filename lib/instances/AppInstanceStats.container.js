import { connect } from 'react-redux'
import { getAppInstances } from '../selectors'
import { fetch } from './instances.actions'
import AppInstanceStats from './AppInstanceStats.component'

function mapStateToProps(state, props) {
  const { app } = props
  const instances = getAppInstances(app)(state, props)

  return { instances }
}

function mapDispatchToProps(dispatch, props) {
  const { app, components } = props
  const fetchResources = () => {
    components.forEach(component => {
      dispatch(fetch(app.get('name'), component.get('name'), `current`))
    })
  }

  return { fetchResources }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppInstanceStats)
