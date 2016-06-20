import React from 'react'
import styles from './styles.module.css'
import ComponentsListItem from 'components/ComponentsListItem'
import FlipChange from 'components/FlipChange'

export default class ComponentsList extends React.Component {
  render() {
    const { components, onEdit, onRemove } = this.props

    const toItem = (component, index) =>
      <ComponentsListItem key={ index }
                          onEdit={ onEdit }
                          onRemove={ onRemove }
                          component={ component } />

    return(
      <div className={ styles.container }>
        <FlipChange transitionAppear={ true }>
          { components.map(toItem) }
        </FlipChange>
      </div>
    )
  }

}
