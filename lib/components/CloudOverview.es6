import React from 'react'
import AppList from './AppList'
import NodeList from './NodeList'

export default class CloudOverview extends React.Component {
  render() {
    return(
      <section className='cloud-overview'>
        <AppList />
        <NodeList />
      </section>
    )
  }
}
