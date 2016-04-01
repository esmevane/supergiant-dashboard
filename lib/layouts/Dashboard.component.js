import React from 'react'
import DraggableApps from '../apps/DraggableApps.container'
import NodeList from '../shared/NodeList.container'

const Dashboard = ({ addApp }) =>
  <section className='dashboard'>
    <button onClick={ addApp }>Create an app</button>
    <DraggableApps />
    <NodeList />
  </section>

Dashboard.propTypes = { addApp: React.PropTypes.func.isRequired }

export default Dashboard
