import React from 'react'
import FeedbackInput from '../shared/FeedbackInput.component'

const SelectMinMax = ({ min, max }) =>
  <div className='select-min-max table-row'>
    <div className='col-5'>
      <label>
        Min
        <FeedbackInput prompt="min" type='number' value={ min } className='easy'/>
      </label>
    </div>
    <div className='col-5'>
      <label>
        Max
        <FeedbackInput prompt="max"
                       type='number'
                       value={ max } className='easy' />
      </label>
    </div>
  </div>

export default SelectMinMax
