(function(root) {
  'use strict';

  root.NavBar = React.createClass({
    mixins: [ReactRouter.History],

    handleLogoutClick: function() {
      root.ApiUtil.logout();
    },

    handleCreateTaskClick: function() {
      this.history.pushState(null, "/task/new");
    },

    handleViewCreatedTasksClick: function() {
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
            onClick={this.handleViewCreatedTasksClick}
            className="nav-button">
            View Created Tasks
          </li>
        </ul>
      );
    }
  });
}(this));
