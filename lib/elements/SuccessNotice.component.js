import React from 'react'

const SuccessNotice = ({ children }) =>
  <div className='notice success'>
    { children }
  </div>

SuccessNotice.propTypes = { children: React.PropTypes.node }

export default SuccessNotice
