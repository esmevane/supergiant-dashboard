import { connect } from 'react-redux'
import { fetch } from './instances.actions'
import { getComponentInstances } from '../selectors'
import InstancesSummary from './InstancesSummary.component'

function mapStateToProps(state, props) {
  const { app, component } = props
  const instances = getComponentInstances(app, component)(state, props)

  return { instances }
}

function mapDispatchToProps(dispatch, props) {
  const fetchResources = () => {
    const { app, component } = props
    dispatch(fetch(app.get('name'), component.get('name'), `current`))
    dispatch(fetch(app.get('name'), component.get('name'), `target`))
  }

  return { fetchResources }
}

export default connect(mapStateToProps, mapDispatchToProps)(InstancesSummary)
