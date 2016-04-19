import React from 'react'

const RamMeter = ({ usage, limit }) =>
  <span>
    <div className='status-meter with-label-right'>
      {
        (usage && limit) && (
          <div className='status-metric warn'
               style={
                 { width: `${Math.round((usage / limit) * 100)}%` }
               }>
            { usage * 1000 } GB
          </div>
        )
      }
    </div>
    <div className='label-right'>RAM</div>
  </span>

export default RamMeter
