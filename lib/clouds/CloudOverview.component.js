import React from 'react'
import ListApps from '../apps/ListApps.component'
import NodeList from '../nodes/NodeList.component'

export default class CloudOverview extends React.Component {
  render() {
    return(
      <div className='cloud-overview'>
        <ListApps />
        <NodeList />
      </div>
    )
  }
}
