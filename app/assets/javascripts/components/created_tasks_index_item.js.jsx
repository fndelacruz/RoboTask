(function(root) {
  'use strict';
  // this.props.createdTask

  root.CreatedTasksIndexItem = React.createClass({
    // NOTE: Ideally, want to popup a warning before deleting a task, or some
    // kind of double guessing
    render: function() {
      var task = this.props.createdTask;
      return (
        <li className="index-item" id="created-tasks-index-item">
          title: {task.title}<br/>
          description: {task.description}<br/>
          location: {task.location}<br/>
          created: {task.created_at}<br/>

          <div
            className="submit-link"
            onClick={this.cancelTask}>
            cancelTask
          </div>
        </li>
      );
    }
  });

}(this));
