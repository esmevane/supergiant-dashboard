import React from 'react'
import { floatFloorToPlaces } from '../shared/normalizers'

const CpuMeter = ({ usage, limit }) =>
  <span>
    <div className='status-meter with-label-right'
         title={ `${ usage / 1000 } / ${ limit / 1000 } CPUs used`}>
      {
        (usage && limit) && (
          <div className='status-metric'
               title={ `${ usage / 1000 } CPU` }
               style={
                 { width: `${Math.round((usage / limit) * 100)}%` }
               } />
        )
      }
    </div>
    <div className='label-right'>CPU</div>
    <p className='text-note row'>
      { floatFloorToPlaces(usage / 1000) } used / { floatFloorToPlaces(limit / 1000) } CPU limit
    </p>
  </span>

export default CpuMeter
