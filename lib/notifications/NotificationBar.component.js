import React from 'react'
import SlideChange from '../shared/SlideChange.animation'

const notificationClasses = (notification) =>
  `notification-bar-content notification-bar-${notification.get('level')}`

const Notification = ({ notification, onClick }) =>
  <div className='notification-bar-item' key={ notification.get('id') }>
    <div className={ notificationClasses(notification) }>
      <div className='notification-bar-message'>
        { notification.get('message') }
      </div>
      <div className='notification-bar-close'>
        <a href='#' onClick={e => { onClick(e) }} className='glyph glyph-x' />
      </div>
    </div>
  </div>

Notification.propTypes = {
  notification: React.PropTypes.object.isRequired,
  onClick: React.PropTypes.func.isRequired
}

const NotificationBar = ({ notifications, close }) =>
  <div className='notification-bar'>
    <SlideChange>
      {
        notifications.count() > 0 && notifications.map(notification => (
          <Notification notification={ notification }
                        key={ notification.get('id') }
                        onClick={ close(notification.get('id')) } />
        ))
      }
    </SlideChange>
  </div>

NotificationBar.propTypes = {
  notifications: React.PropTypes.object.isRequired,
  close: React.PropTypes.func.isRequired
}

export default NotificationBar
