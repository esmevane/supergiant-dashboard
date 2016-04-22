import React from 'react'
import { floatToDataUnits } from '../shared/normalizers'

const RamMeter = ({ usage, limit }) =>
  <span>
    <div className='status-meter with-label-right'
         title={ `${ floatToDataUnits(usage) } / ${ floatToDataUnits(limit) } RAM used` } >
      {
        (usage && limit) && (
          <div className='status-metric'
               style={
                 { width: `${Math.round((usage / limit) * 100)}%` }
               } />
        )
      }
    </div>
    <div className='label-right'>RAM</div>
    <p className='text-note row'>
      { floatToDataUnits(usage || 0) } used / { floatToDataUnits(limit) } RAM limit
    </p>
  </span>

export default RamMeter
