import React from 'react'
import AlertNotice from '../elements/AlertNotice.component'
import Column from '../elements/Column.component'
import SuccessNotice from '../elements/SuccessNotice.component'
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
      <Column className='valign-middle' size={ 5 }>
        {
          running.count() === 0 && (
            <AlertNotice>
              <h3>This component is not running.</h3>
            </AlertNotice>
          )
        }
        {
          running.count() !== 0 && (
            <SuccessNotice>
              <h3>This component is running.</h3>
            </SuccessNotice>
          )
        }
      </Column>
    )
  }

  render() {
    const { instances } = this.props

    return instances ? this.resourcesFound() : <NotFound />
  }
}
