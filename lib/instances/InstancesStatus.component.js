import React from 'react'
import NotFound from '../shared/NotFound.component'

export default class InstanceStatus extends React.Component {
  static propTypes = {
    app: React.PropTypes.object.isRequired,
    component: React.PropTypes.object.isRequired,
    instances: React.PropTypes.object,
    fetchResources: React.PropTypes.func.isRequired
  }

  componentWillMount() { this.props.fetchResources() }

  resourcesFound() {
    const { instances } = this.props
    const running = instances.filter(instance => (
      instance.get('status') !== 'STOPPED'
    ))

    return(
      <div className='col-5 valign-middle'>
        {
          running.count() === 0 && (
            <div className='notice alert'>
              <h3>This component is not running.</h3>
            </div>
          )
        }
        {
          running.count() !== 0 && (
            <div className='notice success'>
              <h3>This component is running.</h3>
            </div>
          )
        }
      </div>
    )
  }

  render() {
    const { instances } = this.props

    return instances ? this.resourcesFound() : <NotFound />
  }
}
