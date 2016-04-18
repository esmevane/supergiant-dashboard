import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import NewComponent from './NewComponent.component'

function mapStateToProps() { return {} }

function mapDispatchToProps(dispatch, props) {
  const appName = props
  const click = (event) => {
    event.preventDefault()
    dispatch(push(`/apps/${props.app.get('name')}/components/new`))
  }

  return { click }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewComponent)
