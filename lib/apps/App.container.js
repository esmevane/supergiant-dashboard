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
    dispatch(push(`apps/${props.app.get('name')}`))
  }

  return { follow }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
