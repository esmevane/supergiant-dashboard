import React from 'react'

const WelcomeMessage = ({ children }) =>
  <div className='welcome-message'>{ children }</div>

WelcomeMessage.propTypes = { children: React.PropTypes.node.isRequired }

export default WelcomeMessage
