import React from 'react'
import { floatToDataUnits } from '../shared/normalizers'

const getWidth = (usage, limit) =>
  Math.round((usage / Math.max(limit || 1)) * 100)

const getTitle = (usage, limit ) =>
  `${ floatToDataUnits(usage) } / ${ floatToDataUnits(limit) } RAM used`

const RamMeter = ({ usage, limit }) =>
  limit !== 0
    ? (
        <span>
          <div className='status-meter with-label-right'
               title={ getTitle(usage, limit) } >
            {
              (usage && limit) && (
                <div className='status-metric'
                     style={ { width: `${getWidth(usage, limit)}%` } } />
              )
            }
          </div>
          <div className='label-right'>RAM</div>
          <p className='text-note row'>
            { floatToDataUnits(usage || 0) } used / { floatToDataUnits(limit) } RAM limit
          </p>
        </span>
      )
    : <div />

export default RamMeter
