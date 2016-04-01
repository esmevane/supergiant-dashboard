import { connect } from 'react-redux'
import Omnibar from './Omnibar.component'

function mapStateToProps() { return { command: `Supergiant list apps` } }

export default connect(mapStateToProps)(Omnibar)
