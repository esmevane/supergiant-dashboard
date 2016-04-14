import { fromJS } from 'immutable'
import { connect } from 'react-redux'
import { deploy, remove } from './components.actions'
import Show from './Show.page'
import {
  createAppAndComponentSelector,
  getComponentContainers,
  getComponentVolumes
} from '../selectors'

function mapStateToProps(state, props) {
  const selector = createAppAndComponentSelector()
  const result = selector(state, props)
  const fauxState = fromJS({
    containers: state.get('containers'),
    volumes: state.get('volumes')
  })

  return { ...result, fauxState }
}

function mapDispatchToProps(dispatch, props) {
  const handleDeploy = (app, component, state) => event => {
    event.preventDefault()

    let containers = getComponentContainers(component)(state, props)
    let volumes = getComponentVolumes(component)(state, props)

    dispatch(
      deploy(
        component.get('name'),
        app.get('name')
      )
    )
  }

  const handleDestroy = (app, component) => event => {
    event.preventDefault()
    dispatch(remove(component.get('name'), app.get('name')))
  }

  return { handleDeploy, handleDestroy }
}

export default connect(mapStateToProps, mapDispatchToProps)(Show)
