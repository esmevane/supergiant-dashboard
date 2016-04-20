import React from 'react'
import { Link } from 'react-router'
import NotFound from '../shared/NotFound.component'

export default class ReleaseSummary extends React.Component {
  static propTypes = {
    app: React.PropTypes.object.isRequired,
    component: React.PropTypes.object.isRequired,
    current: React.PropTypes.object,
    fetchResources: React.PropTypes.func.isRequired,
    releasesUri: React.PropTypes.string.isRequired,
    target: React.PropTypes.object
  }

  componentWillMount() { this.props.fetchResources() }

  resourcesFound() {
    const { current, releasesUri, target } = this.props
    const latest = current.get('created') ? current : target
    const created = latest.get('created') || ''

    return(
      <span>
        <h3>
          { created.split(' ').slice(0, 3).join(' ') }
        </h3>
        { latest === current && (<p className='text-note'>Latest release</p>) }
        {
          latest === target && (<p className='text-note'>No latest release</p>)
        }
        <p>
          <Link to={ releasesUri }>view release log</Link>
        </p>
      </span>
    )
  }

  render() {
    const { current, target } = this.props
    return(
      <div className='detail'>
        { target && current ? this.resourcesFound() : <NotFound /> }
      </div>
    )
  }
}
