import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { getTasks } from './tasks.selectors'
import TaskIcon from './TaskIcon.component'

function mapStateToProps(state, props) {
  const tally = getTasks(state).count()

  return { tally }
}

function mapDispatchToProps(dispatch, props) {
  const onClick = event => {
    event.preventDefault()
    dispatch(push(`/tasks`))
  }

  return { onClick }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskIcon)
