(function(root) {
  'use strict';
  // this.props.createdTask

  root.CreatedTasksIndexItem = React.createClass({
    render: function() {
      var task = this.props.createdTask;
      return (
        <li className="index-item" id="created-tasks-index-item">
          title: {task.title}<br/>
          description: {task.description}<br/>
          location: {task.location}<br/>
          created: {task.created_at}<br/>
        </li>
      );
    }
  });

}(this));
