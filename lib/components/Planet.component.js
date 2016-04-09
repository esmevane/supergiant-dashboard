import React from 'react'

const Planet = ({ app, follow, component }) =>
  <figure className='dashboard-list-item' onClick={ follow }>
    <div className='dashboard-list-item-planet'
         style={ { backgroundColor: component.get('color') } } />
    <figcaption className='glyph-right-arrow'>
      { component.get('name') }
    </figcaption>
  </figure>

Planet.propTypes = {
  app: React.PropTypes.object.isRequired,
  component: React.PropTypes.object.isRequired,
  follow: React.PropTypes.func.isRequired
}

export default Planet
