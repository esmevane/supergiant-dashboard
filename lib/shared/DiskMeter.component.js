import React from 'react'

const DiskMeter = ({ usage, limit }) =>
  <span>
    <div className='status-meter with-label-right'>
      {
        (usage && limit) && (
          <div className='status-metric alert'
               style={
                 { width: `${Math.round((usage / limit) * 100)}%` }
               }>
            { usage / 1000 } GB
          </div>
        )
      }
    </div>
    <div className='label-right'>Disk</div>
  </span>

export default DiskMeter
