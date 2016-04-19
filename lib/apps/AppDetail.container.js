import { connect } from 'react-redux'
import { destroy, get } from './apps.actions'
import { getApp } from '../selectors'
import AppDetail from './AppDetail.component'

function mapStateToProps(state, props) {
  return { app: getApp(state, props) }
}

function mapDispatchToProps(dispatch, props) {
  const fetchApp = () => dispatch(get(props.params.appName))
  const deleteApp = () => dispatch(destroy(props.params.appName))

  return { deleteApp, fetchApp }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppDetail)
