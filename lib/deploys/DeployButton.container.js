import { connect } from 'react-redux'
import { create } from './deploys.actions'
import DeployButton from './DeployButton.component'

function mapStateToProps(state, props) { return {} }
function mapDispatchToProps(dispatch, props) {
  const { appName, componentName } = props
  const deploy = () =>
    dispatch(create(appName, componentName))

  return { deploy }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeployButton)
