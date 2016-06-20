import React from 'react'
import styles from './styles.module.css'

export default class EntrypointsListItem extends React.Component {
  static propTypes = {
    onEdit: React.PropTypes.func.isRequired,
    onRemove: React.PropTypes.func.isRequired,
    entrypoint: React.PropTypes.object.isRequired
  }

  render() {
    const { entrypoint, onEdit, onRemove } = this.props

    return(
      <div className={ styles.container }>
        <div className={ styles.content }>
          <div className={ styles.title }>
            { entrypoint.displayName() }
          </div>
          <div className={ styles.content }>
            <a href={ `https://${entrypoint.address}` } target='_blank'>
              { entrypoint.address }
            </a>
          </div>
        </div>
        <div className={ styles.actions }>
          <button className={ styles.action }
                  onClick={ onEdit }>
            <i className='fa fa-pencil-square fa-2x' />
          </button>
          <button className={ styles.action }
                  onClick={ onRemove }>
            <i className='fa fa-times-circle fa-2x' />
          </button>
        </div>
      </div>
    )
  }
}
