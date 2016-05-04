import React from 'react'

const Task = ({ task, destroy }) =>
  <tr className='table-row'>
    <td className='col-10'>
      <h5>{ task.id() }</h5>
      <dl>
        <dt>Status</dt>
        <dd>{ task.status }</dd>
        <dt>Attempts</dt>
        <dd>{ task.attempts }</dd>
        <dt>Action data</dt>
        <dd>
          <pre>
            { JSON.stringify(task.action_data.toJS()) }
          </pre>
        </dd>
        {
          task.error.length > 0 && (
            <span>
              <dt>Error message</dt>
              <dd>{ task.error }</dd>
            </span>
          )
        }
      </dl>
    </td>
    <td>
      <a href='#' className='glyph glyph-x' onClick={ destroy(task.id()) } />
    </td>
  </tr>

Task.propTypes = {
  task: React.PropTypes.object.isRequired,
  destroy: React.PropTypes.func.isRequired
}

export default Task
