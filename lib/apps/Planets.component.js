import React from 'react'

const Planets = ({ children }) =>
  <div className='dashboard-list'>
    { children }
  </div>

Planets.propTypes = { children: React.PropTypes.node }

export default Planets
