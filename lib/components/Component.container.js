import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Component from './Component.component'

function mapStateToProps(state, props) { return {} }

function mapDispatchToProps(dispatch, props) {
  let follow = event => {
    let { app, component } = props
    let uri = `/apps/${app.get('name')}/components/${component.get('name')}`
    event.preventDefault()
    dispatch(push(uri))
  }

  return { follow }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
