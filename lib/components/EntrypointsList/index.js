import React from 'react'
import styles from './styles.module.css'
import FlipChange from 'components/FlipChange'
import EntrypointsListItem from 'components/EntrypointsListItem'

export default class EntrypointsList extends React.Component {
  static propTypes = {
    onEdit: React.PropTypes.func.isRequired,
    onRemove: React.PropTypes.func.isRequired,
    entrypoints: React.PropTypes.object.isRequired
  }

  render() {
    const { entrypoints, onEdit, onRemove } = this.props

    return(
      <div className={ styles.container }>
        <FlipChange transitionAppear={ true }>
          {
            entrypoints.map((entrypoint, index) => (
              <EntrypointsListItem key={ index }
                                   onEdit={ onEdit(entrypoint.key()) }
                                   onRemove={ onRemove(entrypoint.key()) }
                                   entrypoint={ entrypoint } />
            ))
          }
        </FlipChange>
      </div>)
  }
}
