import { connect } from 'react-redux'
import { destroy, invalidate } from './apps.actions'
import { getApp } from './apps.selectors'
import AppDetail from './AppDetail.component'

function mapStateToProps(state, props) {
  return { app: getApp(state, props) }
}

function mapDispatchToProps(dispatch, props) {
  const invalidateCache = () => dispatch(invalidate(props.params.appName))
  const deleteApp = event => {
    event.preventDefault()

    if (window.confirm('Are you sure you want to delete this app?')) {
      dispatch(destroy(props.params.appName))
    }
  }

  return { deleteApp, invalidateCache }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppDetail)
