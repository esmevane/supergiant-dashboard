import React from 'react'

const AppSection = ({ children, className = `` }) =>
  <section className={ `app ${className}` }>
    { children }
  </section>

AppSection.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string
}

export default AppSection
