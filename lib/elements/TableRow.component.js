import React from 'react'

const TableRow = ({ children, className = `` }) =>
  <div className={ `table-row ${className}` }>
    { children }
  </div>

TableRow.propTypes = {
  className: React.PropTypes.string,
  children: React.PropTypes.node
}

export default TableRow
