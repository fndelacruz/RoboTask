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
            className="nav-button">
            View Created Tasks
          </li>
        </ul>
      );
    }
  });
}(this));
