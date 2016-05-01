import React from 'react'

const Star = ({ onClick }) => <figure className='star' onClick={ onClick } />

Star.propTypes = { onClick: React.PropTypes.func.isRequired }

export default Star
