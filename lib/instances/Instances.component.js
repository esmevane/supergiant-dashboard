import React from 'react'
import ContextResources from '../elements/ContextResources.component'
import ResourceList from '../elements/ResourceList.component'
import Instance from './Instance.component'
import InstanceWelcome from './InstanceWelcome.component'

export default class Instances extends React.Component {
  static propTypes = {
    instances: React.PropTypes.object,
    fetchResources: React.PropTypes.func.isRequired
  }

  componentWillMount() { this.props.fetchResources() }

  resourcesFound() {
    const { instances } = this.props

    return(
      <ContextResources>
        <header>
          <h2>Instances</h2>
          { instances.count() < 1 && <InstanceWelcome /> }
        </header>

        <ResourceList>
          {
            instances.map((instance, index) => (
              <Instance instance={ instance } key={ index } />
            ))
          }
        </ResourceList>
      </ContextResources>
    )
  }

  render() {
    const { instances } = this.props

    return instances ? this.resourcesFound() : <div />
  }
}
