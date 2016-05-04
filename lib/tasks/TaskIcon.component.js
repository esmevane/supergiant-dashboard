import React from 'react'
import Badge from '../elements/Badge.component'

const TaskIcon = ({ tally, onClick }) =>
  <a href='#'
     className='menu-icon tasks-icon'
     onClick={ onClick }
     style={ { cursor: 'pointer' } }>
    <Badge tally={ tally } />
  </a>

TaskIcon.propTypes = {
  tally: React.PropTypes.number.isRequired,
  onClick: React.PropTypes.func.isRequired
}

export default TaskIcon
