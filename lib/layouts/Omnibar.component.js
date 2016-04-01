import React from 'react'

const Omnibar = ({ command }) =>
  <div className='omnibar'>
    <input type='text'
           className='omnibar-content'
           disabled={ true }
           value={ command } />
  </div>

Omnibar.propTypes = { command: React.PropTypes.string.isRequired }

export default Omnibar
