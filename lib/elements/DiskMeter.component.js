import React from 'react'
import LabelRight from './LabelRight.component'
import StatusMeter from './StatusMeter.component'
import { floatToDataUnits } from '../shared/normalizers'

const DiskMeter = ({ usage, limit }) => {
  const width = Math.round((usage / Math.max(limit || 1)) * 100)
  const usageUnits = floatToDataUnits(usage)
  const limitUnits = floatToDataUnits(limit)

  return(
    <span>
      <StatusMeter className='with-label-right'
                   title={ `${ usageUnits } / ${ limitUnits } disk used` }
                   detail={ `${ usageUnits }` }
                   percentage={ `${width}%` } />
      <LabelRight>Disk</LabelRight>
    </span>
  )
}

export default DiskMeter
