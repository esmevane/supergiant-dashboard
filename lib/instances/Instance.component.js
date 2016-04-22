import React from 'react'
import CpuMeter from '../shared/CpuMeter.component'
import DiskMeter from '../shared/DiskMeter.component'
import RamMeter from '../shared/RamMeter.component'

export default class Instance extends React.Component {
  render() {
    const { instance } = this.props
    const opacity = instance.get('status') === 'STOPPED' ? 0.5 : 1
    return(
      <span style={{ opacity }}>
        <li className='resource'>
          <h4>{ instance.get('base_name') }</h4>
          {
            instance.get('status') === 'STOPPED' && (
              <p className='col-12'>Instance is not running.</p>
            )
          }

          <div className='row'>
            <CpuMeter usage={ instance.getIn(['cpu', 'usage']) }
                      limit={ instance.getIn(['cpu', 'limit']) } />
          </div>

          <div className='row'>
            <RamMeter usage={ instance.getIn(['ram', 'usage']) }
                      limit={ instance.getIn(['ram', 'limit']) } />
          </div>
        </li>
      </span>
    )
  }
}
