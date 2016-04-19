import React from 'react'

const CpuMeter = ({ usage, limit }) =>
  <span>
    <div className='status-meter with-label-right'>
      {
        (usage && limit) && (
          <div className='status-metric'
               style={
                 { width: `${Math.round((usage / limit) * 100)}%` }
               }>
            { usage * 1000 }
          </div>
        )
      }
    </div>
    <div className='label-right'>CPU</div>
  </span>

export default CpuMeter
