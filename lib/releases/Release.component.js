import React from 'react'
import ContextMenu from '../elements/ContextMenu.component'
import ReleaseDetail from './ReleaseDetail.component'

const toggleKey = release => release.get('timestamp')

const Release = ({ release, destroy }) =>
  <article className='release'>
    <header>
      <h4>
        <label htmlFor={ toggleKey(release) } className='release-label'>
          { release.get('created') }
        </label>
        <ContextMenu>
          <span className='option'>
            <label htmlFor={ toggleKey(release) }>
              see details
            </label>
          </span>
        </ContextMenu>
      </h4>
    </header>

    <input type='checkbox' id={ toggleKey(release) } />

    <section className='accordion-data'>
      <ReleaseDetail release={ release } />
    </section>
  </article>

Release.propTypes = {
  release: React.PropTypes.object.isRequired,
  destroy: React.PropTypes.func.isRequired
}

export default Release
