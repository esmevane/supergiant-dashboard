import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { createAppAndComponentSelector, getReleases } from '../selectors'
import { destroy, fetch } from '../releases/releases.actions'
import Releases from './Releases.component'

function mapStateToProps(state, props) {
  let selector = createAppAndComponentSelector()
  let releases = getReleases(state, props)
  let { app, component } = selector(state, props)

  return { releases, app, component }
}

function mapDispatchToProps(dispatch, props) {
  const fetchReleases = () =>
    dispatch(fetch(props.params.appName, props.params.componentName))

  const destroyRelease = id => event => {
    event.preventDefault()
    dispatch(destroy(props.params.appName, props.params.componentName, id))
  }

  return { destroyRelease, fetchReleases }
}

export default connect(mapStateToProps, mapDispatchToProps)(Releases)
