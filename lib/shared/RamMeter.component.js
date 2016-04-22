import React from 'react'

function floatToDataUnits(num, floor=1) {
  let number  = parseFloat(num)
  let units   = 'KB'
  const oneKB = Math.pow(2, 10);
  const oneMB = Math.pow(2, 20);
  const oneGB = Math.pow(2, 30);
  const oneTB = Math.pow(2, 40);

  if (isNaN(number) || (number < floor)) return ''

  if (num < oneMB) {
    number = Math.round(num / oneKB * 100) / 100
  }
  else if (num >= oneMB && num < oneGB) {
    number = Math.round(num / oneMB * 100) / 100
    units = 'MB'
  }
  else if (num >= oneGB && num < oneTB) {
    number = Math.round(num / oneGB * 100) / 100
    units = 'GB'
  }
  else if (num >= oneTB) {
    number = Math.round(num / oneTB * 100) / 100
    units = 'TB'
  }

  return  `${number} ${units}`
}

const RamMeter = ({ usage, limit }) =>
  <span>
    <div className='status-meter with-label-right'
         title={ `${ floatToDataUnits(usage) } / ${ floatToDataUnits(limit) } RAM used` } >
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
    <div className='label-right'>RAM</div>
  </span>

export default RamMeter
