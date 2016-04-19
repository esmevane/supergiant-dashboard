import React from 'react'
import Container from './Container.component.js'

export default class Containers extends React.Component {
  static propTypes = {
    app: React.PropTypes.object,
    component: React.PropTypes.object,
    containers: React.PropTypes.object.isRequired,
    handleNew: React.PropTypes.func.isRequired
  }

  render() {
    const { app, component, containers, handleNew } = this.props

    return(
      <div className='component-resource container-resources'>
        <header>
          <h3 className='with-icon icon-city'>Containers</h3>
          <menu className='context-menu'>
            <button onClick={ handleNew }
                    className='transparent with-glyph glyph-right-arrow-action-color'>
              New
            </button>
          </menu>
        </header>
        {
          (containers.count() === 0) && (
            <aside className='resource-note'>
              <h4>No containers.</h4>
              <p className='text-note'>
                A container is a single image with RAM and CPU allocations.  A container has ports and environment variables.
              </p>
            </aside>
          )
        }
        {
          containers.map((container, index) => (
            <Container key={ index } container={ container } />
          ))
        }
      </div>
    )
  }
}
