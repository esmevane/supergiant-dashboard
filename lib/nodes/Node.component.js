import React from 'react'
import CpuMeter from '../shared/CpuMeter.component'
import DiskMeter from '../shared/DiskMeter.component'
import RamMeter from '../shared/RamMeter.component'

const Node = ({ node }) =>
  <li className='resource' style={
    { opacity: (node.get('status') === 'READY') ? 1 : 0.5 }
  }>
    <header>
      <h4>{ node.get('class') }</h4>
      <p className='text-note'>
        ({ node.get('name') })
      </p>
      {
        node.get('status') === 'NOT_READY' && (
          <div className='col-12'>Node not active</div>
        )
      }
    </header>

    <p className='text-note'>
      <a href={ node.get('external_ip') } target='_blank'>
        Node address { node.get('external_ip') }
      </a>
    </p>

    <div className='row'>
      <CpuMeter usage={ node.getIn(['cpu', 'usage']) }
                limit={ node.getIn(['cpu', 'limit']) } />
    </div>

    <div className='row'>
      <RamMeter usage={ node.getIn(['ram', 'usage']) }
                limit={ node.getIn(['ram', 'limit']) } />
    </div>

    <div className='row' style={{ display: 'none' }}>
      <DiskMeter usage={ node.getIn(['disk', 'usage']) }
                 limit={ node.getIn(['disk', 'limit']) } />
    </div>
  </li>

Node.propTypes = { node: React.PropTypes.object.isRequired }

export default Node
