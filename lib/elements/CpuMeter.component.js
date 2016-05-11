import React from 'react'
import LabelRight from './LabelRight.component'
import StatusMeter from './StatusMeter.component'
import TextNote from './TextNote.component'

const CpuMeter = ({ usage, limit }) => {
  const width = Math.round((usage / Math.max(limit || 1)) * 100)

  if (limit === 0) { return <div /> }

  return(
    <span>
      <StatusMeter className='with-label-right'
                   title={ `${ usage } / ${ limit } CPUs used` }
                   detail={ `${ usage / 1000 } CPU` }
                   percentage={ `${width}%` } />
      <LabelRight>CPU</LabelRight>
      <TextNote className='row'>
        { `${ usage } used / ${ limit } CPU limit` }
      </TextNote>
    </span>
  )
}

export default CpuMeter
