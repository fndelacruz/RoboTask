(function(root) {
  // this.props.worker
  'use strict';
  var Popover = ReactBootstrap.Popover;
  var Tooltip = ReactBootstrap.Tooltip;
  var Button = ReactBootstrap.Button;
  var Modal = ReactBootstrap.Modal;
  var OverlayTrigger = ReactBootstrap.OverlayTrigger;

  // NOTE: if don't end up using popover or tooltip here, delete these
  var popover = <Popover title="popover">Popover placeholder text</Popover>;
  var tooltip = <Tooltip>Tooltip placeholder text</Tooltip>;

  root.ReviewIndexModal = React.createClass({
    getInitialState: function() {
      // NOTE: Idealy, want to limit this reviews state to only a few reviews
      // via pagination. for now, will just fetch them all!
      return ({
        showModal: false,
        reviews: ReviewStore.all(),
        rating: ReviewStore.rating()
      });
    },

    _updateReviews: function() {
      this.setState({
        reviews: ReviewStore.all(),
        rating: ReviewStore.rating()
      });
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
      // var shortName = this.props.worker.fname + " " + this.props.worker.lname[0] + ".";
      // debugger
      return (
        <div>
          <Button
            bsStyle="primary"
            bsSize="medium"
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
                [TODO: center profile pic. add background]
                <img
                  className="review-worker-profile-pic center-block"
                  src={ "https://robohash.org/" + this.props.worker.id  + "?bgset=any"} /><br/>


                <div className="text-center" id="worker-profile-shortName">{this.props.shortName}</div>
                <div className="text-center" id="worker-profile-rating">{rating}% Approval Rating</div>
                <p className="text-center">Member since: {this.props.worker.created_at.slice(0,10).replace(/-/g,"/")}</p>

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
