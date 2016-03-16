import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { reorder } from '../apps/apps.actions'
import { orderedApps } from './apps.behavior'
import AppList from './AppList.component'
import DraggableApp from './DraggableApp.container'

class DraggableAppList extends React.Component {
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
    const { handleDrop } = this.props
    const { apps } = this.state

    return(
      <AppList { ...(this.props) }>
        {
          apps.map((app, index) => (
            <DraggableApp index={ index }
                          handleMove={ this.handleMove }
                          handleDrop={ handleDrop }
                          key={ app.get('id') }
                          app={ app } />
          ))
        }
      </AppList>
    )
  }
}

function mapStateToProps(state) {
  let appState = state.get('apps')
  let order = appState.get('order')
  let apps = orderedApps(order, appState.get('contents'))

  return { apps }
}

function mapDispatchToProps(dispatch) {
  const handleDrop = (id, index) => dispatch(reorder(id, index))

  const onNew = (event) => {
    event.preventDefault()

    dispatch(push('/apps/new'))
  }

  return { handleDrop, onNew }
}

const connector = connect(mapStateToProps, mapDispatchToProps)
export default connector(DraggableAppList)
