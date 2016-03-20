import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { sortComponents } from '../apps/apps.actions'
import { createComponentSelector } from '../selectors'
import ComponentList from './ComponentList.component'
import DraggableComponent from './DraggableComponent.container'

class DraggableComponents extends React.Component {
  constructor(props) {
    super(props)

    this.state = props
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

function mapStateToProps(state, props) {
  return { }
}

function mapDispatchToProps(dispatch, props) {
  const { app } = props
  const handleDrop = (id, index) =>
    dispatch(sortComponents(app.get('id'), id, index))

  return { handleDrop }
}

const connector = connect(mapStateToProps, mapDispatchToProps)
export default connector(DraggableComponents)
