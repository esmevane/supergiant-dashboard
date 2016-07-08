import React from 'react'
import styles from './styles.module.css'
import ImagesListItem from 'components/ImagesListItem'
import FlipChange from 'components/FlipChange'

export default class ImagesList extends React.Component {
  static propTypes = {
    images: React.PropTypes.object.isRequired,
    onRemove: React.PropTypes.func.isRequired,
    onEdit: React.PropTypes.func.isRequired
  }

  render() {
    const { images, onRemove, onEdit } = this.props

    const toItem = (image, index) =>
      <ImagesListItem key={ index }
                      onEdit={ onEdit }
                      onRemove={ onRemove }
                      image={ image } />

    return(
      <div className={ styles.container }>
        <FlipChange transitionAppear={ true }>
          { images.map(toItem) }
        </FlipChange>
      </div>
    )
  }
}
