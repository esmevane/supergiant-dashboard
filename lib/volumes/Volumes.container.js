import { fromJS } from 'immutable'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { createVolumeSelector } from '../selectors'
import Volumes from './Volumes.component'

function mapStateToProps(state, props) {
  const selector = createVolumeSelector(props.component)
  return { volumes: selector(state, props) }
}

function mapDispatchToProps(dispatch, props) {
  const handleNew = event => {
    const { app, component } = props
    const base = `/apps/${app.get('name')}/components/${component.get('name')}`
    const uri = `${base}/volumes/new`

    event.preventDefault()
    dispatch(push(uri))
  }

  return { handleNew }
}

const connector = connect(mapStateToProps, mapDispatchToProps)

export default connector(Volumes)
