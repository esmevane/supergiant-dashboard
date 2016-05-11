import React from 'react'

const DetailStat = ({ children, className = `` }) =>
  <div className={ `app-detail-stat ${className}` }>
    { children }
  </div>

DetailStat.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string
}

export default DetailStat
