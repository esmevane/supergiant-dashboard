import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { createAppComponentsSelector } from '../selectors'
import App from './App.component'

function mapStateToProps(state, props) {
  let selector = createAppComponentsSelector(props.app)
  return { components: selector(state) }
}

function mapDispatchToProps(dispatch, props) {
  const { app } = props
  const handleFollow = name => event => {
    event.preventDefault()
    dispatch(push(`/apps/${app.get('name')}/components/${name}`))
  }

  return { handleFollow }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
