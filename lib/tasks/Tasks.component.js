import React from 'react'
import ContextHeader from '../elements/ContextHeader.component'
import ContextMenu from '../elements/ContextMenu.component'
import ContextTitle from '../elements/ContextTitle.component'
import Task from './Task.component'
import TaskWelcome from './TaskWelcome.component'

const Tasks = ({ destroy, tasks }) =>
  <div className='tasks-view'>
    <ContextHeader>
      <ContextTitle>Tasks</ContextTitle>
      <ContextMenu />
    </ContextHeader>

    { tasks.count() === 0 && <TaskWelcome /> }

    <table>
      <tbody>
        {
          tasks.map((task, index) => (
            <Task key={ index } task={ task } destroy={ destroy } />
          ))
        }
      </tbody>
    </table>
  </div>

Task.propTypes = {
  tasks: React.PropTypes.object.isRequired,
  destroy: React.PropTypes.func.isRequired
}

export default Tasks
