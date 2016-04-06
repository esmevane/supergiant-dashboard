import React from 'react'
import ComponentContainers from './ComponentContainers.component'
import ComponentVolumes from './ComponentVolumes.component'

export default class ShowComponent extends React.Component {
  render() {
    const { app, component, handleDestroy } = this.props
    const destroy = handleDestroy(app, component)

    return(
      <div className='component'>
        <div className='component-controls'>
          <button onClick={ destroy }>
            Destroy
            <span className='carat'>X</span>
          </button>
          <button>
            Restart
            <span className='carat'>@</span>
          </button>
        </div>
        <div className='component-overview'>
          <div className='component-overview-controls'>
            <div className='component-instances-detail'>
              <div className='component-instances-detail-headline'>
                0 instances
              </div>
              <div className='component-instances-detail-content'>
                0 running
              </div>
              <div className='component-instances-detail-controls'>
                <a href='#' onClick={e=>e.preventDefault()}>
                  edit instances
                </a>
              </div>
            </div>
            <div className='component-releases-detail'>
              <div className='component-releases-detail-headline'>
                Mar 13th, 2016
              </div>
              <div className='component-releases-detail-content'>
                Latest release
              </div>
              <div className='component-releases-detail-controls'>
                <a href='#' onClick={e=>e.preventDefault()}>
                  view past releases
                </a>
              </div>
            </div>
          </div>
          <div className='component-instances-dialog'>
            <div className='component-instances-dialog-status not-running'>
              This component is not running.
            </div>
            <div className='component-instances-dialog-summary'>
              This component needs at least 1 instance to run.
            </div>
          </div>
        </div>
        <div className='component-detail-resources'>
          <ComponentContainers containers={ [] }/>
          <ComponentVolumes volumes={ [] }/>
        </div>
      </div>
    )
  }
}

export default ShowComponent
