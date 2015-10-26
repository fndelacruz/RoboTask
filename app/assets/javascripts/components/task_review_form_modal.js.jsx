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
  var Input = ReactBootstrap.Input;
  var Glyphicon = ReactBootstrap.Glyphicon;

  root.TaskReviewFormModal = React.createClass({
    getInitialState: function() {
      // NOTE: Idealy, want to limit this reviews state to only a few reviews
      // via pagination. for now, will just fetch them all!
      return ({
        showModal: false,
        isPositive: "",
        isPositiveStatus: "",
        isPositiveStatusMessage: "",
        description: "",
        descriptionEntry: "",
        descriptionStatus: "",
        descriptionStatusMessage: ""
      });
    },

    _updateReviews: function() {
      this.setState({
      });
    },

    handleChange: function(e) {
      switch (e.currentTarget.id) {
        case "review-description-entry":
          this.setState({
            descriptionEntry: e.currentTarget.value,
            descriptionStatus: "",
            descriptionStatusMessage: ""
          });
          break;
        case "is-positive-true":
          this.setState({ isPositive: true });
          break;
        case "is-positive-false":
          this.setState({ isPositive: false });
          break;
        default:
          debugger
      }
    },

    handleSubmission: function() {
      var hasDescription = (this.state.descriptionEntry !== "");
      var isMarked = (this.state.isPositive !== "");

      if (hasDescription && isMarked) {
        // NOTE: I want a delay for this form not to disappear as soon as it is
        // submitted. try to incorporate a delay
        ApiUtil.createReview({
          creator_id: root.CURRENT_USER_ID,
          task_id: this.props.task.id,
          description: this.state.descriptionEntry,
          is_positive: this.state.isPositive
        });
        this.setState({
          description: this.state.descriptionEntry,
          descriptionStatus: "success",
          descriptionStatusMessage: "Thanks for using Robotask!",
          isPositiveStatus: "success",
          isPositiveStatusMessage: "",
        });


      } else {
        if (!hasDescription) {
          this.setState({
            description: "",
            descriptionStatus: "error",
            descriptionStatusMessage: "Can't be blank."
          });
        } else {
          this.setState({
            descriptionStatus: "success",
            descriptionStatusMessage: ""
          });
        }
        if (!isMarked) {
          this.setState({
            isPositive: "",
            isPositiveStatus: "error",
            isPositiveStatusMessage: "Select yes or no."
          });
        } else {
          this.setState({
            isPositiveStatus: "success",
            isPositiveStatusMessage: ""
          });
        }
      }
    },

    _getIsPositiveStatusGlyph: function() {
      switch (this.state.isPositiveStatus) {
        case "success":
          return <Glyphicon glyph="ok" className="yes-no-icon" id="icon-ok" />;
        case "error":
          return <Glyphicon glyph="remove" className="yes-no-icon" id="icon-bad" />;
        default:
          return "";
      }
    },

    _checkDescriptionStatus: function() {
      switch (this.state.descriptionStatus) {
        case "success":
          return "notification-message-success";
        case "error":
          return "notification-message-error";
        default:
          return "";
      }
    },

    _getIsPositiveStatusMessageType: function() {
      switch (this.state.isPositiveStatus) {
        case "success":
          return "notification-message-success";
        case "error":
          return "notification-message-error";
        default:
          return "";
      }
    },

    close: function() {
      // ApiActions.receiveReviews([]);
      this.setState({
        showModal: false,
        isPositive: "",
        isPositiveStatus: "",
        isPositiveStatusMessage: "",
        description: "",
        descriptionEntry: "",
        descriptionStatus: "",
        descriptionStatusMessage: ""
      });
    },

    open: function() {
      // ApiUtil.fetchReviews(this.props.worker);
      this.setState({ showModal: true });
    },

    render: function() {
      var worker_shortname = this.props.task.worker_shortname;
      var statusIsPositiveGlyph = this._getIsPositiveStatusGlyph();

      var isPositiveStyle = this._getIsPositiveStatusMessageType();
      var descriptionStyle = this._checkDescriptionStatus();
      return (
        <div>
          <Button
            bsStyle="primary"
            bsSize="medium"
            id="created-task-button-complete-or-find-worker"
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
                <div className="page-heading">Would you recommend {worker_shortname} to others? </div>
                <div className="btn-group" data-toggle="buttons">
                  <label
                    className="btn btn-primary"
                    onClick={this.handleChange}
                    id="is-positive-true">
                    <input type="radio" />Yes
                  </label>
                  <label
                    className="btn btn-primary"
                    onClick={this.handleChange}
                    id="is-positive-false">
                    <input type="radio" />No
                  </label>
                </div>
                {statusIsPositiveGlyph}<span className="notification-message" id={isPositiveStyle}> {this.state.isPositiveStatusMessage}</span><br/><br/>
                <div className="notification-message review-description-notification-message" id={descriptionStyle}>{this.state.descriptionStatusMessage}</div>
                <div className="form-group">
                  <label htmlFor="review-description-entry">Details</label>
                  <Input
                    type="textarea"
                    className="form-control"
                    id="review-description-entry"
                    value={this.state.descriptionEntry}
                    onChange={this.handleChange}
                    bsStyle={this.state.descriptionStatus}
                    hasFeedback={true}
                    placeholder={"Example: " + worker_shortname + " was a great worker. very quick. I will choose him for all my future task needs"}
                  />
                </div><br/>

                <div id="submit-review-button-container">
                  <Button onClick={this.handleSubmission} bsStyle="primary" id="submit-review-button">Submit Review</Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      );
    }
});
}(this));
