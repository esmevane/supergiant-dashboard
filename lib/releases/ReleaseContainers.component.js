import React from 'react'
import ReleaseContainer from './ReleaseContainer.component'

const ReleaseContainers = ({ containers, release }) =>
  <div className='release-detail-pane collapsible'>
    <h3 className='col-6'>Containers</h3>
    {
      containers.count() !== 0 && (
        <div>
          {
            containers.map((container, index) => (
              <ReleaseContainer container={ container }
                                key={ index }
                                release={ release } />
            ))
          }
        </div>
      )
    }
  </div>

ReleaseContainers.propTypes = {
  containers: React.PropTypes.object.isRequired,
  release: React.PropTypes.object.isRequired
}

export default ReleaseContainers
