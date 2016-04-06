import { connect } from 'react-redux'
import { createAppAndComponentSelector } from '../selectors'
import { remove } from './components.actions'
import Show from './Show.page'

function mapStateToProps(state, props) {
  const selector = createAppAndComponentSelector()
  const result = selector(state, props)

  return { ...result }
}

function mapDispatchToProps(dispatch, props) {
  const selector = createAppAndComponentSelector()

  const handleDestroy = (app, component) => event => {
    event.preventDefault()
    dispatch(remove(component.get('name'), app.get('name')))
  }

  return { handleDestroy }
}

export default connect(mapStateToProps, mapDispatchToProps)(Show)
