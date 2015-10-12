# Phase 5: Add notification/message system (1 day)

## Rails
### Models
* Reviews

### Controllers
* Api::ReviewsController (create, index, show)

### Views
* reviews/index.json.jbuilder
* reviews/show.json.jbuilder

## Flux
### Views (React Components)
* ReviewsIndex
  -ReviewsIndexItem
* ReviewsForm

### Stores
* Review

### Actions
* ApiActions.receiveAllReviews
* ApiActions.receiveReview
* ApiActions.alertUserNewReview

### ApiUtil
* ApiUtil.createReview (->Api::ReviewsController:create)
* ApiUtil.fetchAllReviews (->Api::ReviewsController:index)
* ApiUtil.fetchReview (->Api::ReviewsController:show)

## Gems/Libraries
