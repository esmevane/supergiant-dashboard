import React from 'react'
import styles from './styles.module.css'

export default class TasksListItem extends React.Component {
  static propTypes = { task: React.PropTypes.object.isRequired }

  render() {
    const { task } = this.props

    return <div className={ styles.container }>{ task.key() }</div>
  }
}
