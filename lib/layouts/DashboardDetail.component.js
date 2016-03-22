import React from 'react'
import CloudOverview from './CloudOverview.component'

export default class DashboardDetail extends React.Component {
  render() {
    return(
      <section className='dashboard'>
        <h5>{ this.props.cloud && this.props.cloud.get('region') }</h5>
        <CloudOverview />
      </section>
    )
  }
}
