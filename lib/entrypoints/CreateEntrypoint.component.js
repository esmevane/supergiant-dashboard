import React from 'react'
import FeedbackInput from '../shared/FeedbackInput.component'

export default class CreateEntrypoint extends React.Component {
  static propTypes = {
    submit: React.PropTypes.func.isRequired,
    fields: React.PropTypes.shape({
      domain: React.PropTypes.object.isRequired,
    }).isRequired
  }

  render() {
    const { submit, fields: { domain } } = this.props
    return(
      <form onSubmit={ submit(this.props) }>
        <h1>New entrypoint</h1>
        <FeedbackInput type='text'
                       prompt='example.com'
                       value={ domain }/>

        <button type='submit'>
          Create
        </button>
      </form>

    )
  }
}
