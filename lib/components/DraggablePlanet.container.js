import React from 'react'
import { DragSource, DropTarget } from 'react-dnd'
import { tick } from '../shared/draggable-hover.behavior'
import * as DragTypes from '../shared/drag-types'
import Planet from './Planet.component'

const dragSource = {
  beginDrag({ index, component }) {
    return { id: component.get('name'), index }
  }
}

const mapDragToProps = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

const dragConnector = DragSource(
  DragTypes.Component,
  dragSource,
  mapDragToProps
)

const dropTarget = {
  hover(props, monitor, component) {
    const hoverTick = tick(props.handleMove)

    hoverTick(props, monitor, component)
  },

  drop(props, monitor) {
    let { id, index } = monitor.getItem()

    props.handleDrop && props.handleDrop(id, index)
  }
}

const mapDropToProps = (connect) => (
  { connectDropTarget: connect.dropTarget() }
)

const dropConnector = DropTarget(
  DragTypes.Component,
  dropTarget,
  mapDropToProps
)

class DraggablePlanet extends React.Component {
  static propTypes = {
    handleMove: React.PropTypes.func.isRequired,
    handleDrop: React.PropTypes.func.isRequired
  }

  render() {
    const {
      connectDragSource,
      connectDropTarget,
      isDragging,
      ...rest
    } = this.props

    const style = { opacity: (isDragging ? 0 : 1), cursor: 'move' }

    return connectDragSource(connectDropTarget(
      <div style={ style }>
        <Planet { ...rest } />
      </div>
    ))
  }
}

export default dragConnector(dropConnector(DraggablePlanet))
