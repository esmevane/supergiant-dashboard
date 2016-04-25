import { connect } from 'react-redux'
import { increment, decrement, fetch } from './instances.actions'
import { getComponentInstances, getInstanceCount } from '../selectors'
import InstancesSummary from './InstancesSummary.component'

function mapStateToProps(state, props) {
  const { app, component } = props
  const instances = getComponentInstances(app, component)(state, props)
  const instanceNumber = getInstanceCount(app, component)(state, props)

  return { instanceNumber, instances }
}

function mapDispatchToProps(dispatch, props) {
  const { app, component } = props
  const fetchResources = () => {
    dispatch(fetch(app.get('name'), component.get('name'), `current`))
    dispatch(fetch(app.get('name'), component.get('name'), `target`))
  }

  const increase = event => {
    event.preventDefault()
    dispatch(increment(app.get('name'), component.get('name')))
  }

  const decrease = event => {
    event.preventDefault()
    dispatch(decrement(app.get('name'), component.get('name')))
  }

  return { increase, decrease, fetchResources }
}

export default connect(mapStateToProps, mapDispatchToProps)(InstancesSummary)
