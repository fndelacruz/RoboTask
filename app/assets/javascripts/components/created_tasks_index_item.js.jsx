(function(root) {
  'use strict';
  // this.props.createdTask
  var Button = ReactBootstrap.Button;

  root.CreatedTasksIndexItem = React.createClass({
    mixins: [ReactRouter.History],

    // NOTE: Ideally, want to popup a warning before deleting a task, or some
    // kind of double guessing
    cancelTask: function() {
      root.ApiUtil.deleteTask(this.props.createdTask);
    },

    _findValidWorkers: function(task) {
      var idx = root.CreatedTaskStore.all().indexOf(task);
      this.history.pushState(null, "/task/" + idx + "/findWorker");
    },

    render: function() {
      var task = this.props.createdTask;
      // var workerId = (task.worker_id === null) ? "UNASSIGNED" : task.worker_id;

      // NOTE: This is bad. not DRY. but not sure how to conditionally render
      // the delete link depending if workerId === null... FIX THIS SOON
      return (
        <div className="panel">
          <div className="component-container-index-item" id="created-tasks-index-item">
            title: {task.title}<br/>
            description: {task.description}<br/>
            location: {task.location}<br/>
            created: {task.created_at}<br/>
            worker: {task.worker_id === null ? "UNASSIGNED" : task.worker_id}<br/>

            <Button
              bsStyle="danger"
              bsSize="medium"
              onClick={this.cancelTask}
            >Cancel Task</Button>

            {task.worker_id === null ?
              <Button
                bsStyle="success"
                bsSize="medium"
                onClick={this._findValidWorkers.bind(null, task)}
              >Find Worker</Button>
            :
              <Button
                bsStyle="danger"
                bsSize="medium"
                onClick={this.taskComplete}
              >Task Complete!</Button>
            }
          </div>
        </div>
      );
    }
  });

}(this));
