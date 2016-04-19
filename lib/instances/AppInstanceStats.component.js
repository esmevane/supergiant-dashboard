import React from 'react'

export default class AppInstanceStats extends React.Component {
  static propTypes = {
    app: React.PropTypes.object.isRequired,
    components: React.PropTypes.object.isRequired,
    instances: React.PropTypes.object,
    fetchResources: React.PropTypes.func.isRequired
  }

  componentWillMount() { this.props.fetchResources() }

  resourcesFound() {
    const { app, instances } = this.props
    const sum = path => (tally, instance) =>
      tally + (instance.getIn(path) || 0)
    const coreUsage = instances.reduce(sum(['cpu', 'usage']), 0)
    const coreLimit = instances.reduce(sum(['cpu', 'limit']), 0)
    const ramUsage = instances.reduce(sum(['ram', 'usage']), 0)
    const ramLimit = instances.reduce(sum(['ram', 'limit']), 0)

    return(
      <span>
        <div className='app-detail-stat'>
          <div>{ app.get('name') }</div>
          <div className='text-note'>app-unique-name</div>
        </div>
        <div className='app-detail-stat'>
          <div>
            {
              Math.round((coreUsage / coreLimit) * 100) || 0
            }
            % ({ coreUsage / 1000} cores)
          </div>
          <div className='text-note'>CPU utilization</div>
        </div>
        <div className='app-detail-stat'>
          <div>
            {
              Math.round((ramUsage / ramLimit) * 100) || 0
            }
            % ({ ramUsage / 1024} GB)
          </div>
          <div className='text-note'>RAM utilization</div>
        </div>
      </span>
    )
  }

  render() {
    const { instances } = this.props
    return instances ? this.resourcesFound() : <div />
  }

}
