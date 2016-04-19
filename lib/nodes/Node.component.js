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
            { usage * 1000 } GB
          </div>
        )
      }
    </div>
    <div className='label-right'>Disk</div>
  </span>

const RamMeter = ({ usage, limit }) =>
  <span>
    <div className='status-meter with-label-right'>
      {
        (usage && limit) && (
          <div className='status-metric warn'
               style={
                 { width: `${Math.round((usage / limit) * 100)}%` }
               }>
            { usage * 1000 } GB
          </div>
        )
      }
    </div>
    <div className='label-right'>RAM</div>
  </span>

const CpuMeter = ({ usage, limit }) =>
  <span>
    <div className='status-meter with-label-right'>
      {
        (usage && limit) && (
          <div className='status-metric'
               style={
                 { width: `${Math.round((usage / limit) * 100)}%` }
               }>
            { usage * 1000 }
          </div>
        )
      }
    </div>
    <div className='label-right'>CPU</div>
  </span>

const Node = ({ node }) =>
  <li className='resource' style={
    { opacity: (node.get('status') === 'READY') ? 1 : 0.5 }
  }>
    <header className='row'>
      <h4 className='col-10'>
        { node.get('class') }
      </h4>
      <menu className='col-2 text-right' style={{ display: 'none' }}>
        <a href='#' className='fa-stack fa-lg'
                    onClick={ e => e.preventDefault() }
                    title='Terminate - Supergiant will automatically replace this node when terminated.'>

          <i className="fa fa-circle-o fa-stack-2x" />
          <i className="fa fa-times fa-stack-1x" />
        </a>
      </menu>
    </header>

    {
      node.get('status') === 'NOT_READY' && (
        <div className='row'>
          <span>Node not active</span>
        </div>
      )
    }
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
