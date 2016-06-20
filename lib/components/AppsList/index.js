import React from 'react'
import styles from './styles.module.css'
import AppsListItem from 'components/AppsListItem'
import FlipChange from 'components/FlipChange'

export default class AppsList extends React.Component {
  static propTypes = {
    apps: React.PropTypes.object.isRequired,
    onAddComponent: React.PropTypes.func.isRequired,
    onRemove: React.PropTypes.func.isRequired,
    onEdit: React.PropTypes.func.isRequired
  }

  render() {
    const { apps, onAddComponent, onRemove, onEdit } = this.props

    const toItem = (app, index) =>
      <AppsListItem key={ index }
                    onAddComponent={ onAddComponent }
                    onEdit={ onEdit }
                    onRemove={ onRemove }
                    app={ app } />

    return(
      <div className={ styles.container }>
        <FlipChange transitionAppear={ true }>
          { apps.map(toItem) }
        </FlipChange>
      </div>
    )
  }
}
