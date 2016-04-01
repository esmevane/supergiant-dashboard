import { connect } from 'react-redux'
import { createAppComponentsSelector } from '../selectors'
import App from './App.component'

function mapStateToProps(state, props) {
  let selector = createAppComponentsSelector(props.app)
  return { components: selector(state) }
}

export default connect(mapStateToProps)(App)
