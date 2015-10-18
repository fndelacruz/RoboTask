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
        reviews: ReviewStore.all()
      });
    },

    _updateReviews: function() {
      this.setState({
        reviews: ReviewStore.all()
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

      return (
        <div>
          <Button
            bsStyle="primary"
            bsSize="medium"
            onClick={this.open}
          >
            Reviews
          </Button>

          <Modal show={this.state.showModal} onHide={this.close}>
            <Modal.Header closeButton>
              <Modal.Title>{this.props.worker.email}'s reviews...</Modal.Title>
            </Modal.Header>


            <Modal.Body>
              <div>
                [TODO: center profile pic. add background]
                <img
                  className="worker_profile"
                  src={ "https://robohash.org/" + this.props.worker.id } /><br/>
                {this.props.worker.email}<br/>
                Member since: {this.props.worker.created_at}<br/>
                [good tasks/total tasks here]<br/>
                [rating percentage here]<br/>

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
