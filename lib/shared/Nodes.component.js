import React from 'react'

const Nodes = () =>
  <div className='nodes-view'>
    <header className='context-header'>
      <div className='context-title'>Nodes</div>
      <div className='context-menu' />
    </header>

    <div className='context-system-resources'>
      <ul className='resources-list'>
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((node, index) => (
            <li className='resource' key={ index }>
              <header className='row'>
                <h4 className='col-10'>m4.xlarge { index + 1 }</h4>
                <menu className='col-2 text-right'>
                  <a href='#' className='fa-stack fa-lg' title='Terminate - Supergiant will automatically replace this node when terminated.'>
                    <i className="fa fa-circle-o fa-stack-2x" />
                    <i className="fa fa-times fa-stack-1x" />
                  </a>
                </menu>
              </header>

              <div className='row'>
                <div className='status-meter with-label-right'>
                  <div className='status-metric'
                       style={{ width: '50%' }}>2.2</div>
                </div>
                <div className='label-right'>CPU</div>
              </div>

              <div className='row'>
                <div className='status-meter with-label-right'>
                  <div className='status-metric warn'
                       style={{ width: '80%' }}>31.2 GB</div>
                </div>
                <div className='label-right'>RAM</div>
              </div>

              <div className='row'>
                <div className='status-meter with-label-right'>
                  <div className='status-metric alert'
                       style={{ width: '92%' }}>128.5 GB</div>
                </div>
                <div className='label-right'>Disk</div>
              </div>
            </li>
          ))
        }
      </ul>

    </div>


  </div>

export default Nodes
