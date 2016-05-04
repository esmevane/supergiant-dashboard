import { fromJS } from 'immutable'

export const taskData = state => state.get('tasks')
export const allTasks = state => taskData(state).get('contents')
export const getTasks = state => allTasks(state).toList()

export const getCache = state => taskData(state).getIn(['meta', 'cache'])
export const getTask = (state, id) => allTasks(state).get(id)
