import React from 'react'
import ReleaseDetail from './ReleaseDetail.component'

const Release = ({ release, destroy }) =>
  <article className='deployment'>
    <header>
      <h4>
        <label htmlFor={ release.get('timestamp') } className='release-label'>
          { release.get('created') }
        </label>
        <menu className='context-menu'>
          <span className='option'>3 changes</span>
          <span className='option'>
            <label htmlFor={ release.get('timestamp') }>
              view configuration
            </label>
          </span>
        </menu>
      </h4>
    </header>

    <input type='checkbox' id={ release.get('timestamp') } />
    <section className='accordion-data'>
      <button onClick={ destroy }>Destroy this release</button>
      <ReleaseDetail release={ release } />
    </section>
  </article>

Release.propTypes = {
  release: React.PropTypes.object.isRequired,
  destroy: React.PropTypes.func.isRequired
}

export default Release
