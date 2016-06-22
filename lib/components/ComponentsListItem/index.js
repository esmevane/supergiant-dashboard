import React from 'react'
import styles from './styles.module.css'

export default class ComponentsListItem extends React.Component {
  static propTypes = {
    component: React.PropTypes.object.isRequired,
    onDetail: React.PropTypes.func.isRequired,
    onRemove: React.PropTypes.func.isRequired,
    onEdit: React.PropTypes.func.isRequired
  }

  render() {
    const { component, onDetail, onEdit, onRemove } = this.props

    return(
      <div className={ styles.container }
           style={ { backgroundColor: component.displayColor() } }>
        <div className={ styles.content } onClick={ onDetail(component.key()) }>
          { component.displayName().charAt(0).toUpperCase() }
        </div>
        <div className={ styles.controls }>
          <div className={ styles.label }>
            { component.displayName() }
          </div>
          <button className={ styles.button }
                  onClick={ onEdit(component.key()) }>
            <i className='fa fa-pencil-square fa-2x'
               title={ `Edit ${component.displayName()}`} />
          </button>
          <button className={ styles.button }
                  onClick={ onRemove(component.key()) }>
            <i className='fa fa-times-circle fa-2x'
               title={ `Delete ${component.displayName()}`} />
          </button>
        </div>
      </div>
    )
  }
}
