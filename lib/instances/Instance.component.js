import React from 'react'
import Column from '../elements/Column.component'
import Row from '../elements/Row.component'
import Resource from '../elements/Resource.component'
import CpuMeter from '../elements/CpuMeter.component'
import RamMeter from '../elements/RamMeter.component'

export default class Instance extends React.Component {
  render() {
    const { instance } = this.props
    const opacity = instance.get('status') === 'STOPPED' ? 0.5 : 1

    return(
      <span style={ { opacity } }>
        <Resource>
          <h4>{ instance.get('base_name') }</h4>
          {
            instance.get('status') === 'STOPPED' && (
              <Column size={ 12 }>Instance is not running.</Column>
            )
          }

          <Row>
            <CpuMeter usage={ instance.getIn(['cpu', 'usage']) }
                      limit={ instance.getIn(['cpu', 'limit']) } />
          </Row>

          <Row>
            <RamMeter usage={ instance.getIn(['ram', 'usage']) }
                      limit={ instance.getIn(['ram', 'limit']) } />
          </Row>
        </Resource>
      </span>
    )
  }
}
