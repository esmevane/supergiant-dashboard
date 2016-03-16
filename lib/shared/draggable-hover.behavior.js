import { findDOMNode } from 'react-dom'

/**
 * Tick is a function which takes a callback, and returns a React DND ready
 * function.  Essentially this returned function should describe horizontal
 * and vertical dragging behavior per tick.  If it determines that the hovering
 * destination is eligible, then it passes the current item index and the
 * hovered index back to the callback given.  The callback function is
 * responsible for implementing any logic that should result from this indexing
 * data.
 *
 * @param  {Function} done Callback to handle any drag changes to index data
 * @return {Function}      Hook function which connects hover behavior to DND
 */
export function tick(done) {
  return (props, monitor, component) => {
    const dragItem = monitor.getItem()
    const { index } = dragItem
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

    done && done(index, hoverIndex)
    dragItem.index = hoverIndex
  }
}
