import React from 'react'
import { connect } from 'react-redux'

export class NodeList extends React.Component {
  render() {
    return(
      <section className='nodes'>
        <h2>Cloud resource nodes</h2>
        <ul>
          {
            this.props.contents.map((resource, index) => (
              <li key={ index }>
                { resource.get('name') } ({ resource.get('size') })
              </li>
            ))
          }
        </ul>
      </section>
    )
  }
}

function mapStateToProps(state) {
  let contents = state.getIn(['nodes', 'contents'])

  return { contents }
}

export default connect(mapStateToProps)(NodeList)