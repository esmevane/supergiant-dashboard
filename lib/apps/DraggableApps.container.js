import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { reorder } from './apps.actions'
import { createOrderedAppsSelector } from '../selectors'
import DraggableApp from './DraggableApp.container'
import Apps from './Apps.component'

class DraggableApps extends React.Component {
  constructor(props) {
    super(props)

    this.state = props
  }

  handleMove = (dragIndex, hoverIndex) => {
    const { apps } = this.state
    const dragApp = apps.get(dragIndex)

    let newApps = apps.splice(dragIndex, 1).splice(hoverIndex, 0, dragApp)
    this.setState({ apps: newApps })
  };

  render() {
    const { handleDrop, ...rest } = this.props
    const { apps } = this.state

    return(
      <Apps>
        {
          apps.map((app, index) => (
            <DraggableApp index={ index }
                          handleMove={ this.handleMove }
                          handleDrop={ handleDrop }
                          key={ app.get('name') }
                          app={ app } />
          ))
        }
      </Apps>
    )
  }
}

function mapStateToProps(state) {
  let getOrderedApps = createOrderedAppsSelector()
  return { apps: getOrderedApps(state) }
}

function mapDispatchToProps(dispatch) {
  const handleDrop = (id, index) => dispatch(reorder(id, index))

  return { handleDrop }
}

const connector = connect(mapStateToProps, mapDispatchToProps)
export default connector(DraggableApps)
