import { connect } from 'react-redux'
import { destroy as destroyContainer } from './containers.actions'
import Container from './Container.component'

function mapStateToProps(state, props) { return {} }

function mapDispatchToProps(dispatch, props) {
  const destroy = event => {
    const { container } = props
    const { id } = container.toJS()

    event.preventDefault()

    if (window.confirm("Are you sure you want to destroy this container?")) {
      dispatch(destroyContainer(id, container.toJS()))
    }
  }

  return { destroy }
}

const connector = connect(mapStateToProps, mapDispatchToProps)

export default connector(Container)
