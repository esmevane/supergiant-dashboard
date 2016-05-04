import React from 'react'

const Badge = ({ tally }) =>
  tally > 0
    ? <div className='badge'>{ tally }</div>
    : <div />

Badge.propTypes = { tally: React.PropTypes.number.isRequired }

export default Badge
