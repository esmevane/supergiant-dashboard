import React from 'react'

const ComponentVolumes = ({ volumes }) =>
  <div className='component-detail-resource-item'>
    <div className='component-detail-resource-item-title'>
      <h3>Volumes</h3>
      <button>
        New
        <span className='carat'>»</span>
      </button>
    </div>
    {
      !volumes.length && (
        <div className='component-detail-resource-item-content'>
          <div className='component-detail-resource-item-content-title'>
            No volumes.
          </div>
          <div className='component-detail-resource-item-content-summary'>
            A volume is disk storage, accessible to containers within a component.
          </div>
        </div>
      )
    }
  </div>

export default ComponentVolumes 
