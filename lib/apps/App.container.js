import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { createAppComponentsSelector } from '../selectors'
import App from './App.component'

function mapStateToProps(state, props) {
  let selector = createAppComponentsSelector(props.app)

  return { components: selector(state, props) }
}

function mapDispatchToProps(dispatch, props) {
  let follow = event => {
    event.preventDefault()
    dispatch(push(`/apps/${props.app.name}`))
  }

  const newComponent = event => {
    event.preventDefault()
    dispatch(push(`/apps/${props.app.name}/components/new`))
  }

  return { follow, newComponent }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
