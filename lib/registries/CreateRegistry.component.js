import React from 'react'
import FeedbackInput from '../shared/FeedbackInput.component'

export default class CreateRegistry extends React.Component {
  static propTypes = {
    submit: React.PropTypes.func.isRequired,
    fields: React.PropTypes.shape({
      name: React.PropTypes.object.isRequired,
      key: React.PropTypes.object.isRequired
    }).isRequired
  }

  render() {
    const { submit, fields: { name, key } } = this.props
    return(
      <form onSubmit={ submit(this.props) }>
        <h1>hi</h1>
        <FeedbackInput type='text'
                       prompt='Name your repo key'
                       value={ name }/>

        <label className="easy">
          Copy in your docker private key
          <textarea { ...key }
                    style={{ height: '6em' }}
                    autoFocus='true' />
        </label>

        <button type='submit'>
          Create
        </button>
      </form>

    )
  }
}
