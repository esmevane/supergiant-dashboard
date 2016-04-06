import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { sortComponents } from '../apps/apps.actions'
import { createComponentSelector } from '../selectors'
import Planets from './Planets.component'
import DraggablePlanet from './DraggablePlanet.container'

class DraggablePlanets extends React.Component {
  constructor(props) {
    super(props)

    this.state = props
  }

  componentWillReceiveProps(nextProps) {
    const { components } = this.state

    if (components !== nextProps.components) {
      this.setState({ components: nextProps.components })
    }
  }

  handleMove = (dragIndex, hoverIndex) => {
    const { components } = this.state
    const target = components.get(dragIndex)

    let sorted = components.splice(dragIndex, 1).splice(hoverIndex, 0, target)
    this.setState({ components: sorted })
  };

  render() {
    const { app, handleDrop, handleFollow, ...rest } = this.props
    const { components } = this.state
    const planets = components.filter(component => !!component)

    return(
      <Planets>
        {
          planets.map((component, index) => (
            <DraggablePlanet key={ index }
                             index={ index }
                             handleMove={ this.handleMove }
                             handleDrop={ handleDrop }
                             component={ component }
                             follow={handleFollow(component.get('name'))}
                             app={ app } />
          ))
        }
      </Planets>
    )
  }
}

function mapStateToProps(state, props) {
  return { }
}

function mapDispatchToProps(dispatch, props) {
  const { app } = props
  const handleFollow = name => event => {
    event.preventDefault()
    dispatch(push(`/apps/${app.get('name')}/components/${name}`))
  }
  const handleDrop = (id, index) =>
    dispatch(sortComponents(app.get('name'), id, index))

  return { handleDrop, handleFollow }
}

const connector = connect(mapStateToProps, mapDispatchToProps)
export default connector(DraggablePlanets)
