import React from 'react'
import Entrypoint from './Entrypoint.component'

class Entrypoints extends React.Component {
  static propTypes = {
    entrypoints: React.PropTypes.object.isRequired,
    destroyEntrypoint: React.PropTypes.func.isRequired,
    fetchEntrypoints: React.PropTypes.func.isRequired,
    newEntrypoint: React.PropTypes.func.isRequired
  }

  componentDidMount() { this.props.fetchEntrypoints() }

  render() {
    const { destroyEntrypoint, entrypoints, newEntrypoint } = this.props
    return(
      <div>
        <header>
          <h3>Entrypoints</h3>
          <menu className='context-menu'>
            <button className='with-glyph glyph-right-arrow-action-color transparent'
                    onClick={ newEntrypoint }>New</button>
          </menu>
        </header>

        { entrypoints.count() === 0 && (
            <p className='text-note'>
              You don't have any entrypoints for your application yet.
            </p>
          )
        }

        <table>
          { entrypoints.map((entrypoint, index) => (
              <Entrypoint key={ index }
                          entrypoint={ entrypoint }
                          destroy={
                            destroyEntrypoint(entrypoint.get('domain'))
                          } />
            ))
          }
        </table>
      </div>
    )
  }
}

export default Entrypoints
