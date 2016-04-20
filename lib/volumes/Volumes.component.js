import React from 'react'
import Volume from './Volume.container'
import FadeChange from '../shared/FadeChange.animation'

const Volumes = ({ volumes, handleNew }) =>
  <div className='component-resource volume-resources'>
    <header>
      <h3 className='with-icon icon-satellite'>Volumes</h3>
      <menu className='context-menu'>
        <button onClick={ handleNew }
                className='transparent with-glyph glyph-right-arrow-action-color'>
          New
        </button>
      </menu>
    </header>
    <FadeChange>
      {
        (volumes.count() === 0) && (
          <article className='resource-note'>
            <p className='text-note'>
              A Volume is disk storage that will be mounted on a running
              Container. Not all Containers need them.
            </p>
            <p className='text-note'>
              This Component has no Volumes.
            </p>
          </article>
        )
      }

      {
        volumes.map((volume, index) => (
          <Volume volume={ volume } key={ index } />
        ))
      }
    </FadeChange>
  </div>

export default Volumes
