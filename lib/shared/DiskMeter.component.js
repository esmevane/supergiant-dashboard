import React from 'react'
import { floatToDataUnits } from '../shared/normalizers'

const DiskMeter = ({ usage, limit }) =>
  <span>
    <div className='status-meter with-label-right'
         title={ `${ floatToDataUnits(usage) } / ${ floatToDataUnits(limit) } used`} >
      {
        (usage && limit) && (
          <div className='status-metric'
               style={
                 { width: `${Math.round((usage / limit) * 100)}%` }
               }>
            { floatToDataUnits(usage) }
          </div>
        )
      }
    </div>
    <div className='label-right'>Disk</div>
  </span>

export default DiskMeter
