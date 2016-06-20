import React from 'react'
import { connect } from 'react-redux'
import * as crud from 'lib/crud-utilities'
import TasksList from 'components/TasksList'
import styles from './styles.module.css'

const { fetch } = crud.createCrudActions('tasks')

class Tasks extends React.Component {
  static fetchData = () => fetch()

  render() {
    const { tasks, requesting, refresh } = this.props
    const opacity = !requesting ? 1.0 : 0.5
    const iconClass = `fa fa-refresh fa-2x ${!requesting ? '' : 'fa-spin'}`

    return(
      <div className={ styles.container }>
        <div className={ styles.controls }>
          <button className={ styles.button }
                  disabled={ requesting }
                  onClick={ refresh }>
            <i className={ iconClass } title="Refresh tasks" />
          </button>
        </div>
        <div className={ styles.content } style={ { opacity } }>
          <TasksList tasks={ tasks } />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  const tasks = crud.getRecords(state.get('tasks'))
  const requesting = crud.isRequesting(state.get('tasks'))

  return { requesting, tasks }
}

function mapDispatchToProps(dispatch, props) {
  const refresh = event => {
    event.preventDefault()

    dispatch(fetch())
  }

  return { refresh }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tasks)
