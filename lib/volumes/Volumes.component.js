import React from 'react'

const Volumes = ({ volumes, handleNew }) =>
  <div className='component-resource volume-resources'>
    <header>
      <h3 className='with-icon icon-satellite'>Volumes</h3>
      <menu className='context-menu'>
        <button onClick={ handleNew } className='transparent with-glyph glyph-right-arrow-action-color'>
          New
        </button>
      </menu>
    </header>
    {
      (volumes.count() === 0) && (
        <aside className='resource-note'>
          <h4>No volumes.</h4>
          <p className='text-note'>
            A volume is disk storage that can be mounted on
            a <dfn>Container</dfn> within a <dfn>Component</dfn>.
          </p>
        </aside>
      )
    }
    {
      volumes.map((volume, index) => (
        <article key={ index }>
          <div className='col-8'>
            <h4>db-hd-1</h4>
            <p>GP2 drive</p>
          </div>

          <div className='col-4'>
            <h4>20% (100GB)</h4>
            <p className='text-note'>HD utilization</p>
          </div>
        </article>
      ))
    }
  </div>

export default Volumes
