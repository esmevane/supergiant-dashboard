import React from 'react'

const classNames = (value) => {
  let isInvalid = value.touched && value.error

  return isInvalid ? `form-input-invalid` : ``
}

const FeedbackInput = ({ prompt, type, value, ...rest }) =>
  <input placeholder={ prompt }
         type={ type }
         className={ classNames(value) }
         { ...value }
         { ...rest } />

FeedbackInput.propTypes = {
  prompt: React.PropTypes.string,
  type: React.PropTypes.string.isRequired,
  value: React.PropTypes.object.isRequired
}

export default FeedbackInput
