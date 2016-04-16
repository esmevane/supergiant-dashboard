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
      <span>
        <h2>Entrypoints</h2>
        <button onClick={ newEntrypoint }>New</button>
        {
          entrypoints.count() === 0 && (
            <div>
              You don't have any entrypoints for your application yet.
            </div>
          )
        }
        {
          entrypoints.map((entrypoint, index) => (
            <Entrypoint key={ index }
                        entrypoint={ entrypoint }
                        destroy={
                          destroyEntrypoint(entrypoint.get('domain'))
                        } />
          ))
        }
      </span>
    )
  }
}

export default Entrypoints
