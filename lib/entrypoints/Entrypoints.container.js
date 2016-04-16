import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { getEntrypoints } from '../selectors'
import { destroy, fetch } from '../entrypoints/entrypoints.actions'
import Entrypoints from './Entrypoints.component'

function mapStateToProps(state, props) {
  return { entrypoints: getEntrypoints(state, props) }
}

function mapDispatchToProps(dispatch, props) {
  const fetchEntrypoints = () => dispatch(fetch())
  const newEntrypoint = () => dispatch(push(`/settings/entrypoints/new`))

  const destroyEntrypoint = id => event => {
    event.preventDefault()
    dispatch(destroy(id))
  }

  return { destroyEntrypoint, fetchEntrypoints, newEntrypoint }
}

export default connect(mapStateToProps, mapDispatchToProps)(Entrypoints)
