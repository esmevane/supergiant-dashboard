import React from 'react'
import ContextHeader from '../elements/ContextHeader.component'
import ContextMenu from '../elements/ContextMenu.component'
import ContextResources from '../elements/ContextResources.component'
import ContextTitle from '../elements/ContextTitle.component'
import ResourceList from '../elements/ResourceList.component'
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
        <ContextHeader>
          <ContextTitle>Nodes</ContextTitle>
          <ContextMenu />
        </ContextHeader>

        <ContextResources>
          <ResourceList>
            { nodes.count() === 0 && <li>No nodes found</li> }
            {
              nodes.map((node, index) => (
                <Node node={ node } key={ index } />
              ))
            }
          </ResourceList>
        </ContextResources>
      </div>
    )
  }

  render() {
    const { nodes } = this.props

    return nodes ? this.resourcesFound() : <NotFound />
  }
}
