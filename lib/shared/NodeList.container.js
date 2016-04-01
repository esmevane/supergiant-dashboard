import { connect } from 'react-redux'
import { getNodes } from '../selectors'
import NodeList from './NodeList.component'

function mapStateToProps(state) {
  let contents = getNodes(state).toList()

  return { contents }
}

export default connect(mapStateToProps)(NodeList)
