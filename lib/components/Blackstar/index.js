import React from 'react'
import styles from './styles.module.css'

export default class Blackstar extends React.Component {
  render() {
    return(
      <div className={ styles.container }>
        <div className={ styles.content }>
          <i className='fa fa-star fa-5x' />
        </div>
      </div>
    )
  }
}
