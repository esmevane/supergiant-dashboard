import React from 'react'

const Star = ({ name }) =>
  <div className='dashboard-app-detail'>
    <figure>
      <div className='dashboard-app-detail-star' />
      <figcaption>{ name }</figcaption>
    </figure>
  </div>

export default Star
