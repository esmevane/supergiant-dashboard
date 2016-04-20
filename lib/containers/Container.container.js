import { connect } from 'react-redux'
import { remove } from './containers.actions'
import Container from './Container.component'

function mapStateToProps(state, props) { return {} }

function mapDispatchToProps(dispatch, props) {
  const destroy = event => {
    const { container } = props
    const { id } = container.toJS()

    event.preventDefault()

    if (window.confirm("Are you sure you want to delete this container?")) {
      dispatch(remove(id, container))
    }
  }

  return { destroy }
}

const connector = connect(mapStateToProps, mapDispatchToProps)

export default connector(Container)
