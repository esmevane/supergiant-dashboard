import React from 'react'
import styles from './styles.module.css'

export default class ControlPort extends React.Component {
  render() {
    const {
      index,
      protocol,
      number,
      public: isPublic,
      per_instance: perInstance,
      external_number: externalNumber,
      entrypoint_domain: entrypointDomain,
      disabled,
      remove
    } = this.props

    return(
      <div>
        <input placeholder='Internal Number'
               type='text'
               disabled={ disabled }
               { ...number } />
        <input placeholder='Port Protocol'
               type='text'
               disabled={ disabled }
               { ...protocol } />
        <label>
          <input type='checkbox' { ...isPublic } disabled={ disabled } />
          Is this port public?
        </label>
        {
          isPublic.value && (
            <div>
              <input placeholder='External Number'
                     type='text'
                     disabled={ disabled }
                     { ...externalNumber } />
              <input placeholder='Entrypoint Domain'
                     type='text'
                     disabled={ disabled }
                     { ...entrypointDomain } />
            </div>
          )
        }
        <label>
          <input type='checkbox' { ...perInstance } disabled={ disabled } />
          Expose on every instance?
        </label>
        <button onClick={ remove } disabled={ disabled }>
          <span>
            Remove this port
          </span>
          <i className="fa fa-minus-circle" />
        </button>
      </div>
    )
  }
}
