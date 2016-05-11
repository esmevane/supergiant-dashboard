import React from 'react'

const FeedbackInput = props => {
  const { className = ``, prompt, type = `text`, value, ...rest } = props
  const extraClasses = value.touched && value.error ? `form-input-invalid` : ``

  return(
    <input placeholder={ prompt }
           type={ type }
           className={ [className, extraClasses].join(` `) }
           { ...value }
           { ...rest } />
  )
}

FeedbackInput.propTypes = {
  prompt: React.PropTypes.string,
  type: React.PropTypes.string,
  value: React.PropTypes.object.isRequired
}

export default FeedbackInput
