(function(root) {
  // this.props.worker
  'use strict';
  var Popover = ReactBootstrap.Popover;
  var Tooltip = ReactBootstrap.Tooltip;
  var Button = ReactBootstrap.Button;
  var Modal = ReactBootstrap.Modal;
  var OverlayTrigger = ReactBootstrap.OverlayTrigger;

  var popover = <Popover title="popover">Popover placeholder text</Popover>;
  var tooltip = <Tooltip>Tooltip placeholder text</Tooltip>;

  root.ReviewIndexModal = React.createClass({
    getInitialState: function() {
      return ({
        showModal: false,
        reviews: ReviewStore.all(),
        rating: ReviewStore.rating()
      });
    },

    renderApprovalRating: function() {
      if (this.props.worker.stats.total_tasks > 0) {
        return (
          <div className="text-center" id="worker-profile-rating">
            {this.props.worker.stats.approval_rating}% Approval rating
          </div>
        );
      } else { return (""); }
    },

    _updateReviews: function() {
      this.setState({ reviews: ReviewStore.all(), rating: ReviewStore.rating() });
    },

    componentDidMount: function() {
      ReviewStore.addChangeListener(this._updateReviews);
    },

    componentWillUnmount: function() {
      ReviewStore.removeChangeListener(this._updateReviews);
    },

    close: function() {
      ApiActions.receiveReviews([]);
      this.setState({ showModal: false });
    },

    open: function() {
      ApiUtil.fetchReviews(this.props.worker);
      this.setState({ showModal: true });
    },

    render: function() {
      var reviews = this.state.reviews;
      var rating = this.state.rating;
      return (
        <div>
          <Button
            bsStyle="link"
            bsSize="large"
            className="centered-buttons"
            onClick={this.open}
            id="reviews-index-modal-button"
          >
            Reviews
          </Button>

          <Modal className="modal-fix" show={this.state.showModal} onHide={this.close}>
            <Modal.Header closeButton>
              <Modal.Title>{this.props.shortName}'s reviews</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                <img
                  className="review-worker-profile-pic center-block"
                  src={this.props.worker.image}
                /><br/>
                <div className="text-center" id="worker-profile-shortName">
                  {this.props.shortName}
                </div>
                <h3 className="text-center">
                  {this.props.worker.stats.total_tasks} RoboTasks completed
                </h3>
                {this.renderApprovalRating()}
                <p className="text-center">
                  Member since: {this.props.worker.created_at}
                </p>
                {reviews.map(function(review) {
                  return <ReviewIndexModalItem review={review} key={review.id}/>;
                })}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.close}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    }
});
}(this));
