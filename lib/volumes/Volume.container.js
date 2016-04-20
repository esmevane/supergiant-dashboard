import { connect } from 'react-redux'
import { remove } from './volumes.actions'
import Volume from './Volume.component'

function mapStateToProps(state, props) { return {} }

function mapDispatchToProps(dispatch, props) {
  const destroy = event => {
    const { volume } = props
    const { id } = volume.toJS()
    event.preventDefault()
    dispatch(remove(id, volume))
  }

  return { destroy }
}

const connector = connect(mapStateToProps, mapDispatchToProps)

export default connector(Volume)
