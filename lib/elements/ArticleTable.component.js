import React from 'react'

const ArticleTable = ({ children }) =>
  <article className='table-row lined'>{ children }</article>

ArticleTable.propTypes = { children: React.PropTypes.node.isRequired }

export default ArticleTable
