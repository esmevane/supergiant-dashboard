import React from 'react'
import DraggableAppList from '../apps/DraggableAppList.container'
import NodeList from '../nodes/NodeList.component'

export default class CloudOverview extends React.Component {
  render() {
    return(
      <div className='cloud-overview'>
        <DraggableAppList />
        <NodeList />
      </div>
    )
  }
}
