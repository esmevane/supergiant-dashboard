import { connect } from 'react-redux'
import Omnibar from './Omnibar.component'

function mapStateToProps() { return { command: `supergiant list apps` } }

export default connect(mapStateToProps)(Omnibar)
