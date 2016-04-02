import React from 'react'

const classNames = (value) => {
  let isInvalid = value.touched && value.error

  console.log(isInvalid)

  return isInvalid ? `form-input-invalid` : ``
}

const FeedbackInput = ({ prompt, type, value, ...rest }) =>
  <input placeholder={ prompt }
         type={ type }
         className={ classNames(value) }
         { ...value }
         { ...rest } />

FeedbackInput.propTypes = {
  prompt: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  value: React.PropTypes.object.isRequired
}

export default FeedbackInput
