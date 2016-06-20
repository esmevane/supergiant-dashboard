import React from 'react'
import styles from './styles.module.css'

export default class Layout extends React.Component {
  render() {
    const { children } = this.props

    return <div className={ styles.container }>{ children }</div>
  }
}
