import React from 'react'
import ComponentLink from './ComponentLink.component'
import { isMap } from '../shared/immutable.prop-types'
import { DragSource, DropTarget } from 'react-dnd'
import * as DragTypes from '../shared/drag-types'
import { tick } from '../shared/draggable-hover.behavior'

/**
 * Define an adapter object that helps React DND map functionality to our
 * draggable domain.
 *
 * @type {Object}
 */
const dragSource = {
  beginDrag({ index, component }) { return { id: component.get('id'), index } }
}

/**
 * Define a function that maps React DND connect and monitor objects to props
 * names.
 *
 * @param  {object} connect React DND connect object
 * @param  {object} monitor React DND monitor object
 * @return {object}         Declaration object for props names
 */
const mapDragToProps = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

/**
 * Create a decorator function which we'll later use to distribute React DND
 * functionality to this container.
 *
 * @param {string}   DragTypes      The type of drag element we respond to
 * @param {object}   dragSource     A configuration object with domain behavior
 * @param {function} mapDragToProps A property definer for the container
 */
const dragConnector = DragSource(
  DragTypes.Component,
  dragSource,
  mapDragToProps
)

/**
 * dropTarget is a configuration object that React DND uses to define behavior.
 * In this case the behavior hands a specific callback (handleMove) to a
 * function which is called every tick.  That passes back a function that
 * accepts props, monitor, and component in order to power the actual React
 * DND functionality.
 *
 * @type {Object}
 */
const dropTarget = {
  /**
   * This function is called every time a hover tick is registered on the
   * AppItem container.  Actual drag behavior comes from an outside file.  We
   * pass in a component specific callback in case it needs it, and then we
   * manually invoke the tick.
   *
   * In this specific case, handleMove reorders the apps visually as we're
   * dragging them about, creating the visual effect of a move occurring.
   *
   * @param  {object} props     component's props object
   * @param  {object} monitor   React DND specific needs.
   * @param  {object} component React DND specific needs.
   */
  hover(props, monitor, component) {
    const hoverTick = tick(props.handleMove)

    hoverTick(props, monitor, component)
  },

  /**
   * This function is only called when a drop event occurs.  This is where the
   * actual reorder action gets called.
   *
   * @param  {object} props     Component's props object
   * @param  {object} monitor   React DND specific needs.
   */
  drop(props, monitor) {
    let { id, index } = monitor.getItem()

    props.handleDrop && props.handleDrop(id, index)
  }
}

/**
 * Define the drop-specific properties which will be passed in to the
 * container.
 *
 * @param  {object} connect A React DND specific object.
 * @return {object}         An object that defines extra container props.
 */
const mapDropToProps = (connect) => (
  { connectDropTarget: connect.dropTarget() }
)

/**
 * Create a decorator which passes in the drop functionality from React DND.
 *
 * @param {string}   DragTypes      The type of drag element we respond to
 * @param {object}   dropTarget     A configuration object with domain behavior
 * @param {function} mapDropToProps A property definer for the container
 */
const dropConnector = DropTarget(
  DragTypes.Component,
  dropTarget,
  mapDropToProps
)

/**
 * DraggableComponent is a styled wrapper around a ComponentLink, designed to
 * exist inside of a component which can pass in a list of apps, and two
 * callbacks: handleMove and handleDrop.
 */
class DraggableComponent extends React.Component {
  static propTypes = {
    /**
     * An immutable map with a name and id.
     */
    component: isMap,
    /**
     * Calculation run every time a drag event is received.
     */
    handleMove: React.PropTypes.func.isRequired,
    /**
     * Callback which is run whenever a drop event occurs.
     */
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
      <div className='components-list-item' style={ style }>
        <ComponentLink { ...rest } />
      </div>
    ))
  }
}

/**
 * Now finally we're going to invoke the decorators and export the container.
 */
export default dragConnector(dropConnector(DraggableComponent))