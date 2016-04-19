import React from 'react'
import Node from './Node.component'
import NotFound from '../shared/NotFound.component'

export default class Nodes extends React.Component {
  static propTypes = {
    fetchResources: React.PropTypes.func.isRequired,
    nodes: React.PropTypes.object
  }

  componentWillMount() { this.props.fetchResources() }

  resourcesFound() {
    const { nodes } = this.props
    return(
      <div className='nodes-view'>
        <header className='context-header'>
          <div className='context-title'>Nodes</div>
          <div className='context-menu' />
        </header>

        <div className='context-system-resources'>
          <ul className='resources-list'>
            { nodes.count() === 0 && <li>No nodes found</li> }
            {
              nodes.map((node, index) => (
                <Node node={ node } key={ index } />
              ))
            }
          </ul>
        </div>
      </div>
    )
  }

  render() {
    const { nodes } = this.props

    return nodes ? this.resourcesFound() : <NotFound />
  }
}
