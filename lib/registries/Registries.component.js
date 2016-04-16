import React from 'react'
import Registry from './Registry.component'

class Registries extends React.Component {
  static propTypes = {
    registries: React.PropTypes.object.isRequired,
    destroyRegistry: React.PropTypes.func.isRequired,
    fetchRegistries: React.PropTypes.func.isRequired,
    newRegistry: React.PropTypes.func.isRequired
  }

  componentDidMount() { this.props.fetchRegistries() }

  render() {
    const { registries, destroyRegistry, newRegistry } = this.props
    return(
      <span>
        <h2>Repository keys</h2>
        <button onClick={ newRegistry }>New</button>
        {
          registries.count() === 0 && (
            <div>
              You don't have any repo keys set for your application yet.
            </div>
          )
        }
        {
          registries.map((registry, index) => (
            <Registry key={ index }
                      registry={ registry }
                      destroy={ destroyRegistry(registry.get('name')) } />
          ))
        }
      </span>
    )
  }
}

export default Registries
