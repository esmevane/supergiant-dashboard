import React from 'react'

export default class Component extends React.Component {
  static propTypes = {
    app: React.PropTypes.object.isRequired,
    component: React.PropTypes.object.isRequired,
    follow: React.PropTypes.func.isRequired
  }

  render() {
    const { app, follow, component } = this.props
    return(
      <figure className='dashboard-list-item' onClick={ follow }>
        <div className='dashboard-list-item-planet'
             style={ { backgroundColor: component.get('color') } } />
        <figcaption className='with-glyph glyph-right-arrow'>
          { component.get('name') }
        </figcaption>
      </figure>
    )
  }
}
