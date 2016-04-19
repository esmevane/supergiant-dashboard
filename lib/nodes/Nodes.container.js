import { connect } from 'react-redux'
import { getNodes } from '../selectors'
import { fetch } from './nodes.actions'
import Nodes from './Nodes.component'

function mapStateToProps(state, props) {
  let nodes = getNodes(state, props)

  return { nodes }
}

function mapDispatchToProps(dispatch, props) {
  let fetchResources = () => dispatch(fetch())
  return { fetchResources }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nodes)
