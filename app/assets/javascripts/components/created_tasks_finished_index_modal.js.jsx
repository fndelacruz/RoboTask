(function(root) {
  // this.props.tasks
  'use strict';
  var Popover = ReactBootstrap.Popover;
  var Tooltip = ReactBootstrap.Tooltip;
  var Button = ReactBootstrap.Button;
  var Modal = ReactBootstrap.Modal;
  var OverlayTrigger = ReactBootstrap.OverlayTrigger;

  // NOTE: if don't end up using popover or tooltip here, delete these
  var popover = <Popover title="popover">Popover placeholder text</Popover>;
  var tooltip = <Tooltip>Tooltip placeholder text</Tooltip>;

  root.CreatedTasksFinishedIndexModal = React.createClass({
    getInitialState: function() {
      return ({
        showModal: false,
      });
    },

    close: function() {
      this.setState({ showModal: false });
    },

    open: function() {
      this.setState({ showModal: true });
    },

    render: function() {
      var tasks = this.props.tasks;
      return (
        <div>
          <Button
            bsStyle="primary"
            bsSize="medium"
            onClick={this.open}
          >
            History
          </Button>

          <Modal show={this.state.showModal} onHide={this.close}>
            <Modal.Header closeButton>
              <Modal.Title>Task History</Modal.Title>
            </Modal.Header>


            <Modal.Body>
              <div>
                Look at your completed tasks here!<br/><br/>
                {(tasks.length === 0) ?
                  "Has anyone completed a task for you yet?..."
                :
                  ""
                }
                {tasks.map(function(task) {
                  return <CreatedTasksIndexItem createdTask={task} key={task.id}/>;
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
