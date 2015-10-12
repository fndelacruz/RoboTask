# Phase 4: Add notification/message system (1 day)

## Rails
### Models
* Notifications

### Controllers
* Api::NotificationsController (create, index, show)

### Views
* notifications/index.json.jbuilder
* notifications/show.json.jbuilder

## Flux
### Views (React Components)
* NotificationsIndex
  -NotificationsIndexItem

### Stores
* Notification

### Actions
* ApiActions.receiveAllNotifications
* ApiActions.receiveNotification
* ApiActions.alertUserNewNotification

### ApiUtil
* ApiUtil.createNotification (->Api::NotificationsController:create)
* ApiUtil.fetchAllNotifications (->Api::NotificationsController:index)
* ApiUtil.fetchNotification (->Api::NotificationsController:show)

## Gems/Libraries
