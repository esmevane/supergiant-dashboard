import React from 'react'
import { Link } from 'react-router'
import FadeChange from '../shared/FadeChange.animation'
import Container from './Container.container.js'

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
        <FadeChange>
          {
            (containers.count() === 0) && (
              <article className='resource-note'>
                <p className='text-note'>
                  A Container holds a Docker image with RAM and CPU allocations,
                  ports, and environment variables.
                </p>
                <p className='text-note'>
                  This Component requires at least one Container to run.
                </p>
              </article>
            )
          }
          {
            containers.map((container, index) => (
              <Container key={ index } container={ container } />
            ))
          }
        </FadeChange>
      </div>
    )
  }
}
