import React from 'react'
import CpuMeter from '../shared/CpuMeter.component'
import DiskMeter from '../shared/DiskMeter.component'
import RamMeter from '../shared/RamMeter.component'

const Node = ({ node }) =>
  <li className='resource' style={
    { opacity: (node.get('status') === 'READY') ? 1 : 0.5 }
  }>
    <header className='row'>
      <h4 className='col-10'>{ node.get('class') }</h4>
      <menu className='col-2 text-right' style={{ display: 'none' }}>
        <a href='#' className='fa-stack fa-lg'
                    onClick={ e => e.preventDefault() }
                    title='Terminate - Supergiant will automatically replace this node when terminated.'>

          <i className="fa fa-circle-o fa-stack-2x" />
          <i className="fa fa-times fa-stack-1x" />
        </a>
      </menu>
      <div className='col-12'>
        <strong>({ node.get('name') })</strong>
      </div>
      {
        node.get('status') === 'NOT_READY' && (
          <div className='col-12'>Node not active</div>
        )
      }
    </header>

    <div className='row'>
      <a href={ node.get('external_ip') } target='_blank'>
        Node address { node.get('external_ip') }
      </a>
    </div>
    <div className='row'>
      <CpuMeter usage={ node.getIn(['cpu', 'usage']) }
                limit={ node.getIn(['cpu', 'limit']) } />
    </div>

    <div className='row'>
      <RamMeter usage={ node.getIn(['ram', 'usage']) }
                limit={ node.getIn(['ram', 'limit']) } />
    </div>

    <div className='row'>
      <DiskMeter usage={ node.getIn(['disk', 'usage']) }
                 limit={ node.getIn(['disk', 'limit']) } />
    </div>
  </li>

Node.propTypes = { node: React.PropTypes.object.isRequired }

export default Node
