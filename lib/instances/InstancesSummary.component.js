import React from 'react'
import { Link } from 'react-router'
import diff from 'immutablediff'
import NotFound from '../shared/NotFound.component'

export default class ReleasesDiff extends React.Component {
  static propTypes = {
    app: React.PropTypes.object.isRequired,
    component: React.PropTypes.object.isRequired,
    fetchResources: React.PropTypes.func.isRequired,
    instances: React.PropTypes.object
  }

  componentWillMount() { this.props.fetchResources() }

  resourcesFound() {
    const { instances } = this.props

    return(
      <div className='col-3 lined'>
        <h3>0 instances</h3>
        <p className='text-note'>
          { instances.count() } deployed
        </p>
        <p className='text-note'>
          {
            instances
              .filter(instance => instance.get('status') !== 'STOPPED')
              .count()
          } running
        </p>
      </div>
    )
  }

  render() {
    const { instances } = this.props
    return instances ? this.resourcesFound() : <NotFound />
  }
}
