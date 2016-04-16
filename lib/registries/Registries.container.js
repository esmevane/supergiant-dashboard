import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { getRegistries } from '../selectors'
import { destroy, fetch } from '../registries/registries.actions'
import Registries from './Registries.component'

function mapStateToProps(state, props) {
  return { registries: getRegistries(state, props) }
}

function mapDispatchToProps(dispatch, props) {
  const fetchRegistries = () => dispatch(fetch())
  const newRegistry = () =>
    dispatch(push(`/settings/registries/dockerhub/repos/new`))

  const destroyRegistry = id => event => {
    event.preventDefault()
    dispatch(destroy(id))
  }

  return { destroyRegistry, fetchRegistries, newRegistry }
}

export default connect(mapStateToProps, mapDispatchToProps)(Registries)
