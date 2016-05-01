import React from 'react'

const AppSection = ({ children }) =>
  <section className='app'>{ children }</section>

AppSection.propTypes = { children: React.PropTypes.node.isRequired }

export default AppSection
