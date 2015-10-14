(function(root) {
  'use strict';

  root.NavBar = React.createClass({
    mixins: [ReactRouter.History],

    getInitialState: function() {
      var assignedTasks = 0;
      var unassignedTasks = 0;
      root.CreatedTaskStore.all().forEach(function(task) {
        if (task.worker_id === null) {
          unassignedTasks += 1;
        } else {
          assignedTasks += 1;
        }
      });

      return ({
        unassignedTaskCount: unassignedTasks,
        assignedTaskCount: assignedTasks
        // createdTaskCount: root.CreatedTaskStore.all().length
      });
    },

    _updateCreatedTaskCount: function() {
      var assignedTasks = 0;
      var unassignedTasks = 0;
      root.CreatedTaskStore.all().forEach(function(task) {
        if (task.worker_id === null) {
          unassignedTasks += 1;
        } else {
          assignedTasks += 1;
        }
      });

      this.setState({
        unassignedTaskCount: unassignedTasks,
        assignedTaskCount: assignedTasks
        // createdTaskCount: root.CreatedTaskStore.all().length
      });

      // var newCreatedTaskCount = root.CreatedTaskStore.all().length;
      // this.setState({
      //   createdTaskCount: newCreatedTaskCount
      // });
    },

    componentDidMount: function() {
      root.ApiUtil.fetchCreatedTasks();
      root.CreatedTaskStore.addChangeListener(this._updateCreatedTaskCount);
    },

    componentWillUnmount: function() {
      root.CreatedTaskStore.removeChangeListener(this._updateCreatedTaskCount);
    },

    handleLogoutClick: function() {
      root.ApiUtil.logout();
    },

    handleCreateTaskClick: function() {
      this.history.pushState(null, "/task/new");
    },

    handleViewUnassignedCreatedTasksClick: function() {
      this.history.pushState(null, "/tasks/created");
    },

    render: function() {
      return (
        <ul>
          <li
            onClick={this.handleLogoutClick}
            className="nav-button">
            Logout
          </li>

          <li
            onClick={this.handleCreateTaskClick}
            className="nav-button">
            Create Task
          </li>

          <li
            onClick={this.handleViewUnassignedCreatedTasksClick}
            className="nav-button">
            Unassigned Created Tasks: {this.state.unassignedTaskCount}
          </li>

          <li
            onClick={this.handleViewAssignedCreatedTasksClick}
            className="nav-button">
            Assigned Created Tasks: {this.state.assignedTaskCount}
          </li>
        </ul>
      );
    }
  });
}(this));
