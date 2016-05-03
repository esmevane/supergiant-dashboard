import React from 'react'
import { floatFloorToPlaces } from '../shared/normalizers'

const getWidth = (usage, limit) =>
  Math.round((usage / Math.max(limit || 1)) * 100)

const CpuMeter = ({ usage, limit }) =>
  limit !== 0
    ? (
      <span>
        <div className='status-meter with-label-right'
             title={ `${ usage / 1000 } / ${ limit / 1000 } CPUs used`}>
          {
            (usage && limit) && (
              <div className='status-metric'
                   title={ `${ usage / 1000 } CPU` }
                   style={
                     { width: `${getWidth(usage, limit)}%` }
                   } />
            )
          }
        </div>
        <div className='label-right'>CPU</div>
        <p className='text-note row'>
          {
            floatFloorToPlaces(usage / 1000)
          } used / {
            floatFloorToPlaces(limit / 1000)
          } CPU limit
        </p>
      </span>
    )
  : <div />

export default CpuMeter
