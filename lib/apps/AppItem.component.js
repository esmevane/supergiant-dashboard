import React from 'react'
import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'
import { Link } from 'react-router'
import * as DragTypes from '../shared/drag-types'

const dragSource = {
  beginDrag({ index, app }) {
    return { id: app.get('id'), index }
  }
}

const dropTarget = {
  hover(props, monitor, component) {
    const dragItem = monitor.getItem()
    const { index, id } = dragItem
    const hoverIndex = props.index

    if (index === hoverIndex) { return }

    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
    const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2
    const clientOffset = monitor.getClientOffset()
    const hoverClientY = clientOffset.y - hoverBoundingRect.top
    const hoverClientX = clientOffset.x - hoverBoundingRect.left

    if (index < hoverIndex && hoverClientY < hoverMiddleY) { return }
    if (index > hoverIndex && hoverClientY > hoverMiddleY) { return }
    if (index < hoverIndex && hoverClientX < hoverMiddleX) { return }
    if (index > hoverIndex && hoverClientX > hoverMiddleX) { return }

    props.handleMove && props.handleMove(index, hoverIndex)
    dragItem.index = hoverIndex
  },

  drop(props, monitor) {
    let { id, index } = monitor.getItem()

    props.handleDrop && props.handleDrop(id, index)
  }
}

const dragCollect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

const dropCollect = (connect) => ({ connectDropTarget: connect.dropTarget() })

class AppItem extends React.Component {
  render() {
    const { app, connectDragSource, connectDropTarget, isDragging } = this.props
    const style = { opacity: (isDragging ? 0 : 1), cursor: 'move' }
    const content = connectDropTarget(connectDragSource(
      <div className='apps-list-item' style={ style }>
        <Link to={ `/apps/${app.get('id')}` }>{ app.get('name') }</Link>
      </div>
    ))

    return content
  }
}

const dropConnector = DropTarget(DragTypes.App, dropTarget, dropCollect)
const dragConnector = DragSource(DragTypes.App, dragSource, dragCollect)
export default dragConnector(dropConnector(AppItem))
