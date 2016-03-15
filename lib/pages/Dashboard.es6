import React from 'react'
import { connect } from 'react-redux'
import CloudOverview from '../components/CloudOverview'

export class Dashboard extends React.Component {
  render() {
    return(
      <section className='dashboard'>
        <CloudOverview />
        <footer>
          <h5>{ this.props.cloud.get('region') }</h5>
        </footer>
      </section>
    )
  }
}

function mapStateToProps(state) {
  const clouds = state.get('clouds')
  const id = clouds.get('active').first()

  const cloud = clouds.get('contents').filter(cloud => cloud.get('id') === id)

  return { cloud }
}

export default connect(mapStateToProps)(Dashboard)
