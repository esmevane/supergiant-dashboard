import React from 'react'

const Planet = ({ component }) =>
  <figure className='dashboard-list-item'>
    <div className='dashboard-list-item-planet'
         style={ { backgroundColor: component.get('color') } } />
    <figcaption>
      { component.get('name') }
      <span className='carat'>»</span>
    </figcaption>
  </figure>

Planet.propTypes = { component: React.PropTypes.object.isRequired }

export default Planet
