import React from 'react'
import { Link } from 'react-router'
import diff from 'immutablediff'
import NotFound from '../shared/NotFound.component'

export default class InstancesSummary extends React.Component {
  static propTypes = {
    app: React.PropTypes.object.isRequired,
    component: React.PropTypes.object.isRequired,
    decrease: React.PropTypes.func.isRequired,
    fetchResources: React.PropTypes.func.isRequired,
    increase: React.PropTypes.func.isRequired,
    instanceNumber: React.PropTypes.number.isRequired,
    instances: React.PropTypes.object
  }

  componentWillMount() { this.props.fetchResources() }

  resourcesFound() {
    const { decrease, increase, instances, instanceNumber } = this.props

    return(
      <div className='col-3 lined'>
        <h3>
          <a href='#' onClick={ decrease }>-</a>
          { instanceNumber }
          <a href='#' onClick={ increase }>+</a>
           instances
        </h3>
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
