import React from 'react'

const ArticleTable = ({ children, className }) =>
  <article className={ `table-row lined ${className}` }>
    { children }
  </article>

ArticleTable.propTypes = {
  children: React.PropTypes.node.isRequired,
  className: React.PropTypes.string
}

export default ArticleTable
