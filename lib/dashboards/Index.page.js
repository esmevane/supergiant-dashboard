import React from 'react'
import { connect } from 'react-redux'
import CloudOverview from '../clouds/CloudOverview.component'

export class Dashboard extends React.Component {
  render() {
    return(
      <section className='dashboard'>
        <h5>{ this.props.cloud && this.props.cloud.get('region') }</h5>
        <CloudOverview />
      </section>
    )
  }
}

function mapStateToProps(state) {
  const clouds = state.get('clouds')
  const id = clouds.get('active').first()
  const matches = clouds.get('contents').filter(cloud => cloud.get('id') === id)

  return { cloud: matches.first() }
}

export default connect(mapStateToProps)(Dashboard)