import React from 'react'
import kebabCase from 'lodash/kebabCase'
import styles from './styles.module.css'

export default class ControlVolume extends React.Component {
  render() {
    const { index, name, type, path, size, disabled, remove } = this.props

    return(
      <div>
        <div>
          { kebabCase(name.value || 'Unknown') }
          { ` (volume ${index})` }
        </div>
        <input placeholder='Volume name'
               type='text'
               { ...name }
               disabled={ disabled } />
        <input placeholder='Volume path'
               type='text'
               { ...path }
               disabled={ disabled } />
        <div>
          <label>
            <input type='radio'
                   { ...type }
                   checked={ type.value === 'gp2' }
                   value='gp2' />
            <span className='button'>SSD</span>
          </label>
          <label>
            <input type='radio'
                   { ...type }
                   checked={ type.value === 'st1' }
                   value='st1' />
            <span className='button'>Magnetic</span>
          </label>
          <label>
            <input type='radio'
                   { ...type }
                   checked={ type.value === 'io1' }
                   value='io1' />
            <span className='button'>IOPS</span>
          </label>
        </div>
        <input placeholder='10'
               type='number'
               { ...size }
               disabled={ disabled } />
        <button onClick={ remove } disabled={ disabled } >
          <span>
            Remove this volume
          </span>
          <i className="fa fa-minus-circle" />
        </button>
      </div>

    )
  }
}
