(function(root) {
  // this.props.task.worker_email
  // this.props.task
  // this.props.dateTime
  'use strict';
  var Popover = ReactBootstrap.Popover;
  var Tooltip = ReactBootstrap.Tooltip;
  var Button = ReactBootstrap.Button;
  var Modal = ReactBootstrap.Modal;
  var OverlayTrigger = ReactBootstrap.OverlayTrigger;
  var Header = ReactBootstrap.Header;
  var Input = ReactBootstrap.Input;

  root.ConfirmHireModal = React.createClass({
    getInitialState: function() {
      // NOTE: Idealy, want to limit this reviews state to only a few reviews
      // via pagination. for now, will just fetch them all!
      return ({
        showModal: false,
      });
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

    render: function() {
      // NOTE: if don't end up using popover or tooltip here, delete these
      var popover = <Popover title="popover">Popover placeholder text</Popover>;
      var tooltip = <Tooltip>Tooltip placeholder text</Tooltip>;
      var task = this.props.task;
      var worker = this.props.worker;
      var dateTime = this.props.dateTime;
      // debugger;
      return (
        <div>
          <Button
            bsStyle="success"
            bsSize="medium"
            onClick={this.open}
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
                  src={ "https://robohash.org/" + worker.id } /><br/>


                <h1 className="text-center worker-profile-shortName">Hire {this.props.shortName} ?</h1>
                <div className="task-date-scheduled">{dateTime[0]}</div>
                <div className="task-time-scheduled">{dateTime[1]}</div><br/>

                <span className="task-title">{task.title}</span><br/>
                <div className="task-title-divider" />
                <span className="task-location">{task.location}</span><br/>
                <span className="task-description">{task.description}</span><br/>
                <Modal.Footer>
                  <Button
                    onClick={this.close}
                    bsSize="large"
                    id="hire-confirm-back-button">
                    Back
                  </Button>
                  <Button
                    onClick={this.props.chooseWorker}
                    bsSize="large"
                    bsStyle="primary">
                    Confirm
                  </Button>
                </Modal.Footer>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      );
    }
});
}(this));
