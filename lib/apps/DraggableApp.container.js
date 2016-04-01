import React from 'react'
import { DragSource, DropTarget } from 'react-dnd'
import { isMap } from '../shared/immutable.prop-types'
import * as DragTypes from '../shared/drag-types'
import { tick } from '../shared/draggable-hover.behavior'
import App from './App.container'

const dragSource = {
  beginDrag({ index, app }) { return { id: app.get('name'), index } }
}

const mapDragToProps = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

const dragConnector = DragSource(DragTypes.App, dragSource, mapDragToProps)

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

const dropConnector = DropTarget(DragTypes.App, dropTarget, mapDropToProps)

class DraggableApp extends React.Component {
  static propTypes = {
    app: isMap,
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
        <App { ...rest } />
      </div>
    ))
  }
}

export default dragConnector(dropConnector(DraggableApp))
