import { connect } from 'react-redux'
import { destroy } from './tasks.actions'
import { getTasks } from './tasks.selectors'
import Tasks from './Tasks.component'

function mapStateToProps(state, props) {
  const tasks = getTasks(state, props)

  return { tasks }
}

function mapDispatchToProps(dispatch, props) {
  return {
    destroy: id => event => {
      event.preventDefault()
      dispatch(destroy(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tasks)
