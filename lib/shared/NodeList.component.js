import React from 'react'
import { displayName } from '../shared/entities.behavior'

const NodeList = ({ contents }) =>
  <section className='nodes'>
    <h2>Cloud nodes</h2>
    <ul>
      {
        contents.map((node, index) => (
          <li key={ index }>
            { displayName(node) } ({ node.get('size') })
          </li>
        ))
      }
    </ul>
  </section>

NodeList.propTypes = { contents: React.PropTypes.object.isRequired }

export default NodeList
