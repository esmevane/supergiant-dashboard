import React from 'react'
import styles from './styles.module.css'
import TasksListItem from 'components/TasksListItem'
import FlipChange from 'components/FlipChange'

export default class TasksList extends React.Component {
  static propTypes = { tasks: React.PropTypes.object.isRequired }

  render() {
    const { tasks } = this.props

    return(
      <div className={ styles.container }>
        <FlipChange transitionAppear={ true }>
          {
            tasks.map((task, index) => (
              <TasksListItem key={ index } task={ task } />
            ))
          }
        </FlipChange>
      </div>
    )
  }
}
