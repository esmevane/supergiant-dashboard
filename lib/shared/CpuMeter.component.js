import React from 'react'

const CpuMeter = ({ usage, limit }) =>
  <span>
    <div className='status-meter with-label-right'
         title={ `${ usage / 1000 } / ${ limit / 1000 } CPUs used`}

    >
      {
        (usage && limit) && (
          <div className='status-metric'
               title={ `${ usage / 1000 } CPU` }
               style={
                 { width: `${Math.round((usage / limit) * 100)}%` }
               }>
            { usage / 1000 }
          </div>
        )
      }
    </div>
    <div className='label-right'>CPU</div>
  </span>

export default CpuMeter
