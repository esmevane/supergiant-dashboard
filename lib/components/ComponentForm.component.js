import React from 'react'
import ColorInput from 'react-input-color'
import FeedbackInput from '../shared/FeedbackInput.component'

const Icon = ({ content, image, color, selected }) => {
  const base = `create-component-form-icons-item`
  const classes = selected ? `${base} selected` : base
  const style = color ? { backgroundColor: color } : {}

  return(
    <div className={classes} style={ style }>
      { content && content.slice(0, 1) }
      { image && <img src={image} />}
    </div>
  )
}

export default class ComponentForm extends React.Component {
  static propTypes = {
    submit: React.PropTypes.func.isRequired,
    name: React.PropTypes.object.isRequired,
    color: React.PropTypes.object.isRequired
  }

  render() {
    const { color, name, submit } = this.props
    const colorChange = newColor => color.onChange(newColor)

    return(
      <section className='create-component'>
        <div className='create-component-overview'>
          <p>
            A <dfn>component</dfn> is a part of an application with a singular function, such as a database, search engine or framework.
          </p>
          <p>
            An application can be made up of many different components
          </p>
        </div>
        <div className='create-component-form'>
          <form onSubmit={ submit }>
            <label>
              Create a new component for qbox-provisioner
              <FeedbackInput type='text' prompt='My database' value={ name } />
            </label>
            <label>
              What color is it?
              <ColorInput defaultValue='#828'
                          value={ color.value }
                          onChange={ colorChange }/>
            </label>
            <label>
              What does it look like?
              <div className='create-component-form-icons'>
                <Icon content={ name.value }
                      selected={ true }
                      color={ color.value }/>

                <Icon selected={false} color={ color.value } />
                <Icon selected={false} color={ color.value } />
                <Icon selected={false} color={ color.value } />
                <Icon selected={false} color={ color.value } />
                <Icon selected={false} color={ color.value } />
              </div>
            </label>
            <div className='create-component-form-confirm'>
              <button type='submit'>
                Create
                <span className='carat'>»</span>
              </button>
              </div>
          </form>
        </div>
        <div className='create-component-preview' />
      </section>
    )
  }
}
