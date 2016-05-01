import React from 'react'
import ContextHeader from '../elements/ContextHeader.component'
import ContextTitle from '../elements/ContextTitle.component'
import ContextMenu from '../elements/ContextMenu.component'
import ActionButton from '../elements/ActionButton.component'
import EntrypointWelcome from './EntrypointWelcome.component'
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
        <ContextHeader className='table-row'>
          <h3>Entrypoints</h3>
          <ContextMenu>
            <ActionButton onClick={ newEntrypoint }
                          isAction={ true }
                          isTransparent={ true }>
              New
            </ActionButton>
          </ContextMenu>
        </ContextHeader>

        { entrypoints.count() === 0 && <EntrypointWelcome /> }

        <table>
          <tbody>
            { entrypoints.map((entrypoint, index) => (
                <Entrypoint key={ index }
                            entrypoint={ entrypoint }
                            destroy={
                              destroyEntrypoint(entrypoint.get('domain'))
                            } />
              ))
            }
          </tbody>
        </table>
      </div>
    )
  }
}

export default Entrypoints
