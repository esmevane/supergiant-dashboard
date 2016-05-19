import React from 'react'

const UIAddSubtract = props =>{
  const { subject, label='', increase, decrease, className='' } = props

  return(
    <span className={ `addSubtractInt ${className}` }>
      <span className='addSubtractInt__subject'>
        <a href='#' onClick={ decrease } className='addSubtractInt__subject__subtract' />
        <span className='addSubtractInt__subject__text'>
          { subject }
        </span>
        <a href='#' onClick={ increase } className='addSubtractInt__subject__add' />
      </span>

      { ' ' }
      <span className='addSubtractInt__label'>
        { label }
      </span>
    </span>
  )
}

UIAddSubtract.propTypes = {
  subject:   React.PropTypes.number,
  label:     React.PropTypes.string,
  increase:  React.PropTypes.func,
  decrease:  React.PropTypes.func,
  className: React.PropTypes.string
}

export default UIAddSubtract
