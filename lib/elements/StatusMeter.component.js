import React from 'react'

const StatusMeter = ({ percentage }) =>
  <div className='status-meter'>
    <div className='status-metric' style={ { width: percentage } } />
  </div>

StatusMeter.propTypes = { percentage: React.PropTypes.string.isRequired }

export default StatusMeter
