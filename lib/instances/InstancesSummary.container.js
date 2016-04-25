import { connect } from 'react-redux'
import { increment, decrement, fetch } from './instances.actions'
import { getComponentInstances, getInstanceCount } from '../selectors'
import InstancesSummary from './InstancesSummary.component'

function mapStateToProps(state, props) {
  const { app, component } = props
  const instances = getComponentInstances(app, component)(state, props)
  const instanceNumber = getInstanceCount(state, props)

  return { instanceNumber, instances }
}

function mapDispatchToProps(dispatch, props) {
  const fetchResources = () => {
    const { app, component } = props
    dispatch(fetch(app.get('name'), component.get('name'), `current`))
    dispatch(fetch(app.get('name'), component.get('name'), `target`))
  }

  const increase = event => {
    event.preventDefault()
    dispatch(increment())
  }

  const decrease = event => {
    event.preventDefault()
    dispatch(decrement())
  }

  return { increase, decrease, fetchResources }
}

export default connect(mapStateToProps, mapDispatchToProps)(InstancesSummary)
