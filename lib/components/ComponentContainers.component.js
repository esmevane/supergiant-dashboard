import React from 'react'

const ComponentContainers = ({ containers }) =>
  <div className='component-detail-resource-item'>
    <div className='component-detail-resource-item-title'>
      <h3>Containers</h3>
      <button>
        New
        <span className='carat'>»</span>
      </button>
    </div>
    {
      !containers.length && (
        <div className='component-detail-resource-item-content'>
          <div className='component-detail-resource-item-content-title'>
            No containers.
          </div>
          <div className='component-detail-resource-item-content-summary'>
            A container is a single image with RAM and CPU allocations.  A container has ports and environment variables.
          </div>
        </div>
      )
    }
  </div>

export default ComponentContainers
