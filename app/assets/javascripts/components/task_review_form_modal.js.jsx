(function(root) {
  // this.props.task.worker_email
  // this.props.task.
  'use strict';
  var Popover = ReactBootstrap.Popover;
  var Tooltip = ReactBootstrap.Tooltip;
  var Button = ReactBootstrap.Button;
  var Modal = ReactBootstrap.Modal;
  var OverlayTrigger = ReactBootstrap.OverlayTrigger;
  var Header = ReactBootstrap.Header;

  root.TaskReviewFormModal = React.createClass({
    getInitialState: function() {
      // NOTE: Idealy, want to limit this reviews state to only a few reviews
      // via pagination. for now, will just fetch them all!
      return ({
        showModal: false,
        description: ""
      });
    },

    _updateReviews: function() {
      this.setState({
      });
    },

    handleChange: function(e) {
      switch (e.currentTarget.id) {
        case "review-description-entry":
          this.setState({ description: e.currentTarget.value });
          break;
        case "is-positive-true":
          this.setState({ isPositive: true });
          break;
        case "is-positive-false":
          this.setState({ isPositive: false });
          break;
        default: debugger

      }
    },

    handleSubmission: function() {
      var hasDescription = (this.state.description !== "");
      var isMarked = (typeof this.state.isPositive !== "undefined");
      if (hasDescription && isMarked) {
        ApiUtil.createReview({
          creator_id: root.CURRENT_USER_ID,
          task_id: this.props.task.id,
          description: this.state.description,
          is_positive: this.state.isPositive
        });
      } else {
        if (!hasDescription) { console.log("Description can't be blank");}
        if (!isMarked) { console.log("Yes or no must be selected.");}
      }
      // NOTE: I believe using root.CURRENT_USER_ID is okay here because I check
      // if current_user.id is == root.CURRENT_USER_ID before saving this review
      // Check with TA if this is ok. otherwise, I can just have a creator_id
      // associated with the task the whole way through... HOWEVER, I would
      // check if task.creator_id == current_user.id anyway, so it seems
      // redundant to attach a creator_id to a task.
    },

    close: function() {
      // ApiActions.receiveReviews([]);
      this.setState({ showModal: false });
    },

    open: function() {
      // ApiUtil.fetchReviews(this.props.worker);
      this.setState({ showModal: true });
    },

    render: function() {
      // NOTE: if don't end up using popover or tooltip here, delete these
      var popover = <Popover title="popover">Popover placeholder text</Popover>;
      var tooltip = <Tooltip>Tooltip placeholder text</Tooltip>;

      var worker_email = this.props.task.worker_email;
      return (
        <div>
          <Button
            bsStyle="success"
            bsSize="medium"
            onClick={this.open}
          >
            Task complete!
          </Button>

          <Modal show={this.state.showModal} onHide={this.close}>
            <Modal.Header closeButton>
              <Modal.Title>Thanks for choosing RoboTask!</Modal.Title>
            </Modal.Header>


            <Modal.Body>
              <div>
                <div >Would you recommend {worker_email} to others?</div><br/>
                <div className="btn-group"
                     data-toggle="buttons">
                  <label
                    className="btn btn-primary"
                    onClick={this.handleChange}
                    id="is-positive-true">
                    <input
                      type="radio"
                    />Yes
                  </label>

                  <label
                    className="btn btn-primary"
                    onClick={this.handleChange}
                    id="is-positive-false">
                    <input
                      type="radio"
                    />No
                  </label>
                </div><br/><br/>

                <div className="form-group">
                  <label htmlFor="review-description-entry">Go on...</label>
                  <textarea
                    type="text"
                    className="form-control"
                    id="review-description-entry"
                    value={this.state.description}
                    onChange={this.handleChange}
                    placeholder={"Example: " + worker_email + " was a great worker. very quick. I'll choose him for all my future task needs"}
                  />
                </div>
                <br/><Button onClick={this.handleSubmission}>Submit Review</Button>
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
