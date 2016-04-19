import { connect } from 'react-redux'
import { getTarget, getCurrent } from './releases.actions'
import { createTargetSelector, createCurrentSelector } from '../selectors'
import ReleaseSummary from './ReleaseSummary.component'

function mapStateToProps(state, props) {
  const { app, component } = props
  const appRoot = `/apps/${app.get('name')}`
  const componentRoot = `/components/${component.get('name')}`
  const releasesUri = `${appRoot}${componentRoot}/releases`

  const selectCurrent = createCurrentSelector(app, component)
  const selectTarget = createTargetSelector(app, component)
  const current = selectCurrent(state, props)
  const target = selectTarget(state, props)

  return { current, releasesUri, target }
}

function mapDispatchToProps(dispatch, props) {
  const fetchResources = () => {
    const { app, component } = props
    dispatch(getTarget(app.get('name'), component.get('name')))
    dispatch(getCurrent(app.get('name'), component.get('name')))
  }

  return { fetchResources }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReleaseSummary)
