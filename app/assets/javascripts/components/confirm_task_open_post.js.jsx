(function(root) {
  // this.props.task.worker_email
  // this.props.task
  // this.props.dateTime
  'use strict';
  var Button = ReactBootstrap.Button;
  var Modal = ReactBootstrap.Modal;
  var Header = ReactBootstrap.Header;
  var Input = ReactBootstrap.Input;

  root.ConfirmTaskOpenPost = React.createClass({
    mixins: [ReactRouter.History],

    getInitialState: function() {
      return ({
        showModal: false,
        message: "",
        inputDisabled: ""
      });
    },

    _assignTaskOpenOK: function() {
      this.setState({
        message: "TASK POSTED",
        inputDisabled: true
      });
      var that = this;
      var timeout = root.setTimeout(function() {
        that.close();
        clearTimeout(timeout);
        that.history.pushState(null, "/");
      }, 2000);
    },

    componentDidMount: function() {
      root.CreatedTaskStore.addAssignTaskWorkerOKListener(this._assignTaskOpenOK);
    },

    componentWillUnmount: function() {
      root.CreatedTaskStore.removeAssignTaskWorkerOKListener(this._assignTaskOpenOK);
    },

    _getInterval: function() {
      var interval;
      switch (this.props.dateTime.getHours()) {
        case 0:
          interval = "Anytime";
          break;
        case 8:
          interval = "Morning";
          break;
        case 12:
          interval = "Afternoon";
          break;
        case 16:
          interval = "Evening";
          break;
        default:
          debugger
      }
      return interval;
    },


    close: function() {
      this.setState({ showModal: false });
    },

    open: function() {
      this.setState({ showModal: true });
    },

    _disabledSubmit: function() {
      // NOTE: delete this console.log eventually
      console.log("Can't submit anymore!");
    },

    render: function() {
      // NOTE: if don't end up using popover or tooltip here, delete these
      var task = this.props.task;
      var dateTime = this.props.dateTime;
      var wage = this.props.wage;
      var handleSubmit = this.props.chooseWorker;
      var isDisabled = false;

      if (this.state.inputDisabled === true ) {
        isDisabled = true;
        handleSubmit = this._disabledSubmit;
      }
      debugger;
      return (
        <div>
          <Button
            bsStyle="success"
            bsSize="medium"
            className="centered-buttons"
            onClick={this.open}
            id="confirm-hire-modal-button"
          >
            Select!
          </Button>

          <Modal show={this.state.showModal} onHide={this.close}>
            <Modal.Header closeButton>
              <Modal.Title><strong>Confirm Task Posting</strong></Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                <h1 className="text-center" id="worker-profile-shortName">Post task at §{wage}/hr?</h1>
                <div className="task-date-scheduled">{dateTime[0]}</div>
                <div className="task-time-scheduled">{dateTime[1]}</div><br/>

                <span className="task-title">{task.title}</span><br/>
                <div className="task-title-divider" />
                <span className="task-location">{task.location}</span><br/>
                <span className="task-description">{task.description}</span><br/>
                <Modal.Footer>
                  <div className="hire-button-containers">
                    <Button
                      onClick={this.close}
                      bsSize="large"
                      id="hire-confirm-back-button">
                      Back
                    </Button>
                    <div id="hire-confirmation">
                      {this.state.message}
                    </div>
                    <Button
                      onClick={handleSubmit}
                      bsSize="large"
                      bsStyle="primary"
                      disabled={isDisabled}>
                      Confirm
                    </Button>
                  </div>
                </Modal.Footer>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      );
    }
});
}(this));
