import { fromJS } from 'immutable'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { getComponentContainers } from '../selectors'
import Containers from './Containers.component'

function mapStateToProps(state, props) {
  const selector = getComponentContainers(props.component)
  
  return { containers: selector(state, props) }
}

function mapDispatchToProps(dispatch, props) {
  const { app, component } = props
  const base = `/apps/${app.get('name')}/components/${component.get('name')}`
  const uri = `${base}/containers/new`

  const handleNew = event => {
    event.preventDefault()
    dispatch(push(uri))
  }

  return { handleNew }
}

const connector = connect(mapStateToProps, mapDispatchToProps)

export default connector(Containers)
