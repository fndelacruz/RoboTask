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
      return ({
        showModal: false,
        message: "",
        inputDisabled: ""
      });
    },

    _assignWorkerOK: function() {
      this.setState({ message: "HIRED", inputDisabled: true });
      var that = this;
      var timeout = root.setTimeout(function() {
        that.close();
        clearTimeout(timeout);
        that.history.pushState(null, "/");
      }, 2000);
    },

    componentDidMount: function() {
      TaskStore.addAssignTaskWorkerOKListener(this._assignWorkerOK);
    },

    componentWillUnmount: function() {
      TaskStore.removeAssignTaskWorkerOKListener(this._assignWorkerOK);
    },

    close: function() {
      this.setState({ showModal: false });
    },

    open: function() {
      this.setState({ showModal: true });
    },

    render: function() {
      var task = this.props.task;
      var worker = this.props.worker;
      var dateTime = this.props.dateTime;
      var shortName = this.props.shortName;
      var successHandler = this.props.successHandler;
      var handleSubmit = this.props.chooseWorker;
      var isDisabled = false;

      if (this.state.inputDisabled === true ) {
        isDisabled = true;
        handleSubmit = this._disabledSubmit;
      }
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
              <Modal.Title><strong>Confirm RoboTasker</strong></Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                <img
                  className="confirm-worker-profile-pic center-block"
                  src={ worker.image } /><br/>

                <h1 className="text-center" id="worker-profile-shortName">
                  Hire {shortName} at §{this.props.worker.wage}/hr?
                </h1>
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
