import React from 'react'

const WelcomeMessage = ({ className = ``, children }) =>
  <div className={ `welcome-message ${className}` }>
    { children }
  </div>

WelcomeMessage.propTypes = {
  className: React.PropTypes.string,
  children: React.PropTypes.node
}

export default WelcomeMessage
