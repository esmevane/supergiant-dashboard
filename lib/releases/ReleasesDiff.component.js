import React from 'react'
import { Link } from 'react-router'
import diff from 'immutablediff'
import NotFound from '../shared/NotFound.component'

export default class ReleasesDiff extends React.Component {
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
    const hasTarget = target.toList().count() > 0
    const count = diff(current, target).count()

    if (hasTarget) {
      return(
        <div className='context-status'>
          { count } undeployed <Link to={ releasesUri }>changes.</Link>
        </div>
      )
    } else {
      return(
        <div className='context-status'>
          No deployable releases. <Link to={ releasesUri }>
            Prepare releases.
          </Link>
        </div>
      )
    }
  }

  render() {
    const { current, target } = this.props
    return target && current ? this.resourcesFound() : <NotFound />
  }
}
