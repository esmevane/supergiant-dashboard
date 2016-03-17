import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { reorder } from '../components/components.actions'
import { order } from '../shared/entities.behavior'
import ComponentList from './ComponentList.component'
import DraggableComponent from './DraggableComponent.container'

class DraggableComponents extends React.Component {
  constructor(props) {
    super(props)

    let { app, components } = props
    let filter = component => component.get('appId') === app.get('id')
    let filtered = components.filter(filter)
    this.state = { components: filtered }
  }

  handleMove = (dragIndex, hoverIndex) => {
    const { components } = this.state
    const target = components.get(dragIndex)

    let sorted = components.splice(dragIndex, 1).splice(hoverIndex, 0, target)
    this.setState({ components: sorted })
  };

  render() {
    const { app, handleDrop, ...rest } = this.props
    const { components } = this.state

    return(
      <ComponentList { ...rest } app={ app } >
        {
          components.map((component, index) => (
            <DraggableComponent index={ index }
                                handleMove={ this.handleMove }
                                handleDrop={ handleDrop }
                                key={ component.get('id') }
                                component={ component }
                                app={ app } />
          ))
        }
      </ComponentList>
    )
  }
}

function mapStateToProps(state) {
  let componentState = state.get('components')
  let givenOrder = componentState.get('order')
  let components = order(givenOrder, componentState.get('contents'))

  return { components }
}

function mapDispatchToProps(dispatch) {
  const handleDrop = (id, index) => dispatch(reorder(id, index))

  return { handleDrop }
}

const connector = connect(mapStateToProps, mapDispatchToProps)
export default connector(DraggableComponents)
