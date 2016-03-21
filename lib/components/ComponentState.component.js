import React from 'react'
import { hexToRGBA } from './components.behavior'
import { isMap } from '../shared/immutable.prop-types'

export default class ComponentState extends React.Component {
  static propTypes = {
    component: isMap,
    submit: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    const { component } = props

    this.state = {
      name: component.get('name'),
      instances: component.get('instances') || 0,
      changed: false
    }
  }

  handleChange = (event) => {
    this.setState({
      changed: true,
      [event.target.name]: event.target.value
    })
  };

  handleSubmit = (event) => {
    event.preventDefault()

    const { component } = this.props
    const { name, instances } = this.state
    const id = component.get('id')

    this.props.submit(id, { name, instances })
    this.setState({ changed: false })
  };

  render() {
    const { component } = this.props
    const { name, instances, changed } = this.state
    const backgroundColor = hexToRGBA(component.get('color'))

    return(
      <section className='components-detail-main'>
        <form onSubmit={ this.handleSubmit }>
          <h3 style={ { borderBottom: `3px solid ${backgroundColor}` } }>

            <span className='component-color-dot'
                  style={ { backgroundColor } } />

            <input type='text'
                   name='name'
                   ref='name'
                   style={ { width: '90%', margin: 0 } }
                   className='discrete'
                   onChange={ this.handleChange }
                   value={ name } />
          </h3>
          <dl>
            <dt>Type:</dt>
            <dd>{ component.get('type') }</dd>
            <dt>Instances:</dt>
            <dd>
              <input type='number'
                     name='instances'
                     ref='instances'
                     style={ { margin: 0 } }
                     onChange={ this.handleChange }
                     className='discrete'
                     value={ instances } />
            </dd>
            <dt>Containers:</dt>
            <dd>
              <ul>
                <li>Container a/Imagename</li>
              </ul>
            </dd>
            <dt>Volumes:</dt>
            <dd>
              <ul>
                <li>Volume a</li>
              </ul>
            </dd>
          </dl>
          <button disabled={ true }>
            Restart
          </button>
          <button type='submit'
                  onClick={ this.handleSubmit }
                  disabled={ !changed }>
            Deploy
          </button>
        </form>
      </section>
    )
  }
}
