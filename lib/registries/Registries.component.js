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
        <header>
          <h3>Repository keys</h3>
          <menu className='context-menu'>
            <button className='with-glyph glyph-right-arrow'
                    onClick={ newRegistry }>New</button>
          </menu>
        </header>

        { registries.count() === 0 && (
            <p className='text-note'>
              You don't have any repo keys set for your application yet.
            </p>
          )
        }

        <table>
          { registries.map((registry, index) => (
              <Registry key={ index }
                        registry={ registry }
                        destroy={ destroyRegistry(registry.get('name')) } />
            ))
          }
        </table>
      </div>
    )
  }
}

export default Registries
