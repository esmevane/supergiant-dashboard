import React from 'react'
import styles from './styles.module.css'

export default class ImagesListItem extends React.Component {
  static propTypes = {
    image: React.PropTypes.object.isRequired,
    onRemove: React.PropTypes.func.isRequired,
    onEdit: React.PropTypes.func.isRequired
  }

  render() {
    const { image, onEdit, onRemove } = this.props

    return(
      <div className={ styles.container }>
        <div className={ styles.content }>
          <div className={ styles.header }>
            <div className={ styles.title }>
              { image.name }
            </div>
            <div className={ styles.controls }>
              <div className={ styles.actions }>
                <button onClick={ onEdit(image.key()) }>
                  <i className='fa fa-pencil-square fa-2x' />
                </button>
                <button onClick={ onRemove(image.key()) }>
                  <i className='fa fa-times-circle fa-2x' />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
