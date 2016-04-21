import { connect } from 'react-redux'
import { destroy as destroyVolume } from './volumes.actions'
import Volume from './Volume.component'

function mapStateToProps(state, props) { return {} }

function mapDispatchToProps(dispatch, props) {
  const destroy = event => {
    const { volume } = props
    const { id } = volume.toJS()

    event.preventDefault()

    if (window.confirm("Are you sure you want to destroy this volume?")) {
      dispatch(destroyVolume(id, volume.toJS()))
    }
  }

  return { destroy }
}

const connector = connect(mapStateToProps, mapDispatchToProps)

export default connector(Volume)
