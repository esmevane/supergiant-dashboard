import React from 'react'

const displayName = entity => {
  let base = entity.get('name')
  let tags = entity.getIn(['metadata', 'tags'])
  let name = tags && tags.filter(tag => tag.get('name') === 'name').first()

  return name ? name.get('value') : base
}

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
