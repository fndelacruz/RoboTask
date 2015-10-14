(function(root) {
  'use strict';
  // this.props.createdTask

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
      var workerId = (task.worker_id === null) ? "UNASSIGNED" : task.worker_id;
      return (
        <li className="component-container-index-item" id="created-tasks-index-item">
          title: {task.title}<br/>
          description: {task.description}<br/>
          location: {task.location}<br/>
          created: {task.created_at}<br/>
          worker: {workerId} <br/>

          <div
            className="submit-link"
            onClick={this.cancelTask}>
            cancelTask
          </div>

          <div
            className="submit-link"
            onClick={this._findValidWorkers.bind(null, task)}>
            assignWorkerToTask
          </div>
        </li>
      );
    }
  });

}(this));
