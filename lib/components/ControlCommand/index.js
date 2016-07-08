import React from 'react'
import FlipChange from 'components/FlipChange'
import styles from './styles.module.css'

export default class ControlCommand extends React.Component {
  constructor(props) {
    super(props)

    this.state = { hasCommand: false }
  }

  render() {
    const { command, disabled, remove } = this.props
    const { hasCommand } = this.state

    const toggleCommand = event => {
      event.preventDefault()
      this.setState({ hasCommand: !hasCommand })
    }

    return(
      <FlipChange transitionAppear={ true } transitionLeave={ false }>
        {
          !hasCommand && (
            <button key='add-command'
                    disabled={ disabled }
                    onClick={ toggleCommand }
                    className={ styles.button }>
              <span className={ styles.label }>
                Add a startup command
              </span>
              <i className="fa fa-plus-circle" />
            </button>
          )
        }
        {
          hasCommand && (
            <div key='has-command'>
              <input placeholder='command'
                     type='text'
                     className={ styles.input }
                     disabled={ disabled }
                     { ...command } />
              <button disabled={ disabled }
                      onClick={ toggleCommand }
                      className={ styles.button }>
                <i className="fa fa-minus-circle" />
              </button>
            </div>
          )
        }
      </FlipChange>
    )
  }
}
