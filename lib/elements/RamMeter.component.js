import React from 'react'
import LabelRight from './LabelRight.component'
import StatusMeter from './StatusMeter.component'
import TextNote from './TextNote.component'
import { floatToDataUnits } from '../shared/normalizers'

const RamMeter = ({ usage, limit }) => {
  const width = Math.round((usage / Math.max(limit || 1)) * 100)
  const usageUnits = floatToDataUnits(usage)
  const limitUnits = floatToDataUnits(limit)
  const title = `${ usageUnits } / ${ limitUnits } RAM used`
  const note = `${ usageUnits || 0 } used / ${ limitUnits } RAM limit`

  if (limit === 0) { return <div /> }

  return(
    <span>
      <StatusMeter className='with-label-right'
                   title={ title }
                   percentage={ `${width}%` } />
      <LabelRight>RAM</LabelRight>
      <TextNote className='row'>
        { note }
      </TextNote>
    </span>
  )
}

export default RamMeter
