import React from 'react'
import ColorInput from 'react-input-color'
import FeedbackInput from '../shared/FeedbackInput.component'
import { orbitingPlanet } from '../visuals/orbitingPlanet'

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

  componentDidMount() { orbitingPlanet.start() }
  componentWillUnmount() { orbitingPlanet.stop() }

  render() {
    const { color, name, submit } = this.props
    const colorChange = newColor => color.onChange(newColor)

    return(
      <section className='create-component'>
        <header className='context-header'>
          <div className='context-title'>New Component</div>
          <div className='context-menu' />
        </header>

        <form onSubmit={ submit }>
          <div className='component-create-form'>
            <aside className='col-2'>
              <p className='text-note'>
                A <dfn>component</dfn> is a part of an application with a
                singular function, such as a database, search engine or
                framework.
              </p>

              <p className='text-note'>
                An application can be made up of many different components.
              </p>
            </aside>

            <fieldset className='component-create-form-fields col-4'>

              <label className='easy'>
                Create a new component for
                <span className='nowrap'> qbox-provisioner:</span>

                <FeedbackInput type='text'
                               prompt='My database'
                               value={ name }
                               className='easy'
                               autoFocus='true' />
              </label>

              <label className='easy'>
                What color is it?
                <ColorInput defaultValue='#828'
                            value={ color.value }
                            onChange={ colorChange }/>
              </label>

              <label className='easy'>
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

              <br />
              <label>
                <button type='submit' className='easy with-glyph glyph-right-arrow'>
                  Create
                </button>
              </label>
            </fieldset>
          </div>
        </form>
      </section>
    )
  }
}
