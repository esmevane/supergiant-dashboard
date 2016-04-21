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
      <div>
        <header className='context-header table-row'>
          <h3>Docker&nbsp;Repositories</h3>
          <menu className='context-menu'>
            <button className='with-glyph glyph-right-arrow-action-color transparent'
                    onClick={ newRegistry }>New</button>
          </menu>
        </header>

        { registries.count() == 0 && (
          <aside>
            <br />
            <p className='text-note'>
              You don't have any Repository keys set for your application yet.
            </p>
            <p className='text-note'>
              A Repository key is required to connect to a private Docker
              Repository.
            </p>
          </aside>
        )}

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
