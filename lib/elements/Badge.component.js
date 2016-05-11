import React from 'react'

const Badge = ({ className, tally = 0 }) =>
  tally > 0
    ? <div className={ `badge ${className}` }>{ tally }</div>
    : <div />

Badge.propTypes = {
  className: React.PropTypes.string,
  tally: React.PropTypes.number
}

export default Badge
