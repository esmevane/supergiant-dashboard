import React from 'react'
import ActionButton from '../elements/ActionButton.component'
import ContextHeader from '../elements/ContextHeader.component'
import ContextMenu from '../elements/ContextMenu.component'
import ContextTitle from '../elements/ContextTitle.component'
import RegistryWelcome from './RegistryWelcome.component'
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
      <div>
        <ContextHeader className='table-row'>
          <h3>Docker Repositories</h3>
          <ContextMenu>
            <ActionButton onClick={ newRegistry } isAction={ true }>
              New
            </ActionButton>
          </ContextMenu>
        </ContextHeader>

        { registries.count() == 0 && <RegistryWelcome /> }

        <table>
          <tbody>
            { registries.map((registry, index) => (
              <Registry key={ index }
                        registry={ registry }
                        destroy={ destroyRegistry(registry.get('name')) } />
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Registries
