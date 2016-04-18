import { connect } from 'react-redux'
import { fetch } from './components.actions'
import Components from './Components.component'

function mapStateToProps(state, props) { return {} }

function mapDispatchToProps(dispatch, props) {
  let fetchComponents = () => {
    let { app } = props
    dispatch(fetch(app.get('name')))
  }

  return { fetchComponents }
}

export default connect(mapStateToProps, mapDispatchToProps)(Components)
