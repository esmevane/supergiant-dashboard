import React from 'react'

const DeployButton = ({ deploy }) =>
  <button onClick={ deploy }>Deploy target release</button>

DeployButton.propTypes = {
  appName: React.PropTypes.string.isRequired,
  componentName: React.PropTypes.string.isRequired,
  deploy: React.PropTypes.func.isRequired
}

export default DeployButton
