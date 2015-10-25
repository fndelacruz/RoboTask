(function(root) {
  // this.props.task.worker_email
  // this.props.task
  // this.props.dateTime
  'use strict';
  var Button = ReactBootstrap.Button;
  var Modal = ReactBootstrap.Modal;
  var Header = ReactBootstrap.Header;
  var Input = ReactBootstrap.Input;

  root.ConfirmHireModal = React.createClass({
    mixins: [ReactRouter.History],

    getInitialState: function() {
      // NOTE: Idealy, want to limit this reviews state to only a few reviews
      // via pagination. for now, will just fetch them all!
      return ({
        showModal: false,
        message: "",
        inputDisabled: ""
      });
    },

    _assignWorkerOK: function() {
      this.setState({
        message: "HIRED",
        inputDisabled: true
      });
      var that = this;
      var timeout = root.setTimeout(function() {
        that.close();
        clearTimeout(timeout);
        that.history.pushState(null, "/home");
      }, 2000);
    },

    _test: function() {

    },

    componentDidMount: function() {
      root.CreatedTaskStore.addAssignTaskWorkerOKListener(this._assignWorkerOK);
    },

    componentWillUnmount: function() {
      root.CreatedTaskStore.removeAssignTaskWorkerOKListener(this._assignWorkerOK);
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
      var worker = this.props.worker;
      var dateTime = this.props.dateTime;

      var successHandler = this.props.successHandler;

      var handleSubmit = this.props.chooseWorker;
      var isDisabled = false;

      if (this.state.inputDisabled === true ) {
        isDisabled = true;
        handleSubmit = this._disabledSubmit;
      }
      // debugger;
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
              <Modal.Title>Confirm RoboTasker</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                <img
                  className="confirm-worker-profile-pic center-block"
                  src={ worker.image } /><br/>


                <h1 className="text-center worker-profile-shortName">Hire {this.props.shortName} ?</h1>
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
