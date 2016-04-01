import React from 'react'

const FeedbackInput = ({ prompt, type, value, ...rest }) =>
  <input placeholder={ prompt } type={ type } { ...value } { ...rest } />

FeedbackInput.propTypes = {
  prompt: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  value: React.PropTypes.object.isRequired
}

export default FeedbackInput
