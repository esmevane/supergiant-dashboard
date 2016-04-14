import React from 'react'

export default class Containers extends React.Component {
  static propTypes = {
    app: React.PropTypes.object.isRequired,
    component: React.PropTypes.object.isRequired,
    containers: React.PropTypes.object.isRequired,
    handleNew: React.PropTypes.func.isRequired
  }

  render() {
    const { app, component, containers, handleNew } = this.props

    return(
      <div className='component-resource container-resources'>
        <header>
          <h3>Containers</h3>
          <menu className='context-menu'>
            <button onClick={ handleNew } className="transparent glyph-right-arrow">
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

        <article>
          <div className='col-6'>
            <h4>
              <a href='#' onClick={ e => e.preventDefault() }>
                provisioner-rails.img
              </a>
            </h4>
            <p>3 env variables | 4 open ports</p>
          </div>

          <div className='col-3'>
            <h4>43% (5.5GB)</h4>
            <p className='text-note'>RAM utilization</p>
          </div>

          <div className='col-3'>
            <h4>56% (21 cores)</h4>
            <p className='text-note'>CPU utilization</p>
          </div>
        </article>

        <article>
          <div className='col-6'>
            <h4>
              <a href='#' onClick={ e => e.preventDefault() }>
                provisioner-rails.img
              </a>
            </h4>
            <p>3 env variables | 4 open ports</p>
          </div>

          <div className='col-3'>
            <h4>43% (5.5GB)</h4>
            <p className='text-note'>RAM utilization</p>
          </div>

          <div className='col-3'>
            <h4>56% (21 cores)</h4>
            <p className='text-note'>CPU utilization</p>
          </div>
        </article>
      </div>
    )
  }
}
