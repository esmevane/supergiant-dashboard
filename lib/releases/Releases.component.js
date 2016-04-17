import React from 'react'
import Release from './Release.component'

export default class Releases extends React.Component {
  static propTypes = {
    app: React.PropTypes.object,
    component: React.PropTypes.object,
    releases: React.PropTypes.object.isRequired,
    destroyRelease: React.PropTypes.func.isRequired,
    fetchReleases: React.PropTypes.func.isRequired
  }

  render() {
    const { releases, destroyRelease, newRelease } = this.props
    return(
      <section>
        <header className='context-header'>
          <div className='context-title'>
            Releases
          </div>
          <div className='context-menu' />
        </header>

        <div className='accordion-table'>
        {
          releases.count() === 0 && (
            <div>
              You don't have any releases yet.
            </div>
          )
        }
        {
          releases.map((release, index) => (
            <Release key={ index }
                      release={ release }
                      destroy={ destroyRelease(release.get('timestamp')) } />
          ))
        }
        </div>
      </section>
    )
  }
}
