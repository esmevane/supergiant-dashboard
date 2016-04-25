import { connect } from 'react-redux'
import { remove } from './notifications.actions'
import { getNotifications } from '../selectors'
import NotificationBar from './NotificationBar.component'

function mapStateToProps(state) {
  return { notifications: getNotifications(state) }
}

function mapDispatchToProps(dispatch) {
  const close = id => event => {
    event.preventDefault()
    dispatch(remove(id))
  }

  return { close }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationBar)
