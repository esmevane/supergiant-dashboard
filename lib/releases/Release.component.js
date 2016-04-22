import React from 'react'
import ReleaseDetail from './ReleaseDetail.component'

const Release = ({ release, destroy }) =>
  <article className='release'>
    <header>
      <h4>
        <label htmlFor={ release.get('timestamp') } className='release-label'>
          { release.get('created') }
        </label>
        <menu className='context-menu'>
          <span className='option'>
            <label htmlFor={ release.get('timestamp') }>
              see details
            </label>
          </span>
        </menu>
      </h4>
    </header>

    <input type='checkbox' id={ release.get('timestamp') } />

    <section className='accordion-data'>
      <ReleaseDetail release={ release } />
    </section>
  </article>

Release.propTypes = {
  release: React.PropTypes.object.isRequired,
  destroy: React.PropTypes.func.isRequired
}

export default Release
