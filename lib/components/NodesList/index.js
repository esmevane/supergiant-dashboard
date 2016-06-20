import React from 'react'
import styles from './styles.module.css'
import NodesListItem from 'components/NodesListItem'
import FlipChange from 'components/FlipChange'

export default class NodesList extends React.Component {
  static propTypes = { nodes: React.PropTypes.object.isRequired }

  render() {
    const { nodes } = this.props

    return(
      <div className={ styles.container }>
        <FlipChange transitionAppear={ true }>
          {
            nodes.map((node, index) => (
              <NodesListItem key={ index } node={ node } />
            ))
          }
        </FlipChange>
      </div>
    )
  }
}
