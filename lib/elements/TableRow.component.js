import React from 'react'

const TableRow = ({ children }) =>
  <div className='table-row'>{ children }</div>

TableRow.propTypes = { children: React.PropTypes.node.isRequired }

export default TableRow
