import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import NewComponent from './NewComponent.component'

function mapStateToProps() { return {} }
function mapDispatchToProps(dispatch, props) {
  const appId = props
  const click = (event) => {
    event.preventDefault()
    dispatch(push(`/apps/${props.appId}/components/new`))
  }

  return { click }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewComponent)
